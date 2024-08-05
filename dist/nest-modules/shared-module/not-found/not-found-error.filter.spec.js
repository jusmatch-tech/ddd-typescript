"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _entity = require("../../../core/shared/domain/entity");
const _common = require("@nestjs/common");
const _notfounderror = require("../../../core/shared/domain/errors/not-found.error");
const _testing = require("@nestjs/testing");
const _supertest = /*#__PURE__*/ _interop_require_default(require("supertest"));
const _notfounderrorfilter = require("./not-found-error.filter");
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
let StubEntity = class StubEntity extends _entity.Entity {
    toJSON() {
        return {};
    }
};
let StubController = class StubController {
    index() {
        throw new _notfounderror.NotFoundError('fake id', StubEntity);
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
describe('NotFoundFilter Unit Tests ', ()=>{
    let app;
    beforeEach(async ()=>{
        const moduleFixture = await _testing.Test.createTestingModule({
            controllers: [
                StubController
            ]
        }).compile();
        app = moduleFixture.createNestApplication();
        app.useGlobalFilters(new _notfounderrorfilter.NotFoundErrorFilter());
        await app.init();
    });
    it('should catch a EntityValidationError', ()=>{
        return (0, _supertest.default)(app.getHttpServer()).get('/stub').expect(404).expect({
            statusCode: 404,
            error: 'Not Found',
            message: 'StubEntity Not Found using ID fake id'
        });
    });
});

//# sourceMappingURL=not-found-error.filter.spec.js.map