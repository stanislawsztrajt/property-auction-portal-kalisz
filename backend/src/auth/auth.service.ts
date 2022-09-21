import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users) private readonly userRepository: Repository<Users>,
    private jwtService: JwtService
  ) {}

  async validateUser ({ identifier, password}: LoginDto) {
    const findUserByIdentifierQuery = `SELECT * FROM public."users" WHERE email='${identifier}' OR username='${identifier}' LIMIT 1`
    const user: Users = await this.userRepository.query(findUserByIdentifierQuery)

    if (user[0] && user[0].password === password) {
      const { password, ...result } = user[0];
      return result;
    }
    return null;
  }

  async login ({ identifier, password}: LoginDto) {
    const user = await this.validateUser({ identifier, password})

    if (!user) {
      throw new HttpException('Useranme/Email and/or password is/are incorrect', HttpStatus.UNAUTHORIZED)
    }

    return {
      jwt: this.jwtService.sign(user),
      user
    }
  }
}
