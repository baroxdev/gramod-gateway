import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './gateway.controller';
import { AppService } from './gateway.service';
import { AuthModule } from './auth/auth.module';
import { ConfigService } from './services/config/config.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule as OIDCAuthModule } from '@5stones/nest-oidc';
import {
  AuthGuard,
  KeycloakConnectModule,
  PolicyEnforcementMode,
  ResourceGuard,
  RoleGuard,
  TokenValidation,
} from 'nest-keycloak-connect';
import { APP_GUARD } from '@nestjs/core';
import { UserModule } from './user/user.module';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { DateScalar } from './graphql/scalars/date.scalar';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['../.env.local'],
    }),
    AuthModule,
    OIDCAuthModule.forRoot({
      oidcAuthority: 'http://localhost:8089/realms/master',
    }),

    // KeycloakConnectModule.register({
    //   authServerUrl: 'http://localhost:8089', // might be http://localhost:8080/auth for older keycloak versions
    //   realm: 'master',
    //   clientId: 'gramod-backend',

    //   secret: 'oTaiuuEHd5GlMmQgTThKq9TSBDChJ9ue',
    //   policyEnforcement: PolicyEnforcementMode.PERMISSIVE, // optional
    //   tokenValidation: TokenValidation.ONLINE, // optional
    // }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      // autoSchemaFile: configuration().NODE_ENV === 'dev' ? 'schema.gql' : true,
      autoSchemaFile: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      database: process.env.DB_NAME,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      retryAttempts: 10,
      retryDelay: 3000,
      logger: 'advanced-console',
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    ConfigService,
    DateScalar,
    // {
    //   provide: APP_GUARD,
    //   useClass: AuthGuard,
    // },
    // {
    //   provide: APP_GUARD,
    //   useClass: ResourceGuard,
    // },
    // {
    //   provide: APP_GUARD,
    //   useClass: RoleGuard,
    // },
  ],
})
export class AppModule {}
