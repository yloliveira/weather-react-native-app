import axios, { AxiosResponse } from 'axios';
import {
  HttpRequest,
  HttpResponse,
  IHttpClient,
} from '../../data/protocols/http/IHttpClient';

export class AxiosHttpClient implements IHttpClient {
  async request(data: HttpRequest): Promise<HttpResponse> {
    let axiosResponse: AxiosResponse;
    try {
      axiosResponse = await axios.request({
        url: data.url,
        method: data.method,
        headers: data.headers,
        params: data.params,
        data: data.body,
      });
    } catch ({ response }) {
      axiosResponse = response as AxiosResponse;
    }
    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data,
    };
  }
}
