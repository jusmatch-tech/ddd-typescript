import request from 'supertest';
import { instanceToPlain } from 'class-transformer';
import * as TenantProviders from '../../src/nest-modules/tenants-module/tenants.providers';
import { ITenantRepository } from '@core/tenant/domain/tenant.repository';
import { startApp } from '../../src/nest-modules/shared-module/testing/helpers';
import { ListTenantsFixture } from '../../src/nest-modules/tenants-module/testing/tenant-fixture';
import { TenantsController } from '../../src/nest-modules/tenants-module/tenants.controller';
import { TenantOutputMapper } from '@core/tenant/application/use-case/common/tenant-output';

describe('TenantsController (e2e)', () => {
  describe('/tenants (GET)', () => {
    describe('should return tenants sorted by created_at when request query is empty', () => {
      let tenantRepo: ITenantRepository;
      const nestApp = startApp();
      const { entitiesMap, arrange } =
        ListTenantsFixture.arrangeIncrementedWithCreatedAt();

      beforeEach(async () => {
        tenantRepo = nestApp.app.get<ITenantRepository>(
          TenantProviders.REPOSITORIES.TENANT_REPOSITORY.provide,
        );
        await tenantRepo.bulkInsert(Object.values(entitiesMap));
      });

      test.each(arrange)(
        'when query params is $send_data',
        async ({ send_data, expected }) => {
          const queryParams = new URLSearchParams(send_data as any).toString();
          return request(nestApp.app.getHttpServer())
            .get(`/tenants/?${queryParams}`)
            .expect(200)
            .expect({
              data: expected.entities.map((e) =>
                instanceToPlain(
                  TenantsController.serialize(TenantOutputMapper.toOutput(e)),
                ),
              ),
              meta: expected.meta,
            });
        },
      );
    });

    describe('should return tenants using paginate, filter and sort', () => {
      let tenantRepo: ITenantRepository;
      const nestApp = startApp();
      const { entitiesMap, arrange } = ListTenantsFixture.arrangeUnsorted();

      beforeEach(async () => {
        tenantRepo = nestApp.app.get<ITenantRepository>(
          TenantProviders.REPOSITORIES.TENANT_REPOSITORY.provide,
        );
        await tenantRepo.bulkInsert(Object.values(entitiesMap));
      });

      test.each([arrange])(
        'when query params is $send_data',
        async ({ send_data, expected }) => {
          const queryParams = new URLSearchParams(send_data as any).toString();
          return request(nestApp.app.getHttpServer())
            .get(`/tenants/?${queryParams}`)
            .expect(200)
            .expect({
              data: expected.entities.map((e) =>
                instanceToPlain(
                  TenantsController.serialize(TenantOutputMapper.toOutput(e)),
                ),
              ),
              meta: expected.meta,
            });
        },
      );
    });
  });
});
