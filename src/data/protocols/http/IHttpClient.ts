export enum HttpMethod {
  get = 'get',
  post = 'post',
  put = 'put',
  patch = 'patch',
  delete = 'delete',
}

export enum HttpStatusCode {
  ok = 200,
  badRequest = 400,
  unauthorized = 401,
  notFound = 404,
  serverError = 500,
}

export type HttpRequest = {
  url: string;
  method: HttpMethod;
  body?: any;
  headers?: any;
  params?: any;
};

export type HttpResponse<T = any> = {
  statusCode: HttpStatusCode;
  body: T;
};

export interface IHttpClient<R = any> {
  request: (data: HttpRequest) => Promise<HttpResponse<R>>;
}
