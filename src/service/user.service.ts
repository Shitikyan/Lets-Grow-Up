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
    console.log(role)
    return role;
  }

  async createUser(userData: CreateUserDto): Promise<User> {
    const { username, email, password, role } = userData; // Assuming roleName is provided in the DTO
  
    const hashedPassword = await bcrypt.hash(password, 10);   
  
    const user = this.userRepository.create({
      username,
      email,
      password: hashedPassword,
    });
  
    if (role) {
      const fetchedRole = await this.roleRepository.findOne({ where: { name: role } }); // Fetch the role by its name
  
      if (fetchedRole) {
        user.role = fetchedRole; // Assign the fetched role to the user
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
