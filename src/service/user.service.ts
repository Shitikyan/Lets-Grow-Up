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

  async assignRoleToUser(userId: number, roleName: string): Promise<Role> {
    let role = await this.roleRepository.findOne({ where: { name: roleName } });

    if (!role) {
      role = this.roleRepository.create({ name: roleName });
      role = await this.roleRepository.save(role); 
    }
    console.log(role)
    return role;
  }

  async createUser(userData: Partial<User>): Promise<User> {
    const user = this.userRepository.create(userData);
    
    const roleName = userData.role; // Assuming you directly provide role name in userData
    
    if (typeof roleName === 'string') {
      const role = await this.assignRoleToUser(user.id, roleName);
      if (role) {
        user.role = role;
      } else {
        // Handle the case where the role wasn't assigned
        // For example, throw an error or log a warning
      }
    } else {
      // Handle the case where roleName is not a string or is undefined/null
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

      // Notify admin users about the comment for a specific flowerId
      for (const adminUser of adminUsers) {
        this.sendNotification(adminUser, comment, flowerId);
      }
    }
  }
  private sendNotification(user: User, comment: string, flowerId: number): void {
    // Implement your notification logic here using flowerId and comment
    console.log(`Notifying admin user ${user.username} about the comment for flower ${flowerId}: ${comment}`);
    // Send the notification using the respective service or method
  }
}
