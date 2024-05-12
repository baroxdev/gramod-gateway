import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { ConfigService } from 'src/services/config/config.service';
import { ClientProxyFactory } from '@nestjs/microservices';

@Module({
  imports: [],
  providers: [
    UserResolver,
    UserService,
    ConfigService,
    {
      provide: 'USER_SERVICE',
      useFactory: (configService: ConfigService) => {
        const authServiceOptions = configService.get('userService');
        return ClientProxyFactory.create(authServiceOptions);
      },
      inject: [ConfigService],
    },
  ],
})
export class UserModule {}
