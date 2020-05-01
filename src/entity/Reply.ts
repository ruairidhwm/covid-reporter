import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  JoinColumn,
} from 'typeorm'
import { Request } from './Request'

@Entity('replies')
export class Reply extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('text')
  message: string

  @ManyToOne(() => Request, (request) => request.replies, { cascade: true })
  @JoinColumn({ name: 'request_id', referencedColumnName: 'id' })
  request: Request
}
