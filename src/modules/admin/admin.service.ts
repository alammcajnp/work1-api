import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserService } from './../user/user.service';
import { Admin } from './interfaces/admin.interface';
import { User } from './../user/interfaces/user.interface';
import { CreateAdminDTO } from './dto/create-admin.dto';
import { UtilityService } from '../../services/utility.service';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel('Admin') private readonly adminModel: Model<Admin>,
    private userService: UserService
  ) {}

  // Login
  async loginAdmin(createAdminDTO: CreateAdminDTO): Promise<Admin> {
    const admin = await this.adminModel
      .findOne(createAdminDTO, { email: 1, mobile: 1, full_name: 1, _id: 1 })
      .exec();
    return admin;
  }
  async changePassword(id, createAdminDTO: CreateAdminDTO): Promise<Admin> {
    const admin = await this.adminModel.findByIdAndUpdate(id, createAdminDTO);
    return admin;
  }
  async getAllUsers(): Promise<User[]> {
    return await this.userService.getAllUser();
  }
}
