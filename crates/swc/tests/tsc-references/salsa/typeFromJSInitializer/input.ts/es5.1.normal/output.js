// @allowJs: true
// @checkJs: true
// @noEmit: true
// @strictNullChecks: true
// @noImplicitAny: true
// @Filename: a.js
function A() {
    // should get any on this-assignments in constructor
    this.unknown = null;
    this.unknowable = undefined;
    this.empty = [];
}
var a1 = new A();
a1.unknown = 1;
a1.unknown = true;
a1.unknown = {
};
a1.unknown = 'hi';
a1.unknowable = 1;
a1.unknowable = true;
a1.unknowable = {
};
a1.unknowable = 'hi';
a1.empty.push(1);
a1.empty.push(true);
a1.empty.push({
});
a1.empty.push('hi');
/** @type {number | undefined} */ var n;
// should get any on parameter initialisers
function f() {
    var a = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : null, b = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : n, l = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : [];
    // a should be any
    a = undefined;
    a = null;
    a = 1;
    a = true;
    a = {
    };
    a = 'ok';
    // b should be number | undefined, not any
    b = 1;
    b = undefined;
    b = 'error';
    // l should be any[]
    l.push(1);
    l.push('ok');
}
// should get any on variable initialisers
var u = undefined;
var l1 = [];
u = undefined;
u = 1;
u = true;
u = {
};
u = 'ok';
l1.push('ok');
