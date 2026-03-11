import { Body, Controller, Post, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { type Response } from 'express';
import { type IAuthService } from './interface.auth';
import * as JWT from 'jsonwebtoken';

@Controller('auth')
export class AuthController {
  private readonly authService: IAuthService;
  private readonly configService: ConfigService;

  constructor(authService: IAuthService, configService: ConfigService) {
    this.authService = authService;
    this.configService = configService;
  }

  @Post('/')
  async authenticate(
    @Body() credentials: { nic: string; password: string },
    @Res({ passthrough: true }) res: Response,
  ) {
    const { nic, password } = credentials;
    const jwt = await this.authService.authenticate(nic, password);
    res.cookie('token', jwt);
    return { message: 'OK' };
  }
}
