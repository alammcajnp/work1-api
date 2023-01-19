import { Module } from '@nestjs/common';
import { LevelController } from './level.controller';
import { LevelService } from './level.service';
import { MongooseModule } from '@nestjs/mongoose';
import { LevelSchema } from './schemas/level.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Level', schema: LevelSchema }])
  ],
  controllers: [LevelController],
  providers: [LevelService]
})
export class LevelModule {}
