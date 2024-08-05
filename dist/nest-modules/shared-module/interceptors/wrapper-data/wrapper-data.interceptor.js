"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WrapperDataInterceptor", {
    enumerable: true,
    get: function() {
        return WrapperDataInterceptor;
    }
});
const _common = require("@nestjs/common");
const _rxjs = require("rxjs");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let WrapperDataInterceptor = class WrapperDataInterceptor {
    intercept(context, next) {
        return next.handle().pipe((0, _rxjs.map)((body)=>!body || 'meta' in body ? body : {
                data: body
            }));
    }
};
WrapperDataInterceptor = _ts_decorate([
    (0, _common.Injectable)()
], WrapperDataInterceptor);

//# sourceMappingURL=wrapper-data.interceptor.js.map