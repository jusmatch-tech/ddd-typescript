import { Tenant, TenantId } from '../tenant.aggregate';

describe('Tenant Unit Test', () => {
  describe('Constructor', () => {
    test('Should create a tenant with default value', () => {
      const tenant = new Tenant({
        name: 'test',
      });
      expect(tenant.tenant_id).toBeInstanceOf(TenantId);
      expect(tenant.name).toBe('test');
      expect(tenant.description).toBeNull();
      expect(tenant.is_active).toBeTruthy();
      expect(tenant.created_at).toBeInstanceOf(Date);
    });
    test('Should create a tenant with all values', () => {
      const created_at = new Date();
      const updated_at = new Date();
      const tenant = new Tenant({
        name: 'test',
        description: 'test',
        is_active: false,
        created_at,
        updated_at,
      });
      expect(tenant.tenant_id).toBeInstanceOf(TenantId);
      expect(tenant.name).toBe('test');
      expect(tenant.description).toBe('test');
      expect(tenant.is_active).toBeFalsy();
      expect(tenant.created_at).toBe(created_at);
      expect(tenant.updated_at).toBe(updated_at);
    });

    test('Should create a tenant with name and description', () => {
      const tenant = new Tenant({
        name: 'test',
        description: 'test',
      });
      expect(tenant.tenant_id).toBeInstanceOf(TenantId);
      expect(tenant.name).toBe('test');
      expect(tenant.description).toBe('test');
      expect(tenant.is_active).toBeTruthy();
      expect(tenant.created_at).toBeInstanceOf(Date);
    });
  });

  describe('Create', () => {
    test('Should create a tenant with default value', () => {
      const tenant = Tenant.create({
        name: 'test',
      });
      expect(tenant.tenant_id).toBeInstanceOf(TenantId);
      expect(tenant.name).toBe('test');
      expect(tenant.description).toBeNull();
      expect(tenant.is_active).toBeTruthy();
      expect(tenant.created_at).toBeInstanceOf(Date);
      //expect(validateSpy).toHaveBeenCalledTimes(1);
    });

    test('Should create a tenant with name and description', () => {
      const tenant = Tenant.create({
        name: 'test',
        description: 'test',
      });
      expect(tenant.tenant_id).toBeInstanceOf(TenantId);
      expect(tenant.name).toBe('test');
      expect(tenant.description).toBe('test');
      expect(tenant.is_active).toBeTruthy();
      expect(tenant.created_at).toBeInstanceOf(Date);
      //expect(validateSpy).toHaveBeenCalledTimes(1);
    });

    test('Should create a tenant with is_active false', () => {
      const tenant = Tenant.create({
        name: 'test',
        is_active: false,
      });
      expect(tenant.tenant_id).toBeInstanceOf(TenantId);
      expect(tenant.name).toBe('test');
      expect(tenant.description).toBeNull();
      expect(tenant.is_active).toBeFalsy();
      expect(tenant.created_at).toBeInstanceOf(Date);
    });
  });

  describe('tenant_id field', () => {
    const arrange = [
      { tenant_id: null },
      { tenant_id: undefined },
      { tenant_id: new TenantId() },
    ];
    test.each(arrange)(
      'Should create a tenant with tenant_id %p',
      ({ tenant_id }) => {
        const tenant = new Tenant({
          name: 'test',
          tenant_id: tenant_id as any,
        });
        expect(tenant.tenant_id).toBeInstanceOf(TenantId);
        if (tenant_id instanceof TenantId) {
          expect(tenant.tenant_id).toBe(tenant_id);
        }
      },
    );
  });

  describe('Change Name', () => {
    test('Should change name', () => {
      const tenant = Tenant.create({
        name: 'test',
      });
      tenant.changeName('test2');
      expect(tenant.name).toBe('test2');
      //expect(validateSpy).toHaveBeenCalledTimes(2);
    });
  });

  describe('Change Description', () => {
    test('Should change description', () => {
      const tenant = Tenant.create({
        name: 'test',
      });
      tenant.changeDescription('test2');
      expect(tenant.description).toBe('test2');
      //expect(validateSpy).toHaveBeenCalledTimes(2);
    });
  });

  describe('Activate', () => {
    test('Should activate tenant', () => {
      const tenant = Tenant.create({
        name: 'test',
        is_active: false,
      });
      tenant.activate();
      expect(tenant.is_active).toBeTruthy();
      //expect(validateSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('Deactivate', () => {
    test('Should deactivate tenant', () => {
      const tenant = Tenant.create({
        name: 'test',
        is_active: true,
      });
      tenant.deactivate();
      expect(tenant.is_active).toBeFalsy();
      //expect(validateSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('Tenant Validator', () => {
    describe('Create Command', () => {
      test('Should validate name', () => {
        const tenant = Tenant.create({ name: 't'.repeat(256) });
        expect(tenant.notification.hasErrors()).toBe(true);
        expect(tenant.notification).notificationContainsErrorMessages([
          {
            name: ['name must be shorter than or equal to 255 characters'],
          },
        ]);
      });
    });
    describe('Change Name Command', () => {
      it('Should a invalid tenant name property', () => {
        const tenant = Tenant.create({ name: 'test' });
        tenant.changeName('t'.repeat(256));
        expect(tenant.notification.hasErrors()).toBe(true);
        expect(tenant.notification).notificationContainsErrorMessages([
          {
            name: ['name must be shorter than or equal to 255 characters'],
          },
        ]);
      });
    });
  });
});
