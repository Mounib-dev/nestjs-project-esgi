import { Controller, Get, Post, Body, UseGuards } from "@nestjs/common";
import { ProjectsService, ProjectWithoutUser } from "./projects.service";

import { Project } from "./project.entity";
import { CreateProjectDto } from "./dto-interfaces-types/create-project.dto";
import { AuthGuard } from "@nestjs/passport";
import { GetUser } from "src/users/user.decorator";
import { User } from "src/users/user.entity";

@Controller("projects")
@UseGuards(AuthGuard("jwt"))
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  create(
    @Body() createProjectDto: CreateProjectDto,
    @GetUser() user: User,
  ): Promise<ProjectWithoutUser> {
    return this.projectsService.create(createProjectDto, user);
  }

  @Get()
  findAll(): Promise<Project[]> {
    return this.projectsService.findAll();
  }
}
