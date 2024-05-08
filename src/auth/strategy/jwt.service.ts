import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtServiceGlobal {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async generateTokens(
    userId: number | string,
    email: string,
  ): Promise<{
    access: {
      accessToken: string;
      expire: string;
    };
    refresh: {
      refreshToken: string;
      expire: string;
    };
  }> {
    const payload = {
      sub: userId,
      email,
    };

    const accessTokenExpire = new Date();
    accessTokenExpire.setMinutes(accessTokenExpire.getMinutes() + 10);
    const refreshTokenExpire = new Date();
    refreshTokenExpire.setDate(refreshTokenExpire.getDate() + 2);

    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: '10m',
      secret: this.configService.get('JWT_SECRET'),
    });
    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: '2 days',
      secret: this.configService.get('JWT_SECRET'),
    });

    const access = {
      accessToken,
      expire: accessTokenExpire.toISOString(),
    };
    const refresh = {
      refreshToken,
      expire: refreshTokenExpire.toISOString(),
    };

    return {
      access,
      refresh,
    };
  }
}
