import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToOne,
  OneToMany,
} from 'typeorm'
import { Report } from './Report'
import { Reply } from './Reply'

@Entity('requests')
export class Request extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('text')
  message: string

  @OneToOne(() => Report, (report) => report.request)
  report: Report

  @OneToMany(() => Reply, (reply) => reply.request)
  replies: Reply[]
}
