function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
class Foo1 {
    nested() {
        let Foo = class Foo {
        };
        _defineProperty(Foo, "foo", 'foo');
        _defineProperty(Foo, "bar", Foo.foo);
        return new Foo();
    }
}
export { Foo1 as Foo };
