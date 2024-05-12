import { Module } from '@nestjs/common';
import { ClientProxyFactory } from '@nestjs/microservices';
import { ConfigService } from 'src/services/config/config.service';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';

@Module({
  imports: [
    // ClientsModule.registerAsync([
    //   {
    //     name: 'AUTH_SERVICE',
    //     useFactory: (configService: ConfigService) => {
    //       return
    //     },
    //     inject: [ConfigService],
    //   },
    // ]),
    // KeycloakConnectModule.register({
    //   authServerUrl: 'http://localhost:8089', // might be http://localhost:8080/auth for older keycloak versions
    //   realm: 'master',
    //   clientId: 'gramod-backend',
    //   secret: 'oTaiuuEHd5GlMmQgTThKq9TSBDChJ9ue',
    //   policyEnforcement: PolicyEnforcementMode.PERMISSIVE, // optional
    //   tokenValidation: TokenValidation.ONLINE, // optional
    // }),
  ],
  providers: [
    ConfigService,
    AuthResolver,
    AuthService,

    {
      provide: 'AUTH_SERVICE',
      useFactory: (configService: ConfigService) => {
        const authServiceOptions = configService.get('authService');
        return ClientProxyFactory.create(authServiceOptions);
      },
      inject: [ConfigService],
    },
  ],
})
export class AuthModule {}
