import {
  Controller,
  Get,
  Delete,
  Query,
  Param,
  HttpCode,
} from '@nestjs/common';
import { UsersDto } from '@models/users.model';
import { UsersService } from '@services/users/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * This HTTP method is used to fetch all the active users
   * @Query {UsersDto}
   */
  @Get()
  getUsers(@Query() query: UsersDto) {
    return this.usersService.fetchUsers(query);
  }

  /**
   * This HTTP method is used to delete the active user
   * @Param {userId}
   */
  @Delete(':id')
  @HttpCode(204)
  deleteUser(@Param() params) {
    return this.usersService.deleteUser(params.id);
  }
}
