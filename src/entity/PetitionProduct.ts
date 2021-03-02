import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  ManyToOne
} from 'typeorm'

import {Client} from './Client'
import {TypeProduct} from './TypeProduct'

@Entity()
export class PetitonProduct extends BaseEntity {

  @PrimaryGeneratedColumn('increment')
  id!: number

  @ManyToOne(type => Client, client => client.id)
  client!: Client

  @ManyToOne(type => TypeProduct, typeProduct => typeProduct.id)
  type_product!:TypeProduct

  @Column('boolean', { default: true })
  active!: boolean;

  @CreateDateColumn({ type: 'timestamp'})
  createdAt!: Date

  @UpdateDateColumn({ type: 'timestamp'})
  updateAt!: Date

}