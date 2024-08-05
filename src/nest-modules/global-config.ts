import {
  ClassSerializerInterceptor,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { WrapperDataInterceptor } from './shared-module/interceptors/wrapper-data/wrapper-data.interceptor';
import { EntityValidationErrorFilter } from './shared-module/filters/entity-validation-error.filter';
import { NotFoundErrorFilter } from './shared-module/filters/not-found-error.filter';

export function applyGlobalConfig(app: INestApplication) {
  // como já tem uma class atribuida na entrada do controller, o pipes já vai hidratar o input e validar os dados
  app.useGlobalPipes(
    new ValidationPipe({
      errorHttpStatusCode: 422,
      transform: true,
    }),
  );
  //global Interceptor é parecido com um middleware, ele intercepta a requisição e a resposta
  app.useGlobalInterceptors(
    new WrapperDataInterceptor(),
    new ClassSerializerInterceptor(app.get(Reflector)),
  );
  app.useGlobalFilters(
    new EntityValidationErrorFilter(),
    new NotFoundErrorFilter(),
  );
}
