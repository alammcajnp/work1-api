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
import { LevelService } from './level.service';
import { CreateLevelDTO } from './dto/create-level.dto';

@Injectable()
@Controller('level')
export class LevelController {
  constructor(private levelService: LevelService) {}

  @Post('/create')
  async addLevel(@Res() res, @Body() createLevelDTO: CreateLevelDTO) {
    const level_data = await this.levelService.addLevel(createLevelDTO);
    if (!level_data) {
      throw new NotFoundException({
        title: 'Something went wrong'
      });
    }

    return res.status(HttpStatus.OK).json({
      title: 'Level added successfully'
    });
  }

  //get level by game id
  @Get('levelByGameId/:gameID')
  async levelByGameId(@Res() res, @Param('gameID') gameID) {
    const menulevel = await this.levelService.levelByGameId(gameID);
    if (!menulevel) throw new NotFoundException('Level does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'All Levels by game id',
      menulevel
    });
  }

  // Fetch a particular Level using ID
  @Get('level/:levelID')
  async getLevel(@Res() res, @Param('levelID') levelID) {
    const level = await this.levelService.getLevel(levelID);
    if (!level) throw new NotFoundException('getLevel does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'Level list',
      level
    });
  }

  // Update a level's details
  @Put('/update')
  async updateGame(
    @Res() res,
    @Query('levelID') levelID,
    @Body() createLevelDTO: CreateLevelDTO
  ) {
    const level = await this.levelService.updateLevel(levelID, createLevelDTO);
    if (!level) throw new NotFoundException('Level does not exist!');
    return res.status(HttpStatus.OK).json({
      title: 'Level updated successfully',
      level
    });
  }

  // Retrieve level list
  @Get('levels')
  async getAllLevels(@Res() res) {
    const levels = await this.levelService.getAllLevels();
    return res.status(HttpStatus.OK).json({
      message: 'All Level',
      levels
    });
  }

  // Delete a level
  @Delete('/delete')
  async deleteLevel(@Res() res, @Query('levelID') levelID) {
    const level = await this.levelService.deleteLevel(levelID);
    if (!level) throw new NotFoundException('Level does not exist');
    return res.status(HttpStatus.OK).json({
      title: 'Level deleted',
      level
    });
  }
}
