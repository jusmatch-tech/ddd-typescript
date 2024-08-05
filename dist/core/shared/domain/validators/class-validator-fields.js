"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ClassValidatorFields", {
    enumerable: true,
    get: function() {
        return ClassValidatorFields;
    }
});
const _classvalidator = require("class-validator");
let ClassValidatorFields = class ClassValidatorFields {
    validate(notification, data, fields) {
        const errors = (0, _classvalidator.validateSync)(data, {
            groups: fields
        });
        if (errors.length) {
            for (const error of errors){
                const field = error.property;
                Object.values(error.constraints).forEach((message)=>{
                    notification.addError(message, field);
                });
            }
        }
        return !errors.length;
    }
};

//# sourceMappingURL=class-validator-fields.js.map