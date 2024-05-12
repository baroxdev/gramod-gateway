import { CurrentUserGraphQL, JwtAuthGuardGraphQL } from '@5stones/nest-oidc';
import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';

@UseGuards(JwtAuthGuardGraphQL)
@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => String, {
    name: 'hello',
  })
  async hello(@CurrentUserGraphQL() user): Promise<string> {
    console.log('user', user);
    return this.authService.getHello();
  }
}
