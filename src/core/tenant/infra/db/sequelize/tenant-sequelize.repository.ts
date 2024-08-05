import { Op, literal } from 'sequelize';
import { Tenant, TenantId } from '../../../domain/tenant.aggregate';
import {
  ITenantRepository,
  TenantSearchParams,
  TenantSearchResult,
} from '../../../domain/tenant.repository';
import { TenantModel } from './tenant.model';
import { NotFoundError } from '../../../../shared/domain/errors/not-found.error';
import { TenantModelMapper } from './tenant-model-mapper';
import { SortDirection } from '@core/shared/domain/repository/search-params';

export class TenantSequelizeRepository implements ITenantRepository {
  sortableFields: string[] = ['created_at', 'name'];
  orderBy = {
    mysql: {
      name: (sort_dir: SortDirection) => literal(`binary name ${sort_dir}`),
    },
  };

  constructor(private tenantModel: typeof TenantModel) {}

  async insert(entity: Tenant): Promise<void> {
    const modelProps = TenantModelMapper.toModel(entity);
    await this.tenantModel.create(modelProps.toJSON());
  }
  async bulkInsert(entities: Tenant[]): Promise<void> {
    const modelsProps = entities.map((entity) =>
      TenantModelMapper.toModel(entity).toJSON(),
    );
    await this.tenantModel.bulkCreate(modelsProps);
  }
  async update(entity: Tenant): Promise<void> {
    const id = entity.tenant_id.id;
    const model = await this._get(id);
    if (!model) {
      throw new NotFoundError(id, this.getEntity());
    }

    const modelProps = TenantModelMapper.toModel(entity);
    await this.tenantModel.update(modelProps.toJSON(), {
      where: { tenant_id: id },
    });
  }

  async delete(tenant_id: TenantId): Promise<void> {
    const id = tenant_id.id;
    const model = await this._get(id);
    if (!model) {
      throw new NotFoundError(id, this.getEntity());
    }
    await this.tenantModel.destroy({ where: { tenant_id: id } });
  }

  async findById(entity_id: TenantId): Promise<Tenant | null> {
    const model = await this._get(entity_id.id);

    return model ? TenantModelMapper.toEntity(model) : null;
  }

  private async _get(id: string) {
    return await this.tenantModel.findByPk(id);
  }

  async findAll(): Promise<Tenant[]> {
    const models = await this.tenantModel.findAll();
    return models.map((model) => {
      return TenantModelMapper.toEntity(model);
    });
  }

  async search(props: TenantSearchParams): Promise<TenantSearchResult> {
    const offset = (props.page - 1) * props.per_page;
    const limit = props.per_page;
    const { rows: models, count } = await this.tenantModel.findAndCountAll({
      ...(props.filter && {
        where: {
          name: { [Op.like]: `%${props.filter}%` },
        },
      }),
      ...(props.sort && this.sortableFields.includes(props.sort)
        ? //{ order: [[props.sort, props.sort_dir]] }
          { order: this.formatSort(props.sort, props.sort_dir!) }
        : { order: [['created_at', 'desc']] }),
      offset,
      limit,
    });

    return new TenantSearchResult({
      items: models.map((model) => {
        return TenantModelMapper.toEntity(model);
      }),
      current_page: props.page,
      per_page: props.per_page,
      total: count,
      last_page: Math.ceil(count / props.per_page),
    });
  }

  private formatSort(sort: string, sort_dir: SortDirection) {
    const dialect = this.tenantModel.sequelize!.getDialect() as 'mysql';
    if (this.orderBy[dialect] && this.orderBy[dialect][sort]) {
      return this.orderBy[dialect][sort](sort_dir);
    }
    return [[sort, sort_dir]];
  }

  getEntity(): new (...args: any[]) => Tenant {
    return Tenant;
  }
}
