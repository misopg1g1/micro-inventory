import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class InventoryEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    product_id: string;
    @Column()
    stock: number;
    @Column()
    warehouse_id: string;
    @Column()
    created_at: string;
    @Column()
    update_at: string;
}