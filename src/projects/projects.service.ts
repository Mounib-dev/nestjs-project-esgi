import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Project } from "./project.entity";
import { CreateProjectDto } from "./dto-interfaces-types/create-project.dto";
import { User } from "src/users/user.entity";

export type ProjectWithoutUser = Pick<
  Project,
  "id" | "title" | "description" | "budget" | "category"
>;

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
    @InjectRepository(User) private userRepositry: Repository<User>,
  ) {}

  async create(
    createProjectDto: CreateProjectDto,
    user: User,
  ): Promise<ProjectWithoutUser> {
    const currentUser = await this.userRepositry.findOne({ where: user });
    if (!currentUser) {
      throw new NotFoundException("Aucun utilisateur trouvé");
    }

    const { title, description, budget, category } = createProjectDto;
    const project = this.projectsRepository.create({
      title,
      description,
      budget,
      category,
      user: currentUser,
    });

    try {
      await this.projectsRepository.save(project);
    } catch (err) {
      console.error(err);
    }
    const createdProject = {
      id: project.id,
      title,
      description,
      budget,
      category,
    };
    return createdProject;
  }

  async findAll(): Promise<Project[]> {
    return this.projectsRepository.find();
  }
}
