import { Test, TestingModule } from '@nestjs/testing';
import { InventoryService } from './inventory.service';
import { Repository } from 'typeorm';
import { InventoryEntity } from './inventory.entity';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';

describe('InventoryService', () => {
  let service: InventoryService;
  let repository: Repository<InventoryEntity>;
  let inventoryList: InventoryEntity[];

  const seedDatabase = async () => {
    await repository.clear();
    inventoryList = [];
    for (let i = 0; i < 5; i++) {
      const inventory: InventoryEntity = await repository.save({
        product_id: faker.datatype.uuid(),
        stock: faker.datatype.number(),
        warehouse_id: faker.datatype.uuid(),
        created_at: faker.datatype.datetime().toISOString(),
        update_at: faker.datatype.datetime().toISOString(),
      });
      inventoryList.push(inventory);
    }
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [InventoryService],
    }).compile();

    service = module.get<InventoryService>(InventoryService);
    repository = module.get<Repository<InventoryEntity>>(
      getRepositoryToken(InventoryEntity),
    );
    await seedDatabase();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll should return all inventoriew', async () => {
    const inventories: InventoryEntity[] = await service.findAll();
    expect(inventories).not.toBeNull();
    expect(inventories).toHaveLength(inventoryList.length);
  });

  it('findOne should return a inventory by product_id', async () => {
    const storedInventory: InventoryEntity = inventoryList[0];
    const inventory: InventoryEntity = await service.findOne(
      storedInventory.product_id,
    );
    expect(inventory).not.toBeNull();
    expect(inventory.stock).toEqual(storedInventory.stock);
    expect(inventory.warehouse_id).toEqual(storedInventory.warehouse_id);
    expect(inventory.created_at).toEqual(storedInventory.created_at);
    expect(inventory.update_at).toEqual(storedInventory.update_at);
  });

  it('findOne should throw an exception for an invalid product_id', async () => {
    await expect(() =>
      service.findOne(faker.datatype.uuid()),
    ).rejects.toHaveProperty(
      'message',
      'The inventory with the given product id was not found',
    );
  });

  it('create should return a new inventory', async () => {
    const inventory: InventoryEntity = {
      id: '',
      product_id: faker.datatype.uuid(),
      stock: faker.datatype.number(),
      warehouse_id: faker.datatype.uuid(),
      created_at: faker.datatype.datetime().toISOString(),
      update_at: faker.datatype.datetime().toISOString(),
    };
    const newInventory: InventoryEntity = await service.create(inventory);
    expect(newInventory).not.toBeNull();

    const storedInventory: InventoryEntity = await repository.findOne({
      where: { product_id: newInventory.product_id },
    });
    expect(storedInventory).not.toBeNull();
    expect(storedInventory.stock).toEqual(newInventory.stock);
    expect(storedInventory.warehouse_id).toEqual(newInventory.warehouse_id);
    expect(storedInventory.created_at).toEqual(newInventory.created_at);
    expect(storedInventory.update_at).toEqual(newInventory.update_at);
  });

  it('create should throw an exception for an existing product_id', async () => {
    const inventory: InventoryEntity = {
      id: '',
      product_id: inventoryList[1].product_id,
      stock: faker.datatype.number(),
      warehouse_id: faker.datatype.uuid(),
      created_at: faker.datatype.datetime().toISOString(),
      update_at: faker.datatype.datetime().toISOString(),
    };
    await expect(() => service.create(inventory)).rejects.toHaveProperty(
      'message',
      'The inventory with the given product id already exist',
    );
  });

  it('update should modify an existing inventory', async () => {
    const inventory: InventoryEntity = inventoryList[0];
    inventory.stock = inventory.stock + 3;
    const updatedInventory: InventoryEntity = await service.update(
      inventory.product_id,
      inventory,
    );
    expect(updatedInventory).not.toBeNull();
    const storedInventory: InventoryEntity = await repository.findOne({
      where: { product_id: inventory.product_id },
    });
    expect(storedInventory).not.toBeNull();
    expect(storedInventory.stock).toEqual(inventory.stock);
  });

  it('update should throw an exception for an invalid product_id', async () => {
    const inventory: InventoryEntity = inventoryList[0];
    await expect(() =>
      service.update(faker.datatype.uuid(), inventory),
    ).rejects.toHaveProperty(
      'message',
      'The inventory with the given product id was not found',
    );
  });

  it('update should throw an exception for a stock < 0', async () => {
    const inventory: InventoryEntity = inventoryList[0];
    inventory.stock = -1;
    await expect(() =>
      service.update(inventory.product_id, inventory),
    ).rejects.toHaveProperty('message', 'The stock value is less than allowed');
  });

  afterAll(() => {
    repository.clear();
  });
});
