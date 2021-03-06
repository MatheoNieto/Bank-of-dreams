
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
import {stateSolicitude} from '../prototypes/typesPetitionProduct'

@Entity()
export class PetitonProduct extends BaseEntity {

  @PrimaryGeneratedColumn('increment')
  id!: number

  @ManyToOne(type => Client, client => client.id)
  client!: Client

  @ManyToOne(type => TypeProduct, typeProduct => typeProduct.id)
  type_product!:TypeProduct

  @Column({ type: 'enum', enum: stateSolicitude, default: stateSolicitude.pending })
  state_petition!: stateSolicitude

  @Column('boolean', { default: false })
  close!: boolean;

  @Column('boolean', { default: true })
  active!: boolean;

  @CreateDateColumn({ type: 'datetime'})
  createdAt!: Date

  @UpdateDateColumn({ type: 'datetime'})
  updateAt!: Date

}