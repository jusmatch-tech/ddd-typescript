import { Entity } from "../../../../domain/entity";
import { Uuid } from "../../../../domain/value-objects/uuid.vo";
import { InMemoryRepository } from "../in-memory.repository";

type StubEntityConstructorProps = {
  entity_id?: Uuid;
  name: string;
  price: number;
};

class StubEntity extends Entity {
  entity_id: Uuid;
  name: string;
  price: number;

  constructor(props?: StubEntityConstructorProps) {
    super();
    this.entity_id = props?.entity_id ?? new Uuid();
    this.name = props?.name ?? 'Stub Entity';
    this.price = props?.price ?? 0;
  }

  toJSON() {
    return {
      entity_id: this.entity_id,
      name: this.name,
      price: this.price
    }
  }
}

class StubInMemoryRepository extends InMemoryRepository<StubEntity, Uuid> {
  getEntity(): new (...args: any[]) => StubEntity {
    return StubEntity;
  }
}
describe('InMemoryRepository unit tests', () => {
  let repo: StubInMemoryRepository;
  beforeEach(() => {
     repo = new StubInMemoryRepository();
  });
  
  test('should insert entity', async () => {
    const entity = new StubEntity({
      entity_id: new Uuid(),
      name: 'Stub Entity',
      price: 100,
    });

    await repo.insert(entity);

    expect(repo.items.length).toBe(1);
    expect(repo.items[0]).toBe(entity);
  });

  test('should bulk insert entities', async () => {
    const entities = [
      new StubEntity({
        entity_id: new Uuid(),
        name: 'Stub Entity 1',
        price: 100,
      }),
      new StubEntity({
        entity_id: new Uuid(),
        name: 'Stub Entity 2',
        price: 200,
      }),
    ];

    await repo.bulkInsert(entities);

    expect(repo.items.length).toBe(2);
    expect(repo.items[0]).toBe(entities[0]);
    expect(repo.items[1]).toBe(entities[1]);
  });
});