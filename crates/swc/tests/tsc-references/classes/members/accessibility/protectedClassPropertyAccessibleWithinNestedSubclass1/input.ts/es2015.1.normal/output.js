class Base {
    method() {
        class A {
            methoda() {
                var b;
                var d1;
                var d2;
                var d3;
                var d4;
                b.x; // OK, accessed within their declaring class
                d1.x; // OK, accessed within their declaring class
                d2.x; // OK, accessed within their declaring class
                d3.x; // Error, redefined in a subclass, can only be accessed in the declaring class or one of its subclasses
                d4.x; // OK, accessed within their declaring class
            }
        }
    }
}
class Derived1 extends Base {
    method1() {
        class B {
            method1b() {
                var b;
                var d1;
                var d2;
                var d3;
                var d4;
                b.x; // Error, isn't accessed through an instance of the enclosing class
                d1.x; // OK, accessed within a class derived from their declaring class, and through an instance of the enclosing class
                d2.x; // Error, isn't accessed through an instance of the enclosing class
                d3.x; // Error, redefined in a subclass, can only be accessed in the declaring class or one of its subclasses
                d4.x; // Error, isn't accessed through an instance of the enclosing class
            }
        }
    }
}
class Derived2 extends Base {
    method2() {
        class C {
            method2c() {
                var b;
                var d1;
                var d2;
                var d3;
                var d4;
                b.x; // Error, isn't accessed through an instance of the enclosing class
                d1.x; // Error, isn't accessed through an instance of the enclosing class
                d2.x; // OK, accessed within a class derived from their declaring class, and through an instance of the enclosing class
                d3.x; // Error, redefined in a subclass, can only be accessed in the declaring class or one of its subclasses
                d4.x; // OK, accessed within a class derived from their declaring class, and through an instance of the enclosing class or one of its subclasses
            }
        }
    }
}
class Derived3 extends Derived1 {
    method3() {
        class D {
            method3d() {
                var b;
                var d1;
                var d2;
                var d3;
                var d4;
                b.x; // Error, isn't accessed through an instance of the enclosing class
                d1.x; // Error, isn't accessed through an instance of the enclosing class
                d2.x; // Error, isn't accessed through an instance of the enclosing class
                d3.x; // OK, accessed within their declaring class
                d4.x; // Error, isn't accessed through an instance of the enclosing class
            }
        }
    }
}
class Derived4 extends Derived2 {
    method4() {
        class E {
            method4e() {
                var b;
                var d1;
                var d2;
                var d3;
                var d4;
                b.x; // Error, isn't accessed through an instance of the enclosing class
                d1.x; // Error, isn't accessed through an instance of the enclosing class
                d2.x; // Error, isn't accessed through an instance of the enclosing class
                d3.x; // Error, redefined in a subclass, can only be accessed in the declaring class or one of its subclasses
                d4.x; // OK, accessed within a class derived from their declaring class, and through an instance of the enclosing class
            }
        }
    }
}
var b1;
var d11;
var d21;
var d31;
var d41;
b1.x; // Error, neither within their declaring class nor classes derived from their declaring class
d11.x; // Error, neither within their declaring class nor classes derived from their declaring class
d21.x; // Error, neither within their declaring class nor classes derived from their declaring class
d31.x; // Error, neither within their declaring class nor classes derived from their declaring class
d41.x; // Error, neither within their declaring class nor classes derived from their declaring class
