"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _entity = require("../../../../domain/entity");
const _uuidvo = require("../../../../domain/value-objects/uuid.vo");
const _inmemoryrepository = require("../in-memory.repository");
let StubEntity = class StubEntity extends _entity.Entity {
    toJSON() {
        return {
            entity_id: this.entity_id,
            name: this.name,
            price: this.price
        };
    }
    constructor(props){
        super();
        this.entity_id = props?.entity_id ?? new _uuidvo.Uuid();
        this.name = props?.name ?? 'Stub Entity';
        this.price = props?.price ?? 0;
    }
};
let StubInMemoryRepository = class StubInMemoryRepository extends _inmemoryrepository.InMemoryRepository {
    getEntity() {
        return StubEntity;
    }
};
describe('InMemoryRepository unit tests', ()=>{
    let repo;
    beforeEach(()=>{
        repo = new StubInMemoryRepository();
    });
    test('should insert entity', async ()=>{
        const entity = new StubEntity({
            entity_id: new _uuidvo.Uuid(),
            name: 'Stub Entity',
            price: 100
        });
        await repo.insert(entity);
        expect(repo.items.length).toBe(1);
        expect(repo.items[0]).toBe(entity);
    });
    test('should bulk insert entities', async ()=>{
        const entities = [
            new StubEntity({
                entity_id: new _uuidvo.Uuid(),
                name: 'Stub Entity 1',
                price: 100
            }),
            new StubEntity({
                entity_id: new _uuidvo.Uuid(),
                name: 'Stub Entity 2',
                price: 200
            })
        ];
        await repo.bulkInsert(entities);
        expect(repo.items.length).toBe(2);
        expect(repo.items[0]).toBe(entities[0]);
        expect(repo.items[1]).toBe(entities[1]);
    });
});

//# sourceMappingURL=in-memory.repository.spec.js.map