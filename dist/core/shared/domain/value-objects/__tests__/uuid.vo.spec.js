"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _uuidvo = require("../uuid.vo");
const _uuid = require("uuid");
describe("UUID unit test", ()=>{
    const validateSpy = jest.spyOn(_uuidvo.Uuid.prototype, "validate");
    test("should throw an error if the id is not a valid UUID", ()=>{
        expect(()=>{
            new _uuidvo.Uuid("invalid-uuid");
        }).toThrow(new _uuidvo.InvalidUuidError());
        expect(validateSpy).toHaveBeenCalledTimes(1);
    });
    test("should create a valid UUID", ()=>{
        const uuid = new _uuidvo.Uuid();
        expect(uuid).toBeInstanceOf(_uuidvo.Uuid);
        expect(uuid.id).toBeDefined();
        expect((0, _uuid.validate)(uuid.id)).toBeTruthy();
        expect(validateSpy).toHaveBeenCalledTimes(1);
    });
    test("should accept a valid UUID", ()=>{
        const uuid = new _uuidvo.Uuid("d6c9c9c0-0a1c-4f5c-9a4b-3b6d6e5c0a9c");
        expect(uuid).toBeInstanceOf(_uuidvo.Uuid);
        expect(uuid.id).toBe("d6c9c9c0-0a1c-4f5c-9a4b-3b6d6e5c0a9c");
        expect(validateSpy).toHaveBeenCalledTimes(1);
    });
});

//# sourceMappingURL=uuid.vo.spec.js.map