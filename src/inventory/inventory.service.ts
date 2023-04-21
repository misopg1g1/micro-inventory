import { Injectable } from '@nestjs/common';

@Injectable()
export class InventoryService {
  mockLogic = (body: any) => {
    return body;
  };
}
