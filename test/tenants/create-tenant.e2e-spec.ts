import { instanceToPlain } from 'class-transformer';
import { Uuid } from './../../src/core/shared/domain/value-objects/uuid.vo';
import request from 'supertest';
import { CreateTenantFixture } from '../../src/nest-modules/tenants-module/testing/tenant-fixture';
import { ITenantRepository } from '@core/tenant/domain/tenant.repository';
import { TENANT_PROVIDERS } from '../../src/nest-modules/tenants-module/tenants.providers';
import { startApp } from '../../src/nest-modules/shared-module/testing/helpers';
import { TenantsController } from '../../src/nest-modules/tenants-module/tenants.controller';
import { TenantOutputMapper } from '@core/tenant/application/use-case/common/tenant-output';

describe('TenantsController (e2e)', () => {
  const appHelper = startApp();

  let tenantRepo: ITenantRepository;

  beforeEach(async () => {
    tenantRepo = appHelper.app.get<ITenantRepository>(
      TENANT_PROVIDERS.REPOSITORIES.TENANT_REPOSITORY.provide,
    );
  });

  describe('/tenants (POST)', () => {
    describe('Should return a response error 422 status code when request body is invalid', () => {
      const invalidRequest = CreateTenantFixture.arrangeInvalidRequest();
      const arrange = Object.keys(invalidRequest).map((key) => ({
        label: key,
        value: invalidRequest[key],
      }));

      test.each(arrange)('When body is $label', async ({ value }) => {
        request(appHelper.app.getHttpServer())
          .post('/tenants')
          .send(value.send_data)
          // Used to debug the response body
          // .expect((res) => {
          //   console.log(res.body);
          // })
          .expect(422)
          .expect(value.expected);
      });
    });

    describe('Should return a response error 422 status code then throw EntityValidationError', () => {
      const invalidRequest =
        CreateTenantFixture.arrangeForEntityValidationError();
      const arrange = Object.keys(invalidRequest).map((key) => ({
        label: key,
        value: invalidRequest[key],
      }));

      test.each(arrange)('When body is $label', async ({ value }) => {
        request(appHelper.app.getHttpServer())
          .post('/tenants')
          .send(value.send_data)
          .expect(422)
          .expect(value.expected);
      });
    });

    describe('Should create a tenant', () => {
      const arrange = CreateTenantFixture.arrangeForCreate();

      test.each(arrange)(
        'When body is $send_data',
        async ({ send_data, expected }) => {
          const res = await request(appHelper.app.getHttpServer())
            .post('/tenants')
            .send(send_data)
            .expect(201);

          const keysInResponse = CreateTenantFixture.keysInResponse;
          expect(Object.keys(res.body)).toStrictEqual(['data']);
          expect(Object.keys(res.body.data)).toStrictEqual(keysInResponse);
          const id = res.body.data.id;
          const tenantCreated = await tenantRepo.findById(new Uuid(id));

          const presenter = TenantsController.serialize(
            TenantOutputMapper.toOutput(tenantCreated!),
          );
          const serialized = instanceToPlain(presenter);

          expect(res.body.data).toStrictEqual({
            id: serialized.id,
            created_at: serialized.created_at,
            updated_at: serialized.updated_at,
            ...expected,
          });
        },
      );
    });
  });
  // let app: INestApplication;

  // beforeEach(async () => {
  //   console.log(process.env.NODE_ENV);
  //   const moduleFixture: TestingModule = await Test.createTestingModule({
  //     imports: [AppModule],
  //   }).compile();

  //   app = moduleFixture.createNestApplication();
  //   await app.init();
  // });

  // it('/ (GET)', () => {
  //   return request(app.getHttpServer())
  //     .get('/')
  //     .expect(200)
  //     .expect('Hello World!');
  // });
});
