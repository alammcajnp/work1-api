import {
  Injectable,
  HttpService,
  Controller,
  Get,
  Res,
  HttpStatus,
  Post,
  Body,
  Put,
  Query,
  NotFoundException,
  Delete,
  Param
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GameService } from './game.service';
import { CreateGameDTO } from './dto/create-game.dto';

@Injectable()
@Controller('game')
export class GameController {
  constructor(private gameService: GameService) {}

  // add a game
  @Post('/create')
  async addGame(@Res() res, @Body() createGameDTO: CreateGameDTO) {
    const game_data = await this.gameService.addGame(createGameDTO);
    if (!game_data) {
      throw new NotFoundException({
        title: 'Game not added',
        description: 'Internal Server Error'
      });
    }

    return res.status(HttpStatus.OK).json({
      title: 'Game has been created successfully'
    });
  }

  // Fetch a particular game using ID
  @Get('game/:gameID')
  async getGame(@Res() res, @Param('gameID') gameID) {
    const game = await this.gameService.getGame(gameID);
    if (!game) throw new NotFoundException('Game does not exist!');
    return res.status(HttpStatus.OK).json(game);
  }

  // Update a game's details
  @Put('/update')
  async updateGame(
    @Res() res,
    @Query('gameID') gameID,
    @Body() createGameDTO: CreateGameDTO
  ) {
    const game = await this.gameService.updateGame(gameID, createGameDTO);
    if (!game) throw new NotFoundException('Game does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'Game has been successfully updated',
      games: game
    });
  }

  // Retrieve game list
  @Get('games')
  async getAllGames(@Res() res) {
    const games = await this.gameService.getAllGame();
    return res.status(HttpStatus.OK).json(games);
  }

  // Retrieve game list
  @Get('games_with_levels')
  async getGamesWithLevels(@Res() res, @Query('game_type') game_type) {
    const games = await this.gameService.getGamesWithLevels(game_type);
    if (!games) {
      throw new NotFoundException({
        title: 'Issue occured',
        description: 'Internal Server Error'
      });
    }
    var type;
    if (game_type) {
      type = game_type;
    } else {
      type = 'Online, Offline';
    }
    return res.status(HttpStatus.OK).json({
      message: 'Games and levels listing',
      name: type,
      id: type.toLowerCase(),
      games
    });
  }

  // Delete a Game
  @Delete('/delete')
  async deleteGame(@Res() res, @Query('gameID') gameID) {
    const game = await this.gameService.deleteGame(gameID);
    if (!game) throw new NotFoundException('Game does not exist');
    return res.status(HttpStatus.OK).json({
      message: 'Game has been deleted',
      game
    });
  }
}
