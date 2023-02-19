import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserType } from './types/user.type';
import { UserArgs } from './dto/user.args';

@Injectable()
export class UserService {
  constructor(@InjectModel('user') private user: Model<UserType>) {}

  async getUserById(id: string) {
    try {
      const data = await this.user.findById(id);
      if (data) return data;
      throw new NotFoundException('User Does Not Exist');
    } catch (e) {
      throw new UnprocessableEntityException(e.message);
    }
  }
  async createUser(userArgs: UserArgs) {
    try {
      const user = await this.user.create({
        ...userArgs,
      });
      if (user) return user;
      throw new UnprocessableEntityException();
    } catch (e) {
      throw new UnprocessableEntityException(e.message);
    }
  }

  async deleteUser(id: string) {
    try {
      const data = await this.user.deleteOne({ _id: id });
      if (data.deletedCount > 0) {
        return { success: 'User Deleted Successfully' };
      }
      throw new NotFoundException('User Does Not Exist');
    } catch (e) {
      throw new UnprocessableEntityException(e.message);
    }
  }
}
