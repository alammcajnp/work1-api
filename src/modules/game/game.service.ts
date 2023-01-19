import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Game } from './interfaces/game.interface';
import { CreateGameDTO } from './dto/create-game.dto';
import { UtilityService } from '../../services/utility.service';

@Injectable()
export class GameService {
  constructor(@InjectModel('Game') private readonly gameModel: Model<Game>) {}

  // fetch all Game
  async getAllGame(): Promise<Game[]> {
    const games = await this.gameModel.find().exec();
    return games;
  }

  async getGamesWithLevels(game_type): Promise<any> {
    let condition = {
      $match: {}
    };
    if (game_type) {
      condition = {
        $match: {
          game_type: game_type
        }
      };
    }
    const result = await this.gameModel.aggregate([
      condition,
      {
        $lookup: {
          from: 'levels',
          localField: '_id',
          foreignField: 'game_id',
          as: 'levels'
        }
      },
      {
        $project: {
          _id: 0,
          id: '$_id',
          game_type: 1,
          slug: 1,
          sshInfo: 1,
          description: 1,
          levels: {
            _id: 1,
            id: '$levels._id',
            slug: 1,
            text: 1,
            description: 1
          }
        }
      },
      { $sort: { _id: -1 } }
    ]);

    return result.map((game) => {
      return {
        ...game,
        levels: game.levels.map((level) => {
          return {
            ...level,
            id: level._id,
            _id: undefined
          };
        })
      };
    });
  }

  // Get a single game
  async getGame(gameID): Promise<Game> {
    const game = await this.gameModel.findById(gameID).exec();
    return game;
  }

  // post a single game
  async addGame(createGameDTO: CreateGameDTO): Promise<Game> {
    let obj = new mongoose.Types.ObjectId();
    const newGame = new this.gameModel(createGameDTO);
    return newGame.save();
  }

  // Edit game details
  async updateGame(gameID, createGameDTO: CreateGameDTO): Promise<Game> {
    const updatedGame = await this.gameModel.findByIdAndUpdate(
      gameID,
      createGameDTO,
      { new: true }
    );
    return updatedGame;
  }

  // Delete a game
  async deleteGame(gameID): Promise<any> {
    const deletedGame = await this.gameModel.findByIdAndRemove(gameID);
    return deletedGame;
  }
}
