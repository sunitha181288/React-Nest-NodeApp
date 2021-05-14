import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { HttpModule, CacheModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

describe('UsersService', () => {
  let service: UsersService;

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
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
