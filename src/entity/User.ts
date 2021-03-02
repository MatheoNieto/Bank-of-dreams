import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  AfterUpdate
} from 'typeorm'


@Entity()
export class User extends BaseEntity {

  @PrimaryGeneratedColumn('increment')
  id!: number

  @Column('varchar', { length: 100 })
  name!: string

  @Column('varchar', { length: 150, unique: true })
  usermail!: string

  @Column('text')
  password!: string

  @Column('boolean', { default: true })
  active!: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date

  @UpdateDateColumn({ type: 'timestamp' })
  updateAt!: Date

  @AfterUpdate()
  updateDates() {
    this.updateAt = new Date();
  }
}