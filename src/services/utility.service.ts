import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UtilityService {
  private readonly JWT_ACCESS_SECRET: string;
  private readonly JWT_REFRESH_SECRET: string;
  private readonly JWT_ACCESS_EXPIRY: string;
  private readonly JWT_REFRESH_EXPIRY: string;

  constructor(private readonly configService: ConfigService) {
    this.JWT_ACCESS_SECRET =
      this.configService.get<string>('JWT_ACCESS_SECRET');
    this.JWT_REFRESH_SECRET =
      this.configService.get<string>('JWT_REFRESH_SECRET');
    this.JWT_ACCESS_EXPIRY =
      this.configService.get<string>('JWT_ACCESS_EXPIRY');
    this.JWT_REFRESH_EXPIRY =
      this.configService.get<string>('JWT_REFRESH_EXPIRY');
  }

  getRandomStringV2(
    maxChars = 100,
    config: {
      smallLetters?: boolean;
      capitalLetters?: boolean;
      numbers?: boolean;
      symbols?: boolean;
    }
  ) {
    const numbers = '0123456789';
    const smallLetters = 'abcdefghijklmnopqrstuvwxyz';
    const capitalLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const symbols = '@!#$%^&)(_^';
    let chars = '';
    if (config.smallLetters) {
      chars += smallLetters;
    }
    if (config.capitalLetters) {
      chars += capitalLetters;
    }
    if (config.numbers) {
      chars += numbers;
    }
    if (config.symbols) {
      chars += symbols;
    }
    let string = '';
    if (chars === '') {
      return '';
    }
    for (let i = 0; i < maxChars; i++) {
      string += chars[Math.floor(Math.random() * chars.length)];
    }
    return string;
  }

  signJWT(payload, type = 'access') {
    const secret =
      type === 'access' ? this.JWT_ACCESS_SECRET : this.JWT_REFRESH_SECRET;
    const expiry =
      type === 'access' ? this.JWT_ACCESS_EXPIRY : this.JWT_REFRESH_EXPIRY;
    return jwt.sign(payload, secret, {
      expiresIn: expiry
    });
  }

  validateJWT(token, type = 'access') {
    const secret =
      type === 'access' ? this.JWT_ACCESS_SECRET : this.JWT_REFRESH_SECRET;
    return new Promise((resolve) => {
      jwt.verify(token, secret, (err, decoded) => {
        if (err) {
          const validationError = {
            title: 'Unauthorized access'
          };
          if (err.name === 'TokenExpiredError' && type === 'access') {
            validationError['isExpired'] = true;
          } else if (type === 'refresh') {
            validationError['title'] = 'Session Expired';
            validationError['description'] = 'Please login again';
          }
          throw new UnauthorizedException(validationError);
        }
        return resolve(decoded);
      });
    });
  }
}
