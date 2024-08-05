"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CreateTenantUseCase", {
    enumerable: true,
    get: function() {
        return CreateTenantUseCase;
    }
});
const _tenantentity = require("../../../domain/tenant.entity");
const _tenantoutput = require("../common/tenant-output");
let CreateTenantUseCase = class CreateTenantUseCase {
    async execute(input) {
        const entity = _tenantentity.Tenant.create(input);
        await this.tenantRepo.insert(entity);
        /*
    poderia retornar a entidade diretamente, mas isso faria que as camadas superiores conhecessem a 
    entidade que está em uma camada inferior, o que não é uma boa prática. Do ponto de vista prático 
    isso é uma problema uma vez que a alteração na entidade pode impactar em todas as camadas superiores
    */ return _tenantoutput.TenantOutputMapper.toOutput(entity);
    }
    constructor(tenantRepo){
        this.tenantRepo = tenantRepo;
    }
};

//# sourceMappingURL=create-tenant.use-case.js.map