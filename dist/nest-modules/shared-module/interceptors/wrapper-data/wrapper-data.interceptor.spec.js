"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _rxjs = require("rxjs");
const _wrapperdatainterceptor = require("./wrapper-data.interceptor");
describe('WrapperDataInterceptor', ()=>{
    let interceptor;
    beforeEach(()=>{
        interceptor = new _wrapperdatainterceptor.WrapperDataInterceptor();
    });
    it('should wrapper with data key', async ()=>{
        expect(interceptor).toBeDefined();
        const obs$ = interceptor.intercept({}, {
            handle: ()=>(0, _rxjs.of)({
                    name: 'test'
                })
        });
        // como observable não é uma promise nos usamos o lastValueFrom 
        //para pegar o valor do observable e transformar em uma promise
        const result = await (0, _rxjs.lastValueFrom)(obs$);
        expect(result).toEqual({
            data: {
                name: 'test'
            }
        });
    });
    it('should not wrapper with meta key', async ()=>{
        expect(interceptor).toBeDefined();
        const obs$ = interceptor.intercept({}, {
            handle: ()=>(0, _rxjs.of)({
                    name: 'test',
                    meta: {}
                })
        });
        const result = await (0, _rxjs.lastValueFrom)(obs$);
        expect(result).toEqual({
            name: 'test',
            meta: {}
        });
    });
});

//# sourceMappingURL=wrapper-data.interceptor.spec.js.map