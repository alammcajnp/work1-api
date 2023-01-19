import { BadRequestException, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './interfaces/user.interface';
import { CreateUserDTO } from './dto/create-user.dto';
import { LoginUserDTO } from './dto/login-user.dto';
import { UtilityService } from '../../services/utility.service';
import { SendgridService } from 'src/sendgrid/sendgrid.service';
import { stringify } from 'querystring';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    private utilityService: UtilityService,
    private sendgridService: SendgridService,
    private configService: ConfigService
  ) {}

  async getAllUser(): Promise<User[]> {
    const users = await this.userModel.find().exec();
    return users;
  }

  async getUser(userID): Promise<User> {
    const user = await this.userModel.findById(userID).exec();
    return user;
  }

  async addUser(createUserDTO: CreateUserDTO): Promise<User> {
    try {
      const newUser = new this.userModel(createUserDTO);
      return await newUser.save();
    } catch (e) {
      if (e.code === 11000) {
        throw new BadRequestException({
          title: 'User already registered with this email'
        });
      }
      throw e;
    }
  }

  async loginUser(loginUserDTO: LoginUserDTO): Promise<User | any> {
    const user = await this.userModel
      .findOne(loginUserDTO, { email: 1, mobile: 1, full_name: 1, _id: 1 })
      .exec();
    return user;
  }

  async forgetPassword(
    loginUserDTO: LoginUserDTO,
    token: string
  ): Promise<User | any> {
    const email = loginUserDTO.email;
    const user = await this.userModel.find({ email: email }).update({
      token
    });
    return user;
  }

  async updatePassword(
    token: string,
    createUserDTO: CreateUserDTO
  ): Promise<User | any> {
    const user = await this.userModel
      .findOne({
        token: token
      })
      .update({
        password: createUserDTO.password
      });
    return user;
  }

  async verifyOTP(createUserDTO: CreateUserDTO): Promise<User | any> {
    var user = await this.userModel
      .findOne({
        token: createUserDTO.token,
        otp: createUserDTO.otp,
        status: 0
      })
      .update({
        status: 1
      });
    return user;
  }

  // Edit user details
  async updateUser(userID, createUserDTO: CreateUserDTO): Promise<User> {
    const updatedUser = await this.userModel.findByIdAndUpdate(
      userID,
      createUserDTO,
      { new: true }
    );
    return updatedUser;
  }

  // Delete a user
  async deleteUser(userID): Promise<any> {
    const deletedUser = await this.userModel.findByIdAndRemove(userID);
    return deletedUser;
  }
}
