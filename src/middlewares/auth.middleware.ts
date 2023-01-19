import {
  Injectable,
  NestMiddleware,
  UnauthorizedException
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { UtilityService } from '../services/utility.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private utilityService: UtilityService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    if (req.method === 'OPTIONS') {
      return res.send();
    }
    const authorization = req.headers.authorization;

    if (!authorization) {
      throw new UnauthorizedException({
        title: 'Unauthorized access'
      });
    }
    let token;
    if (typeof authorization === 'string') {
      token = authorization.split(' ');
      token = token[1];
    }
    const tokenType = req.url === '/user/refresh-token' ? 'refresh' : 'access';

    req.user = await this.utilityService.validateJWT(token, tokenType);
    next();
  }
}
