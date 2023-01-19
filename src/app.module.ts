import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { CustomerModule } from './modules/customer/customer.module';
import { UserModule } from './modules/user/user.module';
import { GameModule } from './modules/game/game.module';
import { AdminModule } from './modules/admin/admin.module';
import { LevelModule } from './modules/level/level.module';
import { SendgridService } from './sendgrid/sendgrid.service';
import { MailController } from './mail/mail.controller';
import { AuthModule } from './auth/auth.module';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { UserController } from './modules/user/user.controller';
import { AdminController } from './modules/admin/admin.controller';
import { UtilityService } from './services/utility.service';
import { multerOptions } from './config/multer.config';
import { AdminAuthMiddleware } from './middlewares/admin.auth.middleware';

const ENV = process.env.NODE_ENV;

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: !ENV ? '.env' : `.env.${ENV}`
    }),
    MongooseModule.forRoot(process.env.MONGO_CON_STRING, {
      useNewUrlParser: true
    }),
    CustomerModule,
    UserModule,
    GameModule,
    AdminModule,
    LevelModule,
    AuthModule
  ],

  controllers: [AppController, MailController],
  providers: [AppService, SendgridService, UtilityService]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        //{ path: 'user/update', method: RequestMethod.POST },
        { path: 'user/upload', method: RequestMethod.POST },
        { path: 'user/login', method: RequestMethod.POST },
        { path: 'user/forget-password', method: RequestMethod.POST },
        { path: 'user/create', method: RequestMethod.POST }
      )
      .forRoutes(UserController);

    consumer
      .apply(AdminAuthMiddleware)
      .exclude(
        { path: 'admin/login', method: RequestMethod.POST },
        { path: 'admin/forget-password', method: RequestMethod.POST },
        { path: 'admin/create', method: RequestMethod.POST }
      )
      .forRoutes(AdminController);
  }
}
