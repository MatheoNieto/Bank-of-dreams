
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

  @Column('varchar', { length: 50 })
  state_petition!: string

  @Column('boolean', { default: false })
  close!: boolean;

  @Column('boolean', { default: true })
  active!: boolean;

  @CreateDateColumn({ type: 'datetime'})
  createdAt!: Date

  @UpdateDateColumn({ type: 'datetime'})
  updateAt!: Date

}