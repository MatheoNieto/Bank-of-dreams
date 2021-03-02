import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  ManyToOne
} from 'typeorm'

import {TypeProduct} from './TypeProduct'

@Entity()
export class Product extends BaseEntity {

  @PrimaryGeneratedColumn('increment')
  id!: number

  @Column('varchar', { length: 100, unique: true })
  number_product!: string

  @ManyToOne(type => TypeProduct, typeProduct => typeProduct.id)
  type_product!: TypeProduct

  @Column('boolean', { default: true })
  active!: boolean;

  @CreateDateColumn({ type: 'timestamp'})
  createdAt!: Date

  @UpdateDateColumn({ type: 'timestamp'})
  updateAt!: Date

}