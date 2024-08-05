"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _core = require("@nestjs/core");
const _appmodule = require("./app.module");
const _common = require("@nestjs/common");
const _wrapperdatainterceptor = require("./nest-modules/shared-module/interceptors/wrapper-data/wrapper-data.interceptor");
const _notfounderrorfilter = require("./nest-modules/shared-module/not-found/not-found-error.filter");
const _entityvalidationerrorfilter = require("./nest-modules/shared-module/not-found/entity-validation-error.filter");
async function bootstrap() {
    const app = await _core.NestFactory.create(_appmodule.AppModule);
    // como já tem uma class atribuida na entrada do controller, o pipes já vai hidratar o input e validar os dados
    app.useGlobalPipes(new _common.ValidationPipe({
        errorHttpStatusCode: 422
    }));
    //global Interceptor é parecido com um middleware, ele intercepta a requisição e a resposta
    app.useGlobalInterceptors(new _common.ClassSerializerInterceptor(app.get(_core.Reflector)));
    app.useGlobalInterceptors(new _wrapperdatainterceptor.WrapperDataInterceptor());
    app.useGlobalFilters(new _notfounderrorfilter.NotFoundErrorFilter(), new _entityvalidationerrorfilter.EntityValidationErrorFilter());
    await app.listen(3000);
}
bootstrap();

//# sourceMappingURL=main.js.map