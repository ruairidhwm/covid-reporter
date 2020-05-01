import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToMany
} from "typeorm";
import { Report } from "./Report";

@Entity("symptoms")
export class Symptom extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar")
  name: string;

  @Column("varchar", { length: 256, nullable: true })
  description: string;

  @ManyToMany(
    () => Report,
    report => report.symptoms
  )
  reports: Report[];
}
