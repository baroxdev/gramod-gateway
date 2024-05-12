import { Inject, Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_SERVICE') private readonly userServiceClient: ClientProxy,
  ) {}
  create(createUserInput: CreateUserInput) {
    return this.userServiceClient.send('createUser', createUserInput);
  }

  findAll() {
    return this.userServiceClient.send('findAllUsers', {});
  }

  findOne(id: string) {
    return this.userServiceClient.send('findOneUser', id);
  }

  update(id: string, updateUserInput: UpdateUserInput) {
    return this.userServiceClient.send('updateUser', {
      id,
      ...updateUserInput,
    });
  }

  remove(id: string) {
    return this.userServiceClient.send('removeUser', id);
  }
}
