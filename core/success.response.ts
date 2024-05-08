enum StatusCode {
  OK = 200,
  CREATED = 201,
}

enum ReasonStatusCode {
  CREATED = 'Created',
  OK = 'Success',
}

export class SuccessResponse {
  message: string;
  status: StatusCode;
  responseStatusCode: ReasonStatusCode;

  constructor(
    message: string,
    status: StatusCode = StatusCode.OK,
    responseStatusCode: ReasonStatusCode = ReasonStatusCode.OK,
  ) {
    this.message = !message ? responseStatusCode : message;
    this.status = status;
    this.responseStatusCode = responseStatusCode;
  }

  send(res: any, headers: any = {}): any {
    return res.status(this.status).json(this);
  }
}

export class OK extends SuccessResponse {
  data: {};
  constructor({ message, data = {} }: { message: string; data: {} }) {
    super(message, StatusCode.OK, ReasonStatusCode.OK);
    this.data = data;
  }
}

export class CREATED extends SuccessResponse {
  data: {};
  options: {};

  constructor({
    message,
    status = StatusCode.CREATED,
    responseStatusCode = ReasonStatusCode.CREATED,
    data = {},
    options = {},
  }: {
    message: string;
    status?: StatusCode;
    responseStatusCode?: ReasonStatusCode;
    data: any;
    options?: any;
  }) {
    super(message, status, responseStatusCode);
    this.data = data;
    this.options = options;
  }
}
