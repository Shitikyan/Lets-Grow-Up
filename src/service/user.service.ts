// user.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { Role } from '../entities/role.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  async assignRoleToUser(userId: number, roleName: string): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id: userId }, relations: ['roles'] });
    let role = await this.roleRepository.findOne({ where: { name: roleName } });

    if (!role) {
      role = await this.roleRepository.create({ name: roleName });
      role = await this.roleRepository.save(role); // Save the newly created role
    }

    if (user && role && !user.roles.find(existingRole => existingRole.id === role.id)) {
      user.roles.push(role);
      await this.userRepository.save(user);
    }
  }

  async createUser(userData: Partial<User>): Promise<User> {
    const user = await this.userRepository.create(userData);
    const { id, roles } = user;
    const userRoles = roles ? [...roles] : [];
    return this.userRepository.save(user);
  }
}