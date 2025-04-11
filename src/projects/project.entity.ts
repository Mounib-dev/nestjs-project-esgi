import { Exclude } from "class-transformer";
import { User } from "src/users/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column("decimal")
  budget: number;

  @Column()
  category: string;

  @ManyToOne((_type) => User, (user) => user.projects, { eager: false })
  @Exclude({ toPlainOnly: true })
  user: User;
}
