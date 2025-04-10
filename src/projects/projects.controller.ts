import { Controller, Get, Post, Body, UseGuards } from "@nestjs/common";
import { ProjectsService } from "./projects.service";

import { Project } from "./project.entity";
import { CreateProjectDto } from "./dto-interfaces-types/create-project.dto";
import { AuthGuard } from "@nestjs/passport";

@Controller("projects")
@UseGuards(AuthGuard("jwt"))
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  create(@Body() createProjectDto: CreateProjectDto): Promise<Project> {
    return this.projectsService.create(createProjectDto);
  }

  @Get()
  findAll(): Promise<Project[]> {
    return this.projectsService.findAll();
  }
}
