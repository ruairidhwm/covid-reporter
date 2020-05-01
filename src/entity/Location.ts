import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToOne
} from "typeorm";
import { Report } from "./Report";

@Entity("locations")
export class Location extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("double precision")
  lat: number;

  @Column("double precision")
  lng: number;

  @OneToOne(
    () => Report,
    report => report.location
  )
  report: Report;
}
