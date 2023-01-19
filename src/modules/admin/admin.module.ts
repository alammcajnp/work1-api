import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { UserModule } from './../user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminSchema } from './schemas/admin.schema';
import { ConfigService } from '@nestjs/config';
import { UtilityService } from '../../services/utility.service';

@Module({
  imports: [
    UserModule,
    MongooseModule.forFeature([{ name: 'Admin', schema: AdminSchema }])
  ],
  controllers: [AdminController],
  providers: [AdminService, ConfigService, UtilityService]
})
export class AdminModule {}
