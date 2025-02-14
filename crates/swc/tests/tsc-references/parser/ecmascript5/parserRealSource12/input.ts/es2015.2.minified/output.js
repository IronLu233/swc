var TypeScript1;
!function(TypeScript) {
    var globalAstWalkerFactory, ChildrenWalkers1;
    class AstWalkOptions {
        stopWalk(stop = !0) {
            this.goChildren = !stop, this.goNextSibling = !stop;
        }
        constructor(){
            this.goChildren = !0, this.goNextSibling = !0, this.reverseSiblings = !1;
        }
    }
    TypeScript.AstWalkOptions = AstWalkOptions;
    class AstWalker {
        walk(ast, parent) {
            var preAst = this.pre(ast, parent, this);
            if (void 0 === preAst && (preAst = ast), this.options.goChildren) {
                var svGoSib = this.options.goNextSibling;
                this.options.goNextSibling = !0, this.childrenWalkers[ast.nodeType](ast, parent, this), this.options.goNextSibling = svGoSib;
            } else this.options.goChildren = !0;
            if (!this.post) return preAst;
            var postAst = this.post(preAst, parent, this);
            return void 0 === postAst && (postAst = preAst), postAst;
        }
        constructor(childrenWalkers, pre, post, options, state){
            this.childrenWalkers = childrenWalkers, this.pre = pre, this.post = post, this.options = options, this.state = state;
        }
    }
    class AstWalkerFactory {
        walk(ast, pre, post, options, state) {
            return this.getWalker(pre, post, options, state).walk(ast, null);
        }
        getWalker(pre, post, options, state) {
            return this.getSlowWalker(pre, post, options, state);
        }
        getSlowWalker(pre, post, options, state) {
            return options || (options = new AstWalkOptions()), new AstWalker(this.childrenWalkers, pre, post, options, state);
        }
        initChildrenWalkers() {
            for(var e in this.childrenWalkers[NodeType.None] = ChildrenWalkers1.walkNone, this.childrenWalkers[NodeType.Empty] = ChildrenWalkers1.walkNone, this.childrenWalkers[NodeType.EmptyExpr] = ChildrenWalkers1.walkNone, this.childrenWalkers[NodeType.True] = ChildrenWalkers1.walkNone, this.childrenWalkers[NodeType.False] = ChildrenWalkers1.walkNone, this.childrenWalkers[NodeType.This] = ChildrenWalkers1.walkNone, this.childrenWalkers[NodeType.Super] = ChildrenWalkers1.walkNone, this.childrenWalkers[NodeType.QString] = ChildrenWalkers1.walkNone, this.childrenWalkers[NodeType.Regex] = ChildrenWalkers1.walkNone, this.childrenWalkers[NodeType.Null] = ChildrenWalkers1.walkNone, this.childrenWalkers[NodeType.ArrayLit] = ChildrenWalkers1.walkUnaryExpressionChildren, this.childrenWalkers[NodeType.ObjectLit] = ChildrenWalkers1.walkUnaryExpressionChildren, this.childrenWalkers[NodeType.Void] = ChildrenWalkers1.walkUnaryExpressionChildren, this.childrenWalkers[NodeType.Comma] = ChildrenWalkers1.walkBinaryExpressionChildren, this.childrenWalkers[NodeType.Pos] = ChildrenWalkers1.walkUnaryExpressionChildren, this.childrenWalkers[NodeType.Neg] = ChildrenWalkers1.walkUnaryExpressionChildren, this.childrenWalkers[NodeType.Delete] = ChildrenWalkers1.walkUnaryExpressionChildren, this.childrenWalkers[NodeType.Await] = ChildrenWalkers1.walkUnaryExpressionChildren, this.childrenWalkers[NodeType.In] = ChildrenWalkers1.walkBinaryExpressionChildren, this.childrenWalkers[NodeType.Dot] = ChildrenWalkers1.walkBinaryExpressionChildren, this.childrenWalkers[NodeType.From] = ChildrenWalkers1.walkBinaryExpressionChildren, this.childrenWalkers[NodeType.Is] = ChildrenWalkers1.walkBinaryExpressionChildren, this.childrenWalkers[NodeType.InstOf] = ChildrenWalkers1.walkBinaryExpressionChildren, this.childrenWalkers[NodeType.Typeof] = ChildrenWalkers1.walkUnaryExpressionChildren, this.childrenWalkers[NodeType.NumberLit] = ChildrenWalkers1.walkNone, this.childrenWalkers[NodeType.Name] = ChildrenWalkers1.walkNone, this.childrenWalkers[NodeType.TypeRef] = ChildrenWalkers1.walkTypeReferenceChildren, this.childrenWalkers[NodeType.Index] = ChildrenWalkers1.walkBinaryExpressionChildren, this.childrenWalkers[NodeType.Call] = ChildrenWalkers1.walkCallExpressionChildren, this.childrenWalkers[NodeType.New] = ChildrenWalkers1.walkCallExpressionChildren, this.childrenWalkers[NodeType.Asg] = ChildrenWalkers1.walkBinaryExpressionChildren, this.childrenWalkers[NodeType.AsgAdd] = ChildrenWalkers1.walkBinaryExpressionChildren, this.childrenWalkers[NodeType.AsgSub] = ChildrenWalkers1.walkBinaryExpressionChildren, this.childrenWalkers[NodeType.AsgDiv] = ChildrenWalkers1.walkBinaryExpressionChildren, this.childrenWalkers[NodeType.AsgMul] = ChildrenWalkers1.walkBinaryExpressionChildren, this.childrenWalkers[NodeType.AsgMod] = ChildrenWalkers1.walkBinaryExpressionChildren, this.childrenWalkers[NodeType.AsgAnd] = ChildrenWalkers1.walkBinaryExpressionChildren, this.childrenWalkers[NodeType.AsgXor] = ChildrenWalkers1.walkBinaryExpressionChildren, this.childrenWalkers[NodeType.AsgOr] = ChildrenWalkers1.walkBinaryExpressionChildren, this.childrenWalkers[NodeType.AsgLsh] = ChildrenWalkers1.walkBinaryExpressionChildren, this.childrenWalkers[NodeType.AsgRsh] = ChildrenWalkers1.walkBinaryExpressionChildren, this.childrenWalkers[NodeType.AsgRs2] = ChildrenWalkers1.walkBinaryExpressionChildren, this.childrenWalkers[NodeType.ConditionalExpression] = ChildrenWalkers1.walkTrinaryExpressionChildren, this.childrenWalkers[NodeType.LogOr] = ChildrenWalkers1.walkBinaryExpressionChildren, this.childrenWalkers[NodeType.LogAnd] = ChildrenWalkers1.walkBinaryExpressionChildren, this.childrenWalkers[NodeType.Or] = ChildrenWalkers1.walkBinaryExpressionChildren, this.childrenWalkers[NodeType.Xor] = ChildrenWalkers1.walkBinaryExpressionChildren, this.childrenWalkers[NodeType.And] = ChildrenWalkers1.walkBinaryExpressionChildren, this.childrenWalkers[NodeType.Eq] = ChildrenWalkers1.walkBinaryExpressionChildren, this.childrenWalkers[NodeType.Ne] = ChildrenWalkers1.walkBinaryExpressionChildren, this.childrenWalkers[NodeType.Eqv] = ChildrenWalkers1.walkBinaryExpressionChildren, this.childrenWalkers[NodeType.NEqv] = ChildrenWalkers1.walkBinaryExpressionChildren, this.childrenWalkers[NodeType.Lt] = ChildrenWalkers1.walkBinaryExpressionChildren, this.childrenWalkers[NodeType.Le] = ChildrenWalkers1.walkBinaryExpressionChildren, this.childrenWalkers[NodeType.Gt] = ChildrenWalkers1.walkBinaryExpressionChildren, this.childrenWalkers[NodeType.Ge] = ChildrenWalkers1.walkBinaryExpressionChildren, this.childrenWalkers[NodeType.Add] = ChildrenWalkers1.walkBinaryExpressionChildren, this.childrenWalkers[NodeType.Sub] = ChildrenWalkers1.walkBinaryExpressionChildren, this.childrenWalkers[NodeType.Mul] = ChildrenWalkers1.walkBinaryExpressionChildren, this.childrenWalkers[NodeType.Div] = ChildrenWalkers1.walkBinaryExpressionChildren, this.childrenWalkers[NodeType.Mod] = ChildrenWalkers1.walkBinaryExpressionChildren, this.childrenWalkers[NodeType.Lsh] = ChildrenWalkers1.walkBinaryExpressionChildren, this.childrenWalkers[NodeType.Rsh] = ChildrenWalkers1.walkBinaryExpressionChildren, this.childrenWalkers[NodeType.Rs2] = ChildrenWalkers1.walkBinaryExpressionChildren, this.childrenWalkers[NodeType.Not] = ChildrenWalkers1.walkUnaryExpressionChildren, this.childrenWalkers[NodeType.LogNot] = ChildrenWalkers1.walkUnaryExpressionChildren, this.childrenWalkers[NodeType.IncPre] = ChildrenWalkers1.walkUnaryExpressionChildren, this.childrenWalkers[NodeType.DecPre] = ChildrenWalkers1.walkUnaryExpressionChildren, this.childrenWalkers[NodeType.IncPost] = ChildrenWalkers1.walkUnaryExpressionChildren, this.childrenWalkers[NodeType.DecPost] = ChildrenWalkers1.walkUnaryExpressionChildren, this.childrenWalkers[NodeType.TypeAssertion] = ChildrenWalkers1.walkUnaryExpressionChildren, this.childrenWalkers[NodeType.FuncDecl] = ChildrenWalkers1.walkFuncDeclChildren, this.childrenWalkers[NodeType.Member] = ChildrenWalkers1.walkBinaryExpressionChildren, this.childrenWalkers[NodeType.VarDecl] = ChildrenWalkers1.walkBoundDeclChildren, this.childrenWalkers[NodeType.ArgDecl] = ChildrenWalkers1.walkBoundDeclChildren, this.childrenWalkers[NodeType.Return] = ChildrenWalkers1.walkReturnStatementChildren, this.childrenWalkers[NodeType.Break] = ChildrenWalkers1.walkNone, this.childrenWalkers[NodeType.Continue] = ChildrenWalkers1.walkNone, this.childrenWalkers[NodeType.Throw] = ChildrenWalkers1.walkUnaryExpressionChildren, this.childrenWalkers[NodeType.For] = ChildrenWalkers1.walkForStatementChildren, this.childrenWalkers[NodeType.ForIn] = ChildrenWalkers1.walkForInStatementChildren, this.childrenWalkers[NodeType.If] = ChildrenWalkers1.walkIfStatementChildren, this.childrenWalkers[NodeType.While] = ChildrenWalkers1.walkWhileStatementChildren, this.childrenWalkers[NodeType.DoWhile] = ChildrenWalkers1.walkDoWhileStatementChildren, this.childrenWalkers[NodeType.Block] = ChildrenWalkers1.walkBlockChildren, this.childrenWalkers[NodeType.Case] = ChildrenWalkers1.walkCaseStatementChildren, this.childrenWalkers[NodeType.Switch] = ChildrenWalkers1.walkSwitchStatementChildren, this.childrenWalkers[NodeType.Try] = ChildrenWalkers1.walkTryChildren, this.childrenWalkers[NodeType.TryCatch] = ChildrenWalkers1.walkTryCatchChildren, this.childrenWalkers[NodeType.TryFinally] = ChildrenWalkers1.walkTryFinallyChildren, this.childrenWalkers[NodeType.Finally] = ChildrenWalkers1.walkFinallyChildren, this.childrenWalkers[NodeType.Catch] = ChildrenWalkers1.walkCatchChildren, this.childrenWalkers[NodeType.List] = ChildrenWalkers1.walkListChildren, this.childrenWalkers[NodeType.Script] = ChildrenWalkers1.walkScriptChildren, this.childrenWalkers[NodeType.ClassDeclaration] = ChildrenWalkers1.walkClassDeclChildren, this.childrenWalkers[NodeType.InterfaceDeclaration] = ChildrenWalkers1.walkTypeDeclChildren, this.childrenWalkers[NodeType.ModuleDeclaration] = ChildrenWalkers1.walkModuleDeclChildren, this.childrenWalkers[NodeType.ImportDeclaration] = ChildrenWalkers1.walkImportDeclChildren, this.childrenWalkers[NodeType.With] = ChildrenWalkers1.walkWithStatementChildren, this.childrenWalkers[NodeType.Label] = ChildrenWalkers1.walkLabelChildren, this.childrenWalkers[NodeType.LabeledStatement] = ChildrenWalkers1.walkLabeledStatementChildren, this.childrenWalkers[NodeType.EBStart] = ChildrenWalkers1.walkNone, this.childrenWalkers[NodeType.GotoEB] = ChildrenWalkers1.walkNone, this.childrenWalkers[NodeType.EndCode] = ChildrenWalkers1.walkNone, this.childrenWalkers[NodeType.Error] = ChildrenWalkers1.walkNone, this.childrenWalkers[NodeType.Comment] = ChildrenWalkers1.walkNone, this.childrenWalkers[NodeType.Debugger] = ChildrenWalkers1.walkNone, NodeType._map)if (void 0 === this.childrenWalkers[e]) throw new Error("initWalkers function is not up to date with enum content!");
        }
        constructor(){
            this.childrenWalkers = [], this.initChildrenWalkers();
        }
    }
    TypeScript.AstWalkerFactory = AstWalkerFactory, TypeScript.getAstWalkerFactory = function() {
        return globalAstWalkerFactory || (globalAstWalkerFactory = new AstWalkerFactory()), globalAstWalkerFactory;
    }, (function(ChildrenWalkers) {
        function walkRecordChildren(preAst, parent, walker) {
            preAst.name = walker.walk(preAst.name, preAst), walker.options.goNextSibling && preAst.members && (preAst.members = walker.walk(preAst.members, preAst));
        }
        function walkNamedTypeChildren(preAst, parent, walker) {
            walkRecordChildren(preAst, parent, walker);
        }
        ChildrenWalkers.walkNone = function(preAst, parent, walker) {
        }, ChildrenWalkers.walkListChildren = function(preAst, parent, walker) {
            var len = preAst.members.length;
            if (walker.options.reverseSiblings) for(var i = len - 1; i >= 0; i--)walker.options.goNextSibling && (preAst.members[i] = walker.walk(preAst.members[i], preAst));
            else for(var i = 0; i < len; i++)walker.options.goNextSibling && (preAst.members[i] = walker.walk(preAst.members[i], preAst));
        }, ChildrenWalkers.walkUnaryExpressionChildren = function(preAst, parent, walker) {
            preAst.castTerm && (preAst.castTerm = walker.walk(preAst.castTerm, preAst)), preAst.operand && (preAst.operand = walker.walk(preAst.operand, preAst));
        }, ChildrenWalkers.walkBinaryExpressionChildren = function(preAst, parent, walker) {
            walker.options.reverseSiblings ? (preAst.operand2 && (preAst.operand2 = walker.walk(preAst.operand2, preAst)), preAst.operand1 && walker.options.goNextSibling && (preAst.operand1 = walker.walk(preAst.operand1, preAst))) : (preAst.operand1 && (preAst.operand1 = walker.walk(preAst.operand1, preAst)), preAst.operand2 && walker.options.goNextSibling && (preAst.operand2 = walker.walk(preAst.operand2, preAst)));
        }, ChildrenWalkers.walkTypeReferenceChildren = function(preAst, parent, walker) {
            preAst.term && (preAst.term = walker.walk(preAst.term, preAst));
        }, ChildrenWalkers.walkCallExpressionChildren = function(preAst, parent, walker) {
            walker.options.reverseSiblings || (preAst.target = walker.walk(preAst.target, preAst)), preAst.arguments && walker.options.goNextSibling && (preAst.arguments = walker.walk(preAst.arguments, preAst)), walker.options.reverseSiblings && walker.options.goNextSibling && (preAst.target = walker.walk(preAst.target, preAst));
        }, ChildrenWalkers.walkTrinaryExpressionChildren = function(preAst, parent, walker) {
            preAst.operand1 && (preAst.operand1 = walker.walk(preAst.operand1, preAst)), preAst.operand2 && walker.options.goNextSibling && (preAst.operand2 = walker.walk(preAst.operand2, preAst)), preAst.operand3 && walker.options.goNextSibling && (preAst.operand3 = walker.walk(preAst.operand3, preAst));
        }, ChildrenWalkers.walkFuncDeclChildren = function(preAst, parent, walker) {
            preAst.name && (preAst.name = walker.walk(preAst.name, preAst)), preAst.arguments && preAst.arguments.members.length > 0 && walker.options.goNextSibling && (preAst.arguments = walker.walk(preAst.arguments, preAst)), preAst.returnTypeAnnotation && walker.options.goNextSibling && (preAst.returnTypeAnnotation = walker.walk(preAst.returnTypeAnnotation, preAst)), preAst.bod && preAst.bod.members.length > 0 && walker.options.goNextSibling && (preAst.bod = walker.walk(preAst.bod, preAst));
        }, ChildrenWalkers.walkBoundDeclChildren = function(preAst, parent, walker) {
            preAst.id && (preAst.id = walker.walk(preAst.id, preAst)), preAst.init && (preAst.init = walker.walk(preAst.init, preAst)), preAst.typeExpr && walker.options.goNextSibling && (preAst.typeExpr = walker.walk(preAst.typeExpr, preAst));
        }, ChildrenWalkers.walkReturnStatementChildren = function(preAst, parent, walker) {
            preAst.returnExpression && (preAst.returnExpression = walker.walk(preAst.returnExpression, preAst));
        }, ChildrenWalkers.walkForStatementChildren = function(preAst, parent, walker) {
            preAst.init && (preAst.init = walker.walk(preAst.init, preAst)), preAst.cond && walker.options.goNextSibling && (preAst.cond = walker.walk(preAst.cond, preAst)), preAst.incr && walker.options.goNextSibling && (preAst.incr = walker.walk(preAst.incr, preAst)), preAst.body && walker.options.goNextSibling && (preAst.body = walker.walk(preAst.body, preAst));
        }, ChildrenWalkers.walkForInStatementChildren = function(preAst, parent, walker) {
            preAst.lval = walker.walk(preAst.lval, preAst), walker.options.goNextSibling && (preAst.obj = walker.walk(preAst.obj, preAst)), preAst.body && walker.options.goNextSibling && (preAst.body = walker.walk(preAst.body, preAst));
        }, ChildrenWalkers.walkIfStatementChildren = function(preAst, parent, walker) {
            preAst.cond = walker.walk(preAst.cond, preAst), preAst.thenBod && walker.options.goNextSibling && (preAst.thenBod = walker.walk(preAst.thenBod, preAst)), preAst.elseBod && walker.options.goNextSibling && (preAst.elseBod = walker.walk(preAst.elseBod, preAst));
        }, ChildrenWalkers.walkWhileStatementChildren = function(preAst, parent, walker) {
            preAst.cond = walker.walk(preAst.cond, preAst), preAst.body && walker.options.goNextSibling && (preAst.body = walker.walk(preAst.body, preAst));
        }, ChildrenWalkers.walkDoWhileStatementChildren = function(preAst, parent, walker) {
            preAst.cond = walker.walk(preAst.cond, preAst), preAst.body && walker.options.goNextSibling && (preAst.body = walker.walk(preAst.body, preAst));
        }, ChildrenWalkers.walkBlockChildren = function(preAst, parent, walker) {
            preAst.statements && (preAst.statements = walker.walk(preAst.statements, preAst));
        }, ChildrenWalkers.walkCaseStatementChildren = function(preAst, parent, walker) {
            preAst.expr && (preAst.expr = walker.walk(preAst.expr, preAst)), preAst.body && walker.options.goNextSibling && (preAst.body = walker.walk(preAst.body, preAst));
        }, ChildrenWalkers.walkSwitchStatementChildren = function(preAst, parent, walker) {
            preAst.val && (preAst.val = walker.walk(preAst.val, preAst)), preAst.caseList && walker.options.goNextSibling && (preAst.caseList = walker.walk(preAst.caseList, preAst));
        }, ChildrenWalkers.walkTryChildren = function(preAst, parent, walker) {
            preAst.body && (preAst.body = walker.walk(preAst.body, preAst));
        }, ChildrenWalkers.walkTryCatchChildren = function(preAst, parent, walker) {
            preAst.tryNode && (preAst.tryNode = walker.walk(preAst.tryNode, preAst)), preAst.catchNode && walker.options.goNextSibling && (preAst.catchNode = walker.walk(preAst.catchNode, preAst));
        }, ChildrenWalkers.walkTryFinallyChildren = function(preAst, parent, walker) {
            preAst.tryNode && (preAst.tryNode = walker.walk(preAst.tryNode, preAst)), preAst.finallyNode && walker.options.goNextSibling && (preAst.finallyNode = walker.walk(preAst.finallyNode, preAst));
        }, ChildrenWalkers.walkFinallyChildren = function(preAst, parent, walker) {
            preAst.body && (preAst.body = walker.walk(preAst.body, preAst));
        }, ChildrenWalkers.walkCatchChildren = function(preAst, parent, walker) {
            preAst.param && (preAst.param = walker.walk(preAst.param, preAst)), preAst.body && walker.options.goNextSibling && (preAst.body = walker.walk(preAst.body, preAst));
        }, ChildrenWalkers.walkRecordChildren = walkRecordChildren, ChildrenWalkers.walkNamedTypeChildren = walkNamedTypeChildren, ChildrenWalkers.walkClassDeclChildren = function(preAst, parent, walker) {
            walkNamedTypeChildren(preAst, parent, walker), walker.options.goNextSibling && preAst.extendsList && (preAst.extendsList = walker.walk(preAst.extendsList, preAst)), walker.options.goNextSibling && preAst.implementsList && (preAst.implementsList = walker.walk(preAst.implementsList, preAst));
        }, ChildrenWalkers.walkScriptChildren = function(preAst, parent, walker) {
            preAst.bod && (preAst.bod = walker.walk(preAst.bod, preAst));
        }, ChildrenWalkers.walkTypeDeclChildren = function(preAst, parent, walker) {
            walkNamedTypeChildren(preAst, parent, walker), walker.options.goNextSibling && preAst.extendsList && (preAst.extendsList = walker.walk(preAst.extendsList, preAst)), walker.options.goNextSibling && preAst.implementsList && (preAst.implementsList = walker.walk(preAst.implementsList, preAst));
        }, ChildrenWalkers.walkModuleDeclChildren = function(preAst, parent, walker) {
            walkRecordChildren(preAst, parent, walker);
        }, ChildrenWalkers.walkImportDeclChildren = function(preAst, parent, walker) {
            preAst.id && (preAst.id = walker.walk(preAst.id, preAst)), preAst.alias && (preAst.alias = walker.walk(preAst.alias, preAst));
        }, ChildrenWalkers.walkWithStatementChildren = function(preAst, parent, walker) {
            preAst.expr && (preAst.expr = walker.walk(preAst.expr, preAst)), preAst.body && walker.options.goNextSibling && (preAst.body = walker.walk(preAst.body, preAst));
        }, ChildrenWalkers.walkLabelChildren = function(preAst, parent, walker) {
        }, ChildrenWalkers.walkLabeledStatementChildren = function(preAst, parent, walker) {
            preAst.labels = walker.walk(preAst.labels, preAst), walker.options.goNextSibling && (preAst.stmt = walker.walk(preAst.stmt, preAst));
        };
    })(ChildrenWalkers1 || (ChildrenWalkers1 = {
    }));
}(TypeScript1 || (TypeScript1 = {
}));
