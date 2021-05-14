import { Module, HttpModule, CacheModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersController } from './controllers/users/users.controller';
import { UsersService } from './services/users/users.service';

@Module({
  imports: [
    CacheModule.register({
      ttl: null,
      max: 100, // maximum number of items in cache
    }),
    ConfigModule.forRoot(),
    HttpModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class AppModule {}
