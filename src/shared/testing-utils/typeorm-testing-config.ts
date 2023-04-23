import { TypeOrmModule } from "@nestjs/typeorm";
import { InventoryEntity } from "../../inventory/inventory.entity";



export const TypeOrmTestingConfig = () => [
    TypeOrmModule.forRoot({
        type: 'sqlite',
        database: 'memory',
        dropSchema: true,
        entities: [InventoryEntity],
        synchronize: true,
        keepConnectionAlive: true,
    }),
    TypeOrmModule.forFeature([InventoryEntity]),
];