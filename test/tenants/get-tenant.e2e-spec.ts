import { ITenantRepository } from '@core/tenant/domain/tenant.repository';
import { startApp } from '../../src/nest-modules/shared-module/testing/helpers';
import request from 'supertest';
import { TENANT_PROVIDERS } from '../../src/nest-modules/tenants-module/tenants.providers';
import { GetTenantFixture } from '../../src/nest-modules/tenants-module/testing/tenant-fixture';
import { Tenant } from '@core/tenant/domain/tenant.aggregate';
import { TenantOutputMapper } from '@core/tenant/application/use-case/common/tenant-output';
import { TenantsController } from '../../src/nest-modules/tenants-module/tenants.controller';
import { instanceToPlain } from 'class-transformer';

describe('tenantsController (e2e)', () => {
  const nestApp = startApp();
  describe('/tenants/:id (GET)', () => {
    describe('should a response error when id is invalid or not found', () => {
      const arrange = [
        {
          id: '88ff2587-ce5a-4769-a8c6-1d63d29c5f7a',
          expected: {
            message:
              'Tenant Not Found using ID 88ff2587-ce5a-4769-a8c6-1d63d29c5f7a',
            statusCode: 404,
            error: 'Not Found',
          },
        },
        {
          id: 'fake id',
          expected: {
            statusCode: 422,
            message: 'Validation failed (uuid is expected)',
            error: 'Unprocessable Entity',
          },
        },
      ];

      test.each(arrange)('when id is $id', async ({ id, expected }) => {
        return request(nestApp.app.getHttpServer())
          .get(`/tenants/${id}`)
          .expect(expected.statusCode)
          .expect(expected);
      });
    });

    it('should return a tenant ', async () => {
      const tenantRepo = nestApp.app.get<ITenantRepository>(
        TENANT_PROVIDERS.REPOSITORIES.TENANT_REPOSITORY.provide,
      );
      const tenant = Tenant.fake().aTenant().build();
      await tenantRepo.insert(tenant);

      const res = await request(nestApp.app.getHttpServer())
        .get(`/tenants/${tenant.tenant_id.id}`)
        .expect(200);
      const keyInResponse = GetTenantFixture.keysInResponse;
      expect(Object.keys(res.body)).toStrictEqual(['data']);
      expect(Object.keys(res.body.data)).toStrictEqual(keyInResponse);

      const presenter = TenantsController.serialize(
        TenantOutputMapper.toOutput(tenant),
      );
      const serialized = instanceToPlain(presenter);
      expect(res.body.data).toStrictEqual(serialized);
    });
  });
});
