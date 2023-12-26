import { Controller, Post, Body } from '@nestjs/common';
import { RoleService } from '../service/role.service';

@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  async createRole(@Body('name') roleName: string): Promise<string> {
    const createdRole = await this.roleService.createRole(roleName);
    return `Role '${createdRole.name}' created successfully`;
  }
}
