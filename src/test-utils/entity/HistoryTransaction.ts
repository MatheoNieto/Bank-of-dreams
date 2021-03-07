import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  ManyToOne
} from 'typeorm'

import { Product } from './Product'

@Entity()
export class HistoryTransaction extends BaseEntity {

  @PrimaryGeneratedColumn('increment')
  id!: number

  @Column('varchar', { length: 50 })
  type_trasaction!: string
  
  @Column('varchar', { length: 100 })
  detail_trasaction!: string

  @ManyToOne(type => Product, product => product.id)
  product!: Product[]

  @Column('double', { default: 0 })
  before_saldo!: number

  @Column('double', { default: 0 })
  new_saldo!: number

  @CreateDateColumn({ type: 'datetime' })
  createdAt!: Date

  @UpdateDateColumn({ type: 'datetime' })
  updateAt!: Date
}