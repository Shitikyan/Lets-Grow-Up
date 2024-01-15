import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions } from 'typeorm';
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

    const existingUser = await this.userRepository.findOne({
      where: [{ username }, { email }],
    });
    if (existingUser) {
      throw new ConflictException('Username or email already exists');
    }

    const user = this.userRepository.create({
      username,
      email,
      password,
    });

    if (role) {
      const fetchedRole = await this.roleRepository.findOne({
        where: { name: role },
      });

      if (fetchedRole) {
        user.role = fetchedRole;
      } else {
        const roleName = this.roleRepository.create({ name: role });
        user.role = await this.roleRepository.save(roleName);
      }
    } else {
      const roleName = this.roleRepository.create({ name: role });
      user.role = await this.roleRepository.save(roleName);
    }

    return this.userRepository.save(user);
  }

  async notifyUserAboutComment(
    userId: number,
    comment: string,
    flowerId: number,
  ): Promise<void> {
    const adminRole = await this.roleRepository.findOne({
      where: { name: 'Malyar' },
    });

    if (adminRole) {
      const adminUsers = await this.userRepository
        .createQueryBuilder('user')
        .innerJoin('user.roles', 'role')
        .where('role.id = :roleId', { roleId: adminRole.id })
        .getMany();

      for (const adminUser of adminUsers) {
        this.sendNotification(adminUser, comment, flowerId);
      }
    }
  }

  async findOne(criteria: FindOneOptions<User>): Promise<User | undefined> {
    return this.userRepository.findOne(criteria);
  }

  async getById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['role'],
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  private sendNotification(
    user: User,
    comment: string,
    flowerId: number,
  ): void {
    console.log(
      `Notifying admin user ${user.username} about the comment for flower ${flowerId}: ${comment}`,
    );
  }
}
