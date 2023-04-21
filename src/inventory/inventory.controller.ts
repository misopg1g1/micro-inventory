import { Body, Controller, Patch, Post, Put } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { InventoryService } from './inventory.service';

@Controller('mock')
export class InventoryController {
  constructor(private inventoryService: InventoryService) {}
  @ApiBody({})
  @Post()
  async inventory_post(@Body() body: any) {
    return this.inventoryService.mockLogic(body);
  }

  @ApiBody({})
  @Put()
  async inventory_put(@Body() body: any) {
    return this.inventoryService.mockLogic(body);
  }

  @ApiBody({})
  @Patch()
  async inventory_patch(@Body() body: any) {
    return this.inventoryService.mockLogic(body);
  }
}
