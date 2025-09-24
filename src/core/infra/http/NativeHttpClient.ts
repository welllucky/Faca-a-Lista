import {
  IHttpClient,
  IHttpParams,
  IHttpResponse,
  ResponseDataType,
} from "@/core/contracts";

export class NativeHttpClient implements IHttpClient {
  private async getResponseBody(
    response: Response,
    ResponseDataType: ResponseDataType = "json",
  ) {
    try {
      switch (ResponseDataType) {
        case "json":
          return await response.json();
        case "blob":
          return await response.blob();
        case "arraybuffer":
          return await response.arrayBuffer();
        case "text":
          return await response.text();
      }
    } catch {
      return null;
    }
  }

  private formatReturn<T = any>(response: Response, data: T) {
    return {
      data,
      ...response,
    };
  }

  async get<T = any>(params: IHttpParams): Promise<IHttpResponse<T>> {
    const response = await fetch(params.url, {
      method: "GET",
      headers: params.headers,
    });
    const data = await this.getResponseBody(response);
    return this.formatReturn(response, data);
  }

  async post<T = any>(params: IHttpParams): Promise<IHttpResponse<T>> {
    const response = await fetch(params.url, {
      method: "POST",
      headers: params.headers,
      body: params.body,
    });
    const data = await this.getResponseBody(response);
    return this.formatReturn(response, data);
  }

  async put<T = any>(params: IHttpParams): Promise<IHttpResponse<T>> {
    const response = await fetch(params.url, {
      method: "PUT",
      headers: params.headers,
      body: params.body,
    });
    const data = await this.getResponseBody(response);
    return this.formatReturn(response, data);
  }

  async delete<T = any>(params: IHttpParams): Promise<IHttpResponse<T>> {
    const response = await fetch(params.url, {
      method: "DELETE",
      headers: params.headers,
    });
    const data = await this.getResponseBody(response);
    return this.formatReturn(response, data);
  }
}
