import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { User } from './entities/user.entity';

// user만 추출
export const GetUser = createParamDecorator(
  (data, ctx: ExecutionContext): User => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
