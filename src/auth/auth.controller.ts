import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { AuthCredentialDTO } from './dto/auth.credential.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from './user.model';
import { GetUser } from './get-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async signUp(
    @Body(ValidationPipe) authCredentialDTO: AuthCredentialDTO,
  ): Promise<void> {
    //console.log(authCredentialDTO);
    return await this.authService.signUp(authCredentialDTO);
  }

  @Post('/login')
  async signIn(
    @Body(ValidationPipe) authCredentialDTO: AuthCredentialDTO,
  ): Promise<{ accessToken: string }> {
    return await this.authService.signIn(authCredentialDTO);
  }

  @Post('/test')
  @UseGuards(AuthGuard())
  test(@GetUser() user: User) {
    console.log(user);
  }
}