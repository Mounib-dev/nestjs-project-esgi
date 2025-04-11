import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
} from "typeorm";
import { UserRole } from "./dto-interfaces-types/user-role.type";
import { Project } from "src/projects/project.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column({ type: "enum", enum: UserRole, default: UserRole.ENTREPRENEUR })
  role: UserRole;

  @OneToMany((_type) => Project, (project) => project.user, { eager: true })
  projects: Project[];

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;
}
