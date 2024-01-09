import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { RoleService } from '../service/role.service';
import { UserService } from '../service/user.service';

export class FlowerCommentAddedEvent {
  constructor(
    public readonly flowerId: number,
    public readonly comment: string,
  ) {}
}

@Injectable()
export class FlowerCommentAddedListener {
  constructor(
    private readonly roleService: RoleService,
    private readonly userService: UserService,
  ) {}

  @OnEvent('flower.commentAdded')
  async handleFlowerCommentAdded(event: FlowerCommentAddedEvent) {
    const { comment, flowerId } = event;

    const adminUsers = await this.roleService.getUsersWithRole('Malyar');

    adminUsers.forEach(async (adminUser) => {
      await this.userService.notifyUserAboutComment(
        adminUser.id,
        comment,
        flowerId,
      );
    });
  }
}
