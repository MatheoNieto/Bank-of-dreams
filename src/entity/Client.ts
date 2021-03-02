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

enum Genero {
  m = "Masculino",
  f = "Femenino",
}

enum EstadoCivil {
  soltero = 'Soltero(a)',
  casado = 'Casado(a)',
  viudo = 'Viudo(a)',
  divorciado = 'Divorciado(a)',
  union_libre = 'Unión libre',
}

enum TipoDocumento {
  cedula = 'Cédula',
  ti = 'Tarjeta de identidad',
  pa = 'Pasaporte',
}


@Entity()
export class Client extends BaseEntity {

  @PrimaryGeneratedColumn('increment')
  id!: number

  @Column({ type: 'enum', enum: TipoDocumento, default: TipoDocumento.cedula })
  type_document!: TipoDocumento

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

  @Column({ nullable: true })
  date_birtday!: Date

  @Column({ type: 'enum', enum: Genero, default: Genero.m })
  gender!: Genero

  @OneToMany(type => Product, product => product.id)
  product!: Product

  @Column({ type: 'enum', enum: EstadoCivil, default: EstadoCivil.soltero })
  civil_status!: EstadoCivil

  @Column('boolean', { default: true })
  active!: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date

  @UpdateDateColumn({ type: 'timestamp' })
  updateAt!: Date

}