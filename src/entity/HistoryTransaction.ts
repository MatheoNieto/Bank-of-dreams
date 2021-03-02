import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  ManyToMany,
  JoinTable
} from 'typeorm'

import { Product } from './Product'

@Entity()
export class HistoryTransaction extends BaseEntity {

  @PrimaryGeneratedColumn('increment')
  id!: number

  @Column('varchar', { length: 100 })
  detail_trasaction!: string

  @ManyToMany(type => Product)
  @JoinTable()
  product!: Product[]

  @Column('double', { default: 0 })
  before_saldo!: number

  @Column('double', { default: 0 })
  new_saldo!: number

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date

  @UpdateDateColumn({ type: 'timestamp' })
  updateAt!: Date
}