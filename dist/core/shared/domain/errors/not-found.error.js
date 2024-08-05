"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "NotFoundError", {
    enumerable: true,
    get: function() {
        return NotFoundError;
    }
});
let NotFoundError = class NotFoundError extends Error {
    constructor(id, entityClass){
        const idsMessage = Array.isArray(id) ? id.join(', ') : id;
        super(`${entityClass.name} Not Found using ID ${idsMessage}`);
        this.name = 'NotFoundError';
    }
};

//# sourceMappingURL=not-found.error.js.map