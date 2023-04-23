import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository  } from 'typeorm';
import { InventoryEntity } from './inventory.entity';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { stringify } from 'querystring';

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(InventoryEntity)
    private readonly inventoryRepository: Repository<InventoryEntity>,
  ) {}

  async findAll(): Promise<InventoryEntity[]> {
    return await this.inventoryRepository.find({
      order: {
        product_id: 'ASC'
      }
    })
  }

  async findOne(product_id: string): Promise<InventoryEntity> {
    const inventory: InventoryEntity = await this.inventoryRepository.findOne({
      where: { product_id },
    });
    if (!inventory)
      throw new BusinessLogicException(
        'The inventory with the given product id was not found',
        BusinessError.NOT_FOUND,
      );
    return inventory;
  }

  async create(inventory: InventoryEntity): Promise<InventoryEntity> {
    const existingInventory: InventoryEntity = await this.inventoryRepository.findOne({
      where: { 'product_id':inventory.product_id},
    });
    if (existingInventory)
      throw new BusinessLogicException(
        'The inventory with the given product id already exist',
      BusinessError.PRECONDITION_FAILED,
    );
    return await this.inventoryRepository.save(inventory);
  }

  async update(product_id: string, inventory: InventoryEntity): Promise<InventoryEntity> {
    const persistedInventory: InventoryEntity = await this.inventoryRepository.findOne({
      where: { product_id },
    });
    if (!persistedInventory)
      throw new BusinessLogicException(
        'The inventory with the given product id was not found',
      BusinessError.NOT_FOUND,
    );
    if (inventory.stock < 0)
      throw new BusinessLogicException(
      'The stock value is less than allowed',
      BusinessError.PRECONDITION_FAILED,
    );
    return await this.inventoryRepository.save({
    ...persistedInventory,
    ...inventory,
    });  
  }
}
