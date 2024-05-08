enum StatusCode {
  FORBIDDEN = 403,
  CONFLICT = 409,
  AUTHORIZATIONERROR = 401,
}

enum ReasonStatusCode {
  FORBIDDEN = 'Bad request',
  CONFLICT = 'Config tError ',
  AUTHORIZATIONERROR = 'Not authenticated',
}

export class ErrorResponse extends Error {
  status: StatusCode;

  constructor(message: string, status: StatusCode) {
    super(message);
    this.status = status;
  }
}

export class ConfigRequestError extends ErrorResponse {
  constructor(
    message: string = ReasonStatusCode.CONFLICT,
    status: StatusCode = StatusCode.CONFLICT,
  ) {
    super(message, status);
  }
}

export class BadRequestError extends ErrorResponse {
  constructor(
    message: string = ReasonStatusCode.FORBIDDEN,
    status: StatusCode = StatusCode.FORBIDDEN,
  ) {
    super(message, status);
  }
}

export class AuthFailError extends ErrorResponse {
  constructor(
    message: string = ReasonStatusCode.AUTHORIZATIONERROR,
    status: StatusCode = StatusCode.AUTHORIZATIONERROR,
  ) {
    super(message, status);
  }
}
