import { Uuid } from './../../src/core/shared/domain/value-objects/uuid.vo';
import { ITenantRepository } from '@core/tenant/domain/tenant.repository';
import { startApp } from '../../src/nest-modules/shared-module/testing/helpers';
import request from 'supertest';
import { TENANT_PROVIDERS } from '../../src/nest-modules/tenants-module/tenants.providers';
import { Tenant } from '@core/tenant/domain/tenant.aggregate';

describe('TenantsController (e2e)', () => {
  describe('/delete/:id (DELETE)', () => {
    const appHelper = startApp();
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
        return request(appHelper.app.getHttpServer())
          .delete(`/tenants/${id}`)
          .expect(expected.statusCode)
          .expect(expected);
      });
    });

    it('should delete a tenant response with status 204', async () => {
      const tenantRepo = appHelper.app.get<ITenantRepository>(
        TENANT_PROVIDERS.REPOSITORIES.TENANT_REPOSITORY.provide,
      );
      const tenant = Tenant.fake().aTenant().build();
      await tenantRepo.insert(tenant);

      await request(appHelper.app.getHttpServer())
        .delete(`/tenants/${tenant.tenant_id.id}`)
        .expect(204);

      await expect(
        tenantRepo.findById(new Uuid(tenant.tenant_id.id)),
      ).resolves.toBeNull();
    });
  });
});
