export type ResponseDataType = "json" | "blob" | "arraybuffer" | "text";

export interface IHttpParams {
  url: string;
  body?: any;
  headers?: Record<string, any>;
  signal?: AbortSignal;
  ResponseDataType?: ResponseDataType;
}

export interface IHttpResponse<T = any> {
  data: T;
  status: number;
  headers: Record<string, any>;
}

export interface IHttpClient {
  get<T = any>(params: IHttpParams): Promise<IHttpResponse<T>>;
  post<T = any>(params: IHttpParams): Promise<IHttpResponse<T>>;
  put<T = any>(params: IHttpParams): Promise<IHttpResponse<T>>;
  delete<T = any>(params: IHttpParams): Promise<IHttpResponse<T>>;
}
