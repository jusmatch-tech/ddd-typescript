"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    InvalidUuidError: function() {
        return InvalidUuidError;
    },
    Uuid: function() {
        return Uuid;
    }
});
const _uuid = require("uuid");
const _valueobject = require("../value-object");
let Uuid = class Uuid extends _valueobject.ValueObject {
    validate() {
        const isValid = (0, _uuid.validate)(this.id);
        if (!isValid) {
            throw new InvalidUuidError();
        }
    }
    toString() {
        return this.id;
    }
    constructor(id){
        super();
        this.id = id || (0, _uuid.v4)();
        this.validate();
    }
};
let InvalidUuidError = class InvalidUuidError extends Error {
    constructor(message){
        super(message || "ID must be a valid UUID");
        this.name = "InvalidUuidError";
    }
};

//# sourceMappingURL=uuid.vo.js.map