// Copyright (c) Microsoft. All rights reserved. Licensed under the Apache License, Version 2.0. 
// See LICENSE.txt in the project root for complete license information.
///<reference path='typescript.ts' />
var TypeScript1;
(function(TypeScript) {
    class TypeCollectionContext {
        constructor(scopeChain, checker){
            this.scopeChain = scopeChain;
            this.checker = checker;
            this.script = null;
        }
    }
    TypeScript.TypeCollectionContext = TypeCollectionContext;
    class MemberScopeContext {
        constructor(flow, pos, matchFlag){
            this.flow = flow;
            this.pos = pos;
            this.matchFlag = matchFlag;
            this.type = null;
            this.ast = null;
            this.options = new AstWalkOptions();
        }
    }
    TypeScript.MemberScopeContext = MemberScopeContext;
    class EnclosingScopeContext {
        getScope() {
            return this.scopeGetter();
        }
        getObjectLiteralScope() {
            return this.objectLiteralScopeGetter();
        }
        getScopeAST() {
            return this.scopeStartAST;
        }
        getScopePosition() {
            return this.scopeStartAST.minChar;
        }
        getScriptFragmentStartAST() {
            return this.scopeStartAST;
        }
        getScriptFragmentPosition() {
            return this.getScriptFragmentStartAST().minChar;
        }
        getScriptFragment() {
            if (this.scriptFragment == null) {
                var ast = this.getScriptFragmentStartAST();
                var minChar = ast.minChar;
                var limChar = this.isMemberCompletion ? this.pos : this.pos + 1;
                this.scriptFragment = TypeScript1.quickParse(this.logger, ast, this.text, minChar, limChar, null).Script;
            }
            return this.scriptFragment;
        }
        constructor(logger, script, text, pos, isMemberCompletion){
            this.logger = logger;
            this.script = script;
            this.text = text;
            this.pos = pos;
            this.isMemberCompletion = isMemberCompletion;
            this.scopeGetter = null;
            this.objectLiteralScopeGetter = null;
            this.scopeStartAST = null;
            this.skipNextFuncDeclForClass = false;
            this.deepestModuleDecl = null;
            this.enclosingClassDecl = null;
            this.enclosingObjectLit = null;
            this.publicsOnly = true;
            this.useFullAst = false;
        }
    }
    TypeScript.EnclosingScopeContext = EnclosingScopeContext;
    function preFindMemberScope(ast, parent, walker) {
        var memScope = walker.state;
        if (hasFlag(ast.flags, memScope.matchFlag) && (memScope.pos < 0 || memScope.pos == ast.limChar)) {
            memScope.ast = ast;
            if (ast.type == null && memScope.pos >= 0) {
                memScope.flow.inScopeTypeCheck(ast, memScope.scope);
            }
            memScope.type = ast.type;
            memScope.options.stopWalk();
        }
        return ast;
    }
    TypeScript.preFindMemberScope = preFindMemberScope;
    function pushTypeCollectionScope(container, valueMembers, ambientValueMembers, enclosedTypes, ambientEnclosedTypes, context, thisType, classType, moduleDecl) {
        var builder = new SymbolScopeBuilder(valueMembers, ambientValueMembers, enclosedTypes, ambientEnclosedTypes, null, container);
        var chain = new ScopeChain(container, context.scopeChain, builder);
        chain.thisType = thisType;
        chain.classType = classType;
        chain.moduleDecl = moduleDecl;
        context.scopeChain = chain;
    }
    TypeScript.pushTypeCollectionScope = pushTypeCollectionScope;
    function popTypeCollectionScope(context) {
        context.scopeChain = context.scopeChain.previous;
    }
    TypeScript.popTypeCollectionScope = popTypeCollectionScope;
    function preFindEnclosingScope(ast, parent, walker) {
        var context = walker.state;
        var minChar = ast.minChar;
        var limChar = ast.limChar;
        // Account for the fact completion list may be called at the end of a file which
        // is has not been fully re-parsed yet.
        if (ast.nodeType == NodeType.Script && context.pos > limChar) limChar = context.pos;
        if (minChar <= context.pos && limChar >= context.pos) {
            switch(ast.nodeType){
                case NodeType.Script:
                    var script = ast;
                    context.scopeGetter = function() {
                        return script.bod === null ? null : script.bod.enclosingScope;
                    };
                    context.scopeStartAST = script;
                    break;
                case NodeType.ClassDeclaration:
                    context.scopeGetter = function() {
                        return ast.type === null || ast.type.instanceType.containedScope === null ? null : ast.type.instanceType.containedScope;
                    };
                    context.scopeStartAST = ast;
                    context.enclosingClassDecl = ast;
                    break;
                case NodeType.ObjectLit:
                    var objectLit = ast;
                    // Only consider target-typed object literals
                    if (objectLit.targetType) {
                        context.scopeGetter = function() {
                            return objectLit.targetType.containedScope;
                        };
                        context.objectLiteralScopeGetter = function() {
                            return objectLit.targetType.memberScope;
                        };
                        context.enclosingObjectLit = objectLit;
                    }
                    break;
                case NodeType.ModuleDeclaration:
                    context.deepestModuleDecl = ast;
                    context.scopeGetter = function() {
                        return ast.type === null ? null : ast.type.containedScope;
                    };
                    context.scopeStartAST = ast;
                    break;
                case NodeType.InterfaceDeclaration:
                    context.scopeGetter = function() {
                        return ast.type === null ? null : ast.type.containedScope;
                    };
                    context.scopeStartAST = ast;
                    break;
                case NodeType.FuncDecl:
                    {
                        var funcDecl = ast;
                        if (context.skipNextFuncDeclForClass) {
                            context.skipNextFuncDeclForClass = false;
                        } else {
                            context.scopeGetter = function() {
                                // The scope of a class constructor is hidden somewhere we don't expect :-S
                                if (funcDecl.isConstructor && hasFlag(funcDecl.fncFlags, FncFlags.ClassMethod)) {
                                    if (ast.type && ast.type.enclosingType) {
                                        return ast.type.enclosingType.constructorScope;
                                    }
                                }
                                if (funcDecl.scopeType) {
                                    return funcDecl.scopeType.containedScope;
                                }
                                if (funcDecl.type) {
                                    return funcDecl.type.containedScope;
                                }
                                return null;
                            };
                            context.scopeStartAST = ast;
                        }
                    }
                    break;
            }
            walker.options.goChildren = true;
        } else {
            walker.options.goChildren = false;
        }
        return ast;
    }
    TypeScript.preFindEnclosingScope = preFindEnclosingScope;
    function findEnclosingScopeAt(logger, script, text, pos, isMemberCompletion) {
        var context = new EnclosingScopeContext(logger, script, text, pos, isMemberCompletion);
        TypeScript1.getAstWalkerFactory().walk(script, preFindEnclosingScope, null, null, context);
        if (context.scopeStartAST === null) return null;
        return context;
    }
    TypeScript.findEnclosingScopeAt = findEnclosingScopeAt;
})(TypeScript1 || (TypeScript1 = {
}));
