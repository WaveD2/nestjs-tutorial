import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUser = createParamDecorator(
  (key: string, ctx: ExecutionContext) => {
    const request: Express.Request = ctx.switchToHttp().getRequest();

    const user = request.user;
    console.log('user verify', user, key);

    //
    return key ? user?.[key] : user;
  },
);
