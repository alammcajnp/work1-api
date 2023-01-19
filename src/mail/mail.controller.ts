import { Controller, Res, Post, Query, Body } from '@nestjs/common';
import { SendgridService } from 'src/sendgrid/sendgrid.service';
import { MailDTO } from './dto/mail.dto';

@Controller('mail')
export class MailController {
  constructor(private readonly sendgridService: SendgridService) {}

  // Here we use query parameter to get the email that we want to send
  @Post('send-email')
  //async sendEmail(@Query('email') email) {
  async sendEmail(@Res() res, @Body() mailDTO: MailDTO) {
    const mail = {
      to: mailDTO.to,
      subject: mailDTO.subject,
      from: mailDTO.from,
      text: mailDTO.text,
      html: mailDTO.html
    };
    return await this.sendgridService.send(mail);
  }
}
