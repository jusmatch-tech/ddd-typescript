"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _valueobject = require("../value-object");
let StringValueObject = class StringValueObject extends _valueobject.ValueObject {
    constructor(value){
        super();
        this.value = value;
    }
};
let ComplexValueObject = class ComplexValueObject extends _valueobject.ValueObject {
    constructor(prop1, prop2){
        super();
        this.prop1 = prop1;
        this.prop2 = prop2;
    }
};
describe("ValueObject unit test", ()=>{
    describe("Equals method", ()=>{
        test("Should be equal", ()=>{
            const valueObject1 = new StringValueObject("test");
            const valueObject2 = new StringValueObject("test");
            expect(valueObject1.equals(valueObject2)).toBeTruthy();
            const complexValueObject1 = new ComplexValueObject("test", 1);
            const complexValueObject2 = new ComplexValueObject("test", 1);
            expect(complexValueObject1.equals(complexValueObject2)).toBeTruthy();
        });
        test("Should not be equal", ()=>{
            const valueObject1 = new StringValueObject("test");
            const valueObject2 = new StringValueObject("test2");
            expect(valueObject1.equals(valueObject2)).toBeFalsy();
            expect(valueObject1.equals(null)).toBeFalsy();
            expect(valueObject1.equals(undefined)).toBeFalsy();
            const complexValueObject1 = new ComplexValueObject("test", 1);
            const complexValueObject2 = new ComplexValueObject("test", 2);
            expect(complexValueObject1.equals(complexValueObject2)).toBeFalsy();
            expect(complexValueObject1.equals(null)).toBeFalsy();
            expect(complexValueObject1.equals(undefined)).toBeFalsy();
        });
    });
});

//# sourceMappingURL=value-object.spec.js.map