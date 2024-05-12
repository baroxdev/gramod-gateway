import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
@Injectable()
export class AuthService {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authServiceClient: ClientProxy,
  ) {}
  getHello(): Promise<string> {
    try {
      console.log('Sending hello message to auth service');
      return firstValueFrom(
        this.authServiceClient.send<string, string>('hello', 'test'),
      );
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
