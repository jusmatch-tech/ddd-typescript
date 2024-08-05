import { InvalidUuidError, Uuid } from "../uuid.vo";
import { validate as uuidValidate } from "uuid";

describe("UUID unit test", () => {
  const validateSpy = jest.spyOn(Uuid.prototype as any, "validate");

  test("should throw an error if the id is not a valid UUID", () => {
    expect(() => {
      new Uuid("invalid-uuid");
    }).toThrow(new InvalidUuidError());
    expect(validateSpy).toHaveBeenCalledTimes(1);
  });

  test("should create a valid UUID", () => {
    const uuid = new Uuid();
    expect(uuid).toBeInstanceOf(Uuid);
    expect(uuid.id).toBeDefined();
    expect(uuidValidate(uuid.id)).toBeTruthy();
    expect(validateSpy).toHaveBeenCalledTimes(1);

  });

  test("should accept a valid UUID", () => {
    const uuid = new Uuid("d6c9c9c0-0a1c-4f5c-9a4b-3b6d6e5c0a9c");
    expect(uuid).toBeInstanceOf(Uuid);
    expect(uuid.id).toBe("d6c9c9c0-0a1c-4f5c-9a4b-3b6d6e5c0a9c");
    expect(validateSpy).toHaveBeenCalledTimes(1);
  });

});