"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "TenantSequelizeRepository", {
    enumerable: true,
    get: function() {
        return TenantSequelizeRepository;
    }
});
const _sequelize = require("sequelize");
const _tenantentity = require("../../../domain/tenant.entity");
const _tenantrepository = require("../../../domain/tenant.repository");
const _notfounderror = require("../../../../shared/domain/errors/not-found.error");
const _tenantmodelmapper = require("./tenant-model-mapper");
let TenantSequelizeRepository = class TenantSequelizeRepository {
    async insert(entity) {
        const modelProps = _tenantmodelmapper.TenantModelMapper.toModel(entity);
        await this.tenantModel.create(modelProps.toJSON());
    }
    async bulkInsert(entities) {
        const modelsProps = entities.map((entity)=>_tenantmodelmapper.TenantModelMapper.toModel(entity).toJSON());
        await this.tenantModel.bulkCreate(modelsProps);
    }
    async update(entity) {
        const id = entity.tenant_id.id;
        const model = await this._get(id);
        if (!model) {
            throw new _notfounderror.NotFoundError(id, this.getEntity());
        }
        const modelProps = _tenantmodelmapper.TenantModelMapper.toModel(entity);
        await this.tenantModel.update(modelProps.toJSON(), {
            where: {
                tenant_id: id
            }
        });
    }
    async delete(tenant_id) {
        const id = tenant_id.id;
        const model = await this._get(id);
        if (!model) {
            throw new _notfounderror.NotFoundError(id, this.getEntity());
        }
        await this.tenantModel.destroy({
            where: {
                tenant_id: id
            }
        });
    }
    async findById(entity_id) {
        const model = await this._get(entity_id.id);
        return model ? _tenantmodelmapper.TenantModelMapper.toEntity(model) : null;
    }
    async _get(id) {
        return await this.tenantModel.findByPk(id);
    }
    async findAll() {
        const models = await this.tenantModel.findAll();
        return models.map((model)=>{
            return _tenantmodelmapper.TenantModelMapper.toEntity(model);
        });
    }
    async search(props) {
        const offset = (props.page - 1) * props.per_page;
        const limit = props.per_page;
        const { rows: models, count } = await this.tenantModel.findAndCountAll({
            ...props.filter && {
                where: {
                    name: {
                        [_sequelize.Op.like]: `%${props.filter}%`
                    }
                }
            },
            ...props.sort && this.sortableFields.includes(props.sort) ? {
                order: [
                    [
                        props.sort,
                        props.sort_dir
                    ]
                ]
            } : {
                order: [
                    [
                        'created_at',
                        'desc'
                    ]
                ]
            },
            offset,
            limit
        });
        return new _tenantrepository.TenantSearchResult({
            items: models.map((model)=>{
                return _tenantmodelmapper.TenantModelMapper.toEntity(model);
            }),
            current_page: props.page,
            per_page: props.per_page,
            total: count,
            last_page: Math.ceil(count / props.per_page)
        });
    }
    getEntity() {
        return _tenantentity.Tenant;
    }
    constructor(tenantModel){
        this.tenantModel = tenantModel;
        this.sortableFields = [
            'created_at',
            'name'
        ];
    }
};

//# sourceMappingURL=tenant-sequelize.repository.js.map