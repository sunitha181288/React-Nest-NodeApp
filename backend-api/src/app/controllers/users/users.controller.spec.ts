import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from '@services/users/users.service';
import { HttpModule, CacheModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

describe('UsersController', () => {
  let controller: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        CacheModule.register({
          ttl: null,
          max: 100,
        }),
        ConfigModule.forRoot(),
        HttpModule,
      ],
      controllers: [UsersController],
      providers: [UsersService]
    }).compile();

    controller = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  it('controller should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('users service should be defined', () => {
    expect(usersService).toBeDefined();
  });
});
