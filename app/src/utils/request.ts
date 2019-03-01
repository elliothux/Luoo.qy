import * as request from "request";
import { Response } from "request";

type Maybe<T> = T | null;
type HeaderValue = string | number | boolean;

export type RequestHeaders = {
    [key: string]: HeaderValue
}

export interface RequestParams {
    url: string,
    method?: 'GET' | 'POST',
    form?: { [key: string]: HeaderValue }
    headers?: RequestHeaders
}

const proxiedRequest = request.defaults({ proxy: "http://127.0.0.1:8899" });
// const proxiedRequest = request;

function getResponseError(
  url: string,
  error: Maybe<Error>,
  response: Maybe<Response>,
  body: Maybe<string>
): Maybe<Error> {
  if (error) {
    return error;
  }
  if (!body || !response) {
    return new Error(`Empty response with: ${url}`);
  }
  if (response.statusCode !== 200) {
    return new Error(`Response status code: ${response.statusCode}`);
  }
  return null;
}

function getJSON<T>(params: RequestParams): Promise<T> {
  return new Promise((resolve, reject) => {
      proxiedRequest.get(
      params,
      (error: Maybe<Error>, response: Maybe<Response>, body: Maybe<string>) => {
        const e = getResponseError(params.url, error, response, body);
        if (e) {
          return reject(e);
        }
        try {
          return resolve(JSON.parse(body as string) as T);
        } catch (e) {
          return reject(e);
        }
      }
    );
  });
}

function getHeader(params: RequestParams, key: string): Promise<Maybe<string>> {
  return new Promise((resolve, reject) => {
      proxiedRequest.get(
        params,
        (error: Maybe<Error>, response: Maybe<Response>, body: Maybe<string>) => {
          const e = getResponseError(params.url, error, response, body);
          if (e) {
            return reject(e);
          }
          const header = (response as Response).headers[key];
          if (header && header[0]) {
              return resolve(header[0])
          }
          return resolve(null);
        }
    );
  });
}

export { getJSON, getHeader };
