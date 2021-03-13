interface headers {
  'content-type': string;
}

export interface ApiOptions {
  method: string;
  credentials?: string;
  mode?: string;
  headers?: headers;
  body: string;
}
