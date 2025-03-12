import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from "typeorm";
import { UserRole } from "./dto-interfaces-types/user-role.type";

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

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;
}
