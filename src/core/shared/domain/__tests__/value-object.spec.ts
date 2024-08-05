import { ValueObject } from "../value-object";

class StringValueObject extends ValueObject {
  constructor(readonly value: string) {
    super();
  }
}

class ComplexValueObject extends ValueObject {
  constructor(readonly prop1: string, readonly prop2: number) {
    super();
  }
}

describe("ValueObject unit test", () => {
  describe("Equals method", () => {
    test("Should be equal", () => {
      const valueObject1 = new StringValueObject("test");
      const valueObject2 = new StringValueObject("test");
      expect(valueObject1.equals(valueObject2)).toBeTruthy();

      const complexValueObject1 = new ComplexValueObject("test", 1);
      const complexValueObject2 = new ComplexValueObject("test", 1);
      expect(complexValueObject1.equals(complexValueObject2)).toBeTruthy();
      
    });

    test("Should not be equal", () => {
      const valueObject1 = new StringValueObject("test");
      const valueObject2 = new StringValueObject("test2");
      expect(valueObject1.equals(valueObject2)).toBeFalsy();
      expect(valueObject1.equals(null as any)).toBeFalsy();
      expect(valueObject1.equals(undefined as any)).toBeFalsy();

      const complexValueObject1 = new ComplexValueObject("test", 1);
      const complexValueObject2 = new ComplexValueObject("test", 2);
      expect(complexValueObject1.equals(complexValueObject2)).toBeFalsy();
      expect(complexValueObject1.equals(null as any)).toBeFalsy();
      expect(complexValueObject1.equals(undefined as any)).toBeFalsy();
    });
  
  });  
});