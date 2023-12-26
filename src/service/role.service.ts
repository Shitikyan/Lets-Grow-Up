import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../entities/role.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  async createRole(roleName: string): Promise<Role> {
    const existingRole = await this.roleRepository.findOne({ where: { name: roleName } });

    if (existingRole) {
      return existingRole;
    }

    const newRole = this.roleRepository.create({ name: roleName });
    return this.roleRepository.save(newRole);
  }
}
