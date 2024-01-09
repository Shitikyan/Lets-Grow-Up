// user.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../dto/user.dto';
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

  async assignRoleToUser(userId: number, roleName: string): Promise<Role> {
    let role = await this.roleRepository.findOne({ where: { name: roleName } });

    if (!role) {
      role = this.roleRepository.create({ name: roleName });
      role = await this.roleRepository.save(role); 
    }
    return role;
  }

  async createUser(userData: CreateUserDto): Promise<User> {
    const { username, email, password, role } = userData; 
  
  
    const user = this.userRepository.create({
      username,
      email,
      password,
    });
  
    if (role) {
      const fetchedRole = await this.roleRepository.findOne({ where: { name: role } });
  
      if (fetchedRole) {
        user.role = fetchedRole; 
      } else {
        // Handle the case where the role wasn't found
        // For example, throw an error or log a warning
      }
    } else {
      // Handle the case where roleName is not provided in the DTO
      // For example, throw an error or log a warning
    }
  
    return this.userRepository.save(user);
  }

  async notifyUserAboutComment(userId: number, comment: string, flowerId: number): Promise<void> {
    const adminRole = await this.roleRepository.findOne({ where: { name: 'Malyar' } });

    if (adminRole) {
      const adminUsers = await this.userRepository.createQueryBuilder('user')
        .innerJoin('user.roles', 'role')
        .where('role.id = :roleId', { roleId: adminRole.id })
        .getMany();

      for (const adminUser of adminUsers) {
        this.sendNotification(adminUser, comment, flowerId);
      }
    }
  }

  async findOne(criteria: Partial<User>): Promise<User | undefined> {
    return this.userRepository.findOne({ where: criteria });
  }

  private sendNotification(user: User, comment: string, flowerId: number): void {
    console.log(`Notifying admin user ${user.username} about the comment for flower ${flowerId}: ${comment}`);
  }
}
