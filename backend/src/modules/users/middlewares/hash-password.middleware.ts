import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { Users } from 'modules/users/entities/user.entity';
import { hashPassword } from 'utils/helpers/bcrypt';
import { Irequest } from 'utils/types/api';

@Injectable()
export class HashPasswordMiddleware implements NestMiddleware {
  async use(req: Irequest<Users>, res: Response, next: NextFunction) {
    req.body.password = await hashPassword(req.body.password)
    next();
  }
}
