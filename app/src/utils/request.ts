import request = require("request");
import { JSDOM } from "jsdom";
import { Response, CookieJar, Cookie } from "request";

type Maybe<T> = T | null;
type HeaderValue = string | number | boolean;

export type RequestHeaders = {
  [key: string]: HeaderValue;
};

export type Cookies = RequestHeaders;

export type Forms = { [key: string]: HeaderValue };
interface IRequestParams {
  url: string;
  method?: "GET" | "POST";
  form?: Forms;
  headers?: RequestHeaders;
}
export interface RequestParams extends IRequestParams {
  cookies?: Cookies;
}

interface RequestCookieParams extends IRequestParams {
  jar?: CookieJar;
}

// const proxiedRequest = request.defaults({ proxy: "http://127.0.0.1:8899" });
const proxiedRequest = request;

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

function handleCookie(params: RequestParams): RequestCookieParams {
  const { cookies } = params;
  if (!cookies) {
    return params as RequestCookieParams;
  }

  const jar = request.jar();
  Object.keys(cookies).forEach(key => {
    const cookie = request.cookie(`${key}=${cookies[key]}`) as Cookie;
    jar.setCookie(cookie, params.url);
  });

  delete params.cookies;
  return {
    ...params,
    jar
  } as RequestCookieParams;
}

function getJSON<T>(params: RequestParams): Promise<T> {
  return new Promise((resolve, reject) => {
    proxiedRequest(
      handleCookie(params),
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

function getHeader(
  params: RequestParams,
  key: string
): Promise<Maybe<string[]>> {
  return new Promise((resolve, reject) => {
    proxiedRequest(
      handleCookie(params),
      (error: Maybe<Error>, response: Maybe<Response>, body: Maybe<string>) => {
        const e = getResponseError(params.url, error, response, body);
        if (e) {
          return reject(e);
        }
        const header = (response as Response).headers[key];
        if (header) {
          return resolve(Array.isArray(header) ? header : [header]);
        }
        return resolve(null);
      }
    );
  });
}

function getHTMLDOM(params: RequestParams): Promise<Document> {
  return new Promise((resolve, reject) => {
    proxiedRequest(
      handleCookie(params),
      (error: Maybe<Error>, response: Maybe<Response>, body: Maybe<string>) => {
        const e = getResponseError(params.url, error, response, body);
        if (e || !body) {
          return reject(
            e || new Error(`Empty response body with: ${params.url}`)
          );
        }
        try {
          const {
            window: { document }
          } = new JSDOM(body);
          return resolve(document);
        } catch (e) {
          return reject(e);
        }
      }
    );
  });
}

function postForm<T>(data: Forms, params: RequestParams): Promise<T> {
    params.method = 'POST';
    params.form = data;
    return new Promise((resolve, reject) => {
        proxiedRequest(
            handleCookie(params),
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

export { getJSON, getHeader, getHTMLDOM, postForm };
