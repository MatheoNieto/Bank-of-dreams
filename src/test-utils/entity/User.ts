import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  AfterUpdate,
  OneToOne,
  JoinColumn
} from 'typeorm'

import { Client } from './Client'

@Entity()
export class User extends BaseEntity {

  @PrimaryGeneratedColumn('increment')
  id!: number

  @OneToOne(type => Client)
  @JoinColumn()
  client!: Client

  @Column('varchar', { length: 150, unique: true })
  usermail!: string

  @Column('text')
  password!: string

  @Column('boolean', { default: true })
  active!: boolean;

  @CreateDateColumn({ type: 'datetime' })
  createdAt!: Date

  @UpdateDateColumn({ type: 'datetime' })
  updateAt!: Date

  @AfterUpdate()
  updateDates() {
    this.updateAt = new Date();
  }
}