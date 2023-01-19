import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Level } from './interfaces/level.interface';
import { CreateLevelDTO } from './dto/create-level.dto';
import { UtilityService } from '../../services/utility.service';

@Injectable()
export class LevelService {
  constructor(
    @InjectModel('Level') private readonly levelModel: Model<Level>
  ) {}

  // fetch all Level
  async getAllLevels(): Promise<Level[]> {
    const games = await this.levelModel
      .find()
      .populate({ path: 'game_id' })
      .exec();
    return games;
  }

  // Get a Level by game id
  async levelByGameId(levelID): Promise<Level[]> {
    let levelsdata = await this.levelModel.find({ game_id: levelID }).exec();
    return levelsdata;
  }

  // Get a single Level
  async getLevel(levelID): Promise<Level> {
    const level = await this.levelModel.findById(levelID).exec();
    return level;
  }

  // post a single Level
  async addLevel(createLevelDTO: CreateLevelDTO): Promise<Level> {
    const newLevel = new this.levelModel(createLevelDTO);
    return newLevel.save();
  }

  // Edit Level details
  async updateLevel(levelID, createLevelDTO: CreateLevelDTO): Promise<Level> {
    const updatedGame = await this.levelModel.findByIdAndUpdate(
      levelID,
      createLevelDTO,
      { new: true }
    );
    return updatedGame;
  }

  // Delete a Level
  async deleteLevel(levelID): Promise<any> {
    const deletedLevel = await this.levelModel.findByIdAndRemove(levelID);
    return deletedLevel;
  }
}
