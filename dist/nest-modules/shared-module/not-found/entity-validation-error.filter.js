"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "EntityValidationErrorFilter", {
    enumerable: true,
    get: function() {
        return EntityValidationErrorFilter;
    }
});
const _validationerror = require("../../../core/shared/domain/validators/validation.error");
const _common = require("@nestjs/common");
const _lodash = require("lodash");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let EntityValidationErrorFilter = class EntityValidationErrorFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        response.status(422).json({
            statusCode: 422,
            error: 'Unprocessable Entity',
            message: (0, _lodash.union)(...exception.error.reduce((acc, error)=>acc.concat(typeof error === 'string' ? [
                    [
                        error
                    ]
                ] : Object.values(error)), []))
        });
    }
};
EntityValidationErrorFilter = _ts_decorate([
    (0, _common.Catch)(_validationerror.EntityValidationError)
], EntityValidationErrorFilter);

//# sourceMappingURL=entity-validation-error.filter.js.map