import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  OneToMany
} from 'typeorm'

import {Product} from './Product'
@Entity()
export class Client extends BaseEntity {

  @PrimaryGeneratedColumn('increment')
  id!: number

  @Column('varchar', { length: 50 })
  type_document!: string

  @Column('varchar', { length: 50 })
  number_document!: string

  @Column('varchar', { length: 50 })
  name!: string

  @Column('varchar', { length: 80 })
  last_name!: string

  @Column('varchar', { length: 100 })
  email!: string

  @Column('varchar', { length: 20, nullable: true })
  telephone!: string

  @Column('varchar', { length: 20, nullable: true })
  phone!: string

  @Column({ type: 'date', nullable: true })
  date_birtday!: Date

  @Column('varchar', { length: 50 })
  gender!: string

  @OneToMany(type => Product, product => product.id)
  product!: Product

  @Column('varchar', { length: 50 })
  civil_status!: string

  @Column('boolean', { default: true })
  active!: boolean;

  @CreateDateColumn({ type: 'datetime' })
  createdAt!: Date

  @UpdateDateColumn({ type: 'datetime' })
  updateAt!: Date

}