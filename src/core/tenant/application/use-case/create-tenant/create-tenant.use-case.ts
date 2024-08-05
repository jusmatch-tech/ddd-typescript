import { IUseCase } from "../../../../shared/application/use-case.interface";
import { Tenant } from "../../../domain/tenant.aggregate";
import { ITenantRepository } from "../../../domain/tenant.repository";
import { TenantOutput, TenantOutputMapper } from "../common/tenant-output";
import { CreateTenantInput } from "./create-tenant.input";

export class CreateTenantUseCase implements IUseCase<CreateTenantInput, CreateTenantOutput> {

  constructor(private readonly tenantRepo: ITenantRepository) { }


  async execute(input: CreateTenantInput): Promise<CreateTenantOutput> {
    const entity = Tenant.create(input);
    await this.tenantRepo.insert(entity);
    
    /*
    poderia retornar a entidade diretamente, mas isso faria que as camadas superiores conhecessem a 
    entidade que está em uma camada inferior, o que não é uma boa prática. Do ponto de vista prático 
    isso é uma problema uma vez que a alteração na entidade pode impactar em todas as camadas superiores
    */
    return TenantOutputMapper.toOutput(entity);
  }
}


export type CreateTenantOutput = TenantOutput;