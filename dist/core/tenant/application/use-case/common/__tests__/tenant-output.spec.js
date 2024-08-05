"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _tenantentity = require("../../../../domain/tenant.entity");
const _tenantoutput = require("../tenant-output");
describe('TenantOutputMapper unit tests', ()=>{
    it('should convert a tenant in output', ()=>{
        const entity = new _tenantentity.Tenant({
            name: 'Tenant 1',
            description: 'Description of tenant 1',
            is_active: true
        });
        const spyToJSON = jest.spyOn(entity, 'toJSON');
        const output = _tenantoutput.TenantOutputMapper.toOutput(entity);
        expect(spyToJSON).toHaveBeenCalledTimes(1);
        expect(output).toStrictEqual({
            id: entity.tenant_id.id,
            name: 'Tenant 1',
            description: 'Description of tenant 1',
            is_active: true,
            created_at: entity.created_at,
            updated_at: entity.updated_at
        });
    });
});

//# sourceMappingURL=tenant-output.spec.js.map