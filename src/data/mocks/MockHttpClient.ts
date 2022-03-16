import {
  IHttpClient,
  HttpMethod,
  HttpRequest,
  HttpResponse,
  HttpStatusCode,
} from '../protocols/http/IHttpClient';

export class MockHttpClient<R = any> implements IHttpClient<R> {
  url?: string;
  method?: HttpMethod;
  body?: any;
  params?: any;
  headers?: any;
  response: HttpResponse<R> = {
    statusCode: HttpStatusCode.ok,
  };

  async request(data: HttpRequest): Promise<HttpResponse<R>> {
    this.url = data.url;
    this.method = data.method;
    this.body = data.body;
    this.params = data.params;
    this.headers = data.headers;

    return this.response;
  }
}
