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
import {CivilStatus, Gender, TypeDocuments} from '../prototypes/typesClients'
@Entity()
export class Client extends BaseEntity {

  @PrimaryGeneratedColumn('increment')
  id!: number

  @Column({ type: 'enum', enum: TypeDocuments, default: TypeDocuments.dni })
  type_document!: TypeDocuments

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

  @Column({ type: 'enum', enum: Gender, default: Gender.m })
  gender!: Gender

  @OneToMany(type => Product, product => product.id)
  product!: Product

  @Column({ type: 'enum', enum: CivilStatus, default: CivilStatus.single })
  civil_status!: CivilStatus

  @Column('boolean', { default: true })
  active!: boolean;

  @CreateDateColumn({ type: 'datetime' })
  createdAt!: Date

  @UpdateDateColumn({ type: 'datetime' })
  updateAt!: Date

}