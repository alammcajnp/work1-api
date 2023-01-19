import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';
import { SendgridService } from '../../sendgrid/sendgrid.service';
import { ConfigService } from '@nestjs/config';
import { UtilityService } from '../../services/utility.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  controllers: [UserController],
  providers: [UserService, SendgridService, ConfigService, UtilityService],
  exports: [UserService]
})
export class UserModule {}
