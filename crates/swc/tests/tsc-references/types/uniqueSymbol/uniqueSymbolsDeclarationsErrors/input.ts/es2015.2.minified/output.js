const obj1 = {
    method1 (p) {
        return p;
    },
    method2 (p) {
        return p;
    }
};
export { obj1 as obj };
export const classExpression = class {
    method1(p) {
        return p;
    }
    method2(p) {
        return p;
    }
};
export function funcInferredReturnType(obj) {
    return obj;
}
export class ClassWithPrivateNamedProperties {
}
export class ClassWithPrivateNamedMethods {
    [s]() {
    }
    static [s]() {
    }
}
export class ClassWithPrivateNamedAccessors {
    get [s]() {
    }
    set [s](v) {
    }
    static get [s]() {
    }
    static set [s](v) {
    }
}
