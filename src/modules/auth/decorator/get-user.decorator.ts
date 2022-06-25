import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * Gets user data from request.user or particular user field
 */
export const GetUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    if (data) {
      return request.user[data];
    }
    return request.user;
  },
);
