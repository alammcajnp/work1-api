import { Injectable } from '@nestjs/common';
@Injectable()
export class AppService {
  api_docs(): string {
    return 'Hello Overthewire Wargames!!';
  }
}
