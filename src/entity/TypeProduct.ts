import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity
} from 'typeorm'

@Entity()
export class TypeProduct extends BaseEntity {

  @PrimaryGeneratedColumn('increment')
  id!: number

  @Column('varchar', { length: 100, unique:true })
  name!: string

  @Column('boolean', { default: true })
  active!: boolean;

  @CreateDateColumn({ type: 'datetime'})
  createdAt!: Date

  @UpdateDateColumn({ type: 'datetime'})
  updateAt!: Date

}