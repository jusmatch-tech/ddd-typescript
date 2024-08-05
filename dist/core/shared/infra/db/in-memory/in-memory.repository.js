"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    InMemoryRepository: function() {
        return InMemoryRepository;
    },
    InMemorySearchableRepository: function() {
        return InMemorySearchableRepository;
    }
});
const _notfounderror = require("../../../domain/errors/not-found.error");
const _searchresult = require("../../../domain/repository/search-result");
let InMemoryRepository = class InMemoryRepository {
    async insert(entity) {
        this.items.push(entity);
    }
    async bulkInsert(entities) {
        this.items.push(...entities);
    }
    async update(entity) {
        const indexFound = this.items.findIndex((item)=>item.entity_id.equals(entity.entity_id));
        if (indexFound === -1) {
            throw new _notfounderror.NotFoundError(entity.entity_id, this.getEntity());
        }
        this.items[indexFound] = entity;
    }
    async delete(entity_id) {
        const indexFound = this.items.findIndex((item)=>item.entity_id.equals(entity_id));
        if (indexFound === -1) {
            throw new _notfounderror.NotFoundError(entity_id, this.getEntity());
        }
        this.items.splice(indexFound, 1);
    }
    async findById(entity_id) {
        return this._get(entity_id);
    }
    _get(entity_id) {
        const item = this.items.find((item)=>item.entity_id.equals(entity_id));
        return typeof item === 'undefined' ? null : item;
    }
    async findAll() {
        return this.items;
    }
    constructor(){
        this.items = [];
    }
};
let InMemorySearchableRepository = class InMemorySearchableRepository extends InMemoryRepository {
    async search(props) {
        const itemsFiltered = await this.applyFilter(this.items, props.filter);
        const itemsSorted = this.applySort(itemsFiltered, props.sort, props.sort_dir);
        const itemsPaginated = this.applyPaginate(itemsSorted, props.page, props.per_page);
        return new _searchresult.SearchResult({
            items: itemsPaginated,
            total: itemsFiltered.length,
            current_page: props.page,
            per_page: props.per_page,
            last_page: Math.ceil(itemsFiltered.length / props.per_page)
        });
    }
    applyPaginate(items, page, per_page) {
        const start = (page - 1) * per_page;
        const limit = start + per_page;
        return items.slice(start, limit);
    }
    applySort(items, sort, sort_dir, custom_getter) {
        if (!sort || !this.sortableFields.includes(sort)) {
            return items;
        }
        return [
            ...items
        ].sort((a, b)=>{
            const aValue = custom_getter ? custom_getter(sort, a) : a[sort];
            const bValue = custom_getter ? custom_getter(sort, b) : b[sort];
            if (aValue < bValue) {
                return sort_dir === 'asc' ? -1 : 1;
            }
            if (aValue > bValue) {
                return sort_dir === 'asc' ? 1 : -1;
            }
            return 0;
        });
    }
    constructor(...args){
        super(...args);
        this.sortableFields = [];
    }
};

//# sourceMappingURL=in-memory.repository.js.map