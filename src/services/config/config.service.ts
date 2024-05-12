import { Transport } from '@nestjs/microservices';

// @Injectable()
export class ConfigService {
  private readonly envConfig: { [key: string]: any } = null;

  constructor() {
    this.envConfig = {};
    console.log('API_GATEWAY_PORT', process.env.API_GATEWAY_PORT);
    this.envConfig.port = process.env.API_GATEWAY_PORT;
    this.envConfig.authService = {
      options: {
        host: process.env.AUTH_SERVICE_HOST,
        port: process.env.AUTH_SERVICE_PORT,
      },
      tranport: Transport.TCP,
    };

    this.envConfig.userService = {
      options: {
        host: process.env.USER_SERVICE_HOST,
        port: process.env.USER_SERVICE_PORT,
      },
      tranport: Transport.TCP,
    };

    console.log({
      envConfig: this.envConfig,
      authServiceConfig: this.envConfig.authService,
      userServiceConfig: this.envConfig.userService,
    });
  }

  get(key: string): any {
    return this.envConfig[key];
  }
}
