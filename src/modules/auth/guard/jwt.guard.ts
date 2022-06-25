import { AuthGuard } from '@nestjs/passport';

/**
 * JWTGuard implementation for checking Authorized User via header's Bearer Token
 */
export class JwtGuard extends AuthGuard('jwt-auth') {
  /**
   * Call's the AuthGuard's super constructor with certain config if required
   */
  constructor() {
    super();
  }
}
