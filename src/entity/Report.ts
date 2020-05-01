import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  OneToOne,
  ManyToMany,
  JoinTable,
  JoinColumn,
} from 'typeorm'
import { User } from './User'
import { Location } from './Location'
import { Symptom } from './Symptom'
import { Request } from './Request'

@Entity('reports')
export class Report extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(() => User, (user) => user.reports, { cascade: true })
  user: User

  @OneToOne(() => Location, { cascade: true })
  @JoinColumn()
  location: Location

  @OneToOne(() => Request, { cascade: true })
  @JoinColumn()
  request: Request

  @ManyToMany(() => Symptom, { cascade: true })
  @JoinTable()
  symptoms: Symptom[]
}
