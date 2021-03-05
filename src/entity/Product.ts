import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from 'typeorm'

import {TypeProducts} from '../prototypes/typesProducts'

@Entity()
export class Product extends BaseEntity {

  @PrimaryGeneratedColumn('increment')
  id!: number

  @Column('varchar', { length: 100, unique: true })
  number_product!: string

  @Column({ type: 'enum', enum: TypeProducts, default: TypeProducts.credit_card })
  type_product!: TypeProducts

  @Column('boolean', { default: true })
  active!: boolean;

  @CreateDateColumn({ type: 'timestamp'})
  createdAt!: Date

  @UpdateDateColumn({ type: 'timestamp'})
  updateAt!: Date

}