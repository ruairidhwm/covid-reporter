import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
} from 'typeorm'
import { Report } from './Report'

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('text')
  email: string

  @Column('text')
  password: string

  @Column('int', { default: 0, nullable: true })
  count: number

  @OneToMany(() => Report, (report) => report.user)
  reports: Report[]
}
