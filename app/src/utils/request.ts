import { get, Response } from "request";

type Maybe<T> = T | null;

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

function getJSON<T>(url: string): Promise<T> {
  return new Promise((resolve, reject) => {
    get(
      url,
      (error: Maybe<Error>, response: Maybe<Response>, body: Maybe<string>) => {
        const e = getResponseError(url, error, response, body);
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

function getHeader(url: string, key: string): Promise<Maybe<string>> {
  return new Promise((resolve, reject) => {
    get(
        url,
        (error: Maybe<Error>, response: Maybe<Response>, body: Maybe<string>) => {
          const e = getResponseError(url, error, response, body);
          if (e) {
            return reject(e);
          }
          const header = (response as Response).headers[key];
          return resolve(header as string || null);
        }
    );
  });
}

export { getJSON, getHeader };
