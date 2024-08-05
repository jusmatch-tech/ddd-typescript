"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _validationerror = require("../../../core/shared/domain/validators/validation.error");
const _common = require("@nestjs/common");
const _testing = require("@nestjs/testing");
const _entityvalidationerrorfilter = require("./entity-validation-error.filter");
const _supertest = /*#__PURE__*/ _interop_require_default(require("supertest"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let StubController = class StubController {
    index() {
        throw new _validationerror.EntityValidationError([
            'another error',
            {
                field1: [
                    'field1 is required',
                    'error 2'
                ]
            },
            {
                field2: [
                    'field2 is required'
                ]
            }
        ]);
    }
};
_ts_decorate([
    (0, _common.Get)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", void 0)
], StubController.prototype, "index", null);
StubController = _ts_decorate([
    (0, _common.Controller)('stub')
], StubController);
describe('EntityValidationErrorFilter Unit Tests ', ()=>{
    let app;
    beforeEach(async ()=>{
        const moduleFixture = await _testing.Test.createTestingModule({
            controllers: [
                StubController
            ]
        }).compile();
        app = moduleFixture.createNestApplication();
        app.useGlobalFilters(new _entityvalidationerrorfilter.EntityValidationErrorFilter());
        await app.init();
    });
    it('should catch a EntityValidationError', ()=>{
        return (0, _supertest.default)(app.getHttpServer()).get('/stub').expect(422).expect({
            statusCode: 422,
            error: 'Unprocessable Entity',
            message: [
                'another error',
                'field1 is required',
                'error 2',
                'field2 is required'
            ]
        });
    });
});

//# sourceMappingURL=entity-validation-error.filter.spec.js.map