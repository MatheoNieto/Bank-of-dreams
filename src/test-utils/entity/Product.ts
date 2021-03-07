import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  ManyToOne
} from 'typeorm'

import { TypeProduct } from './TypeProduct'
import { Client } from './Client'

@Entity()
export class Product extends BaseEntity {

  @PrimaryGeneratedColumn('increment')
  id!: number

  @Column('varchar', { length: 100, unique: true })
  number_product!: string

  @ManyToOne(type => Client, client => client.id)
  client!: Client

  @ManyToOne(type => TypeProduct, typeProduct => typeProduct.id)
  type_product!: TypeProduct

  @Column('double', { default: 0 })
  saldo!: number

  @Column('boolean', { default: true })
  active!: boolean;

  @CreateDateColumn({ type: 'datetime' })
  createdAt!: Date

  @UpdateDateColumn({ type: 'datetime' })
  updateAt!: Date

}