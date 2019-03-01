import { UserInfo } from "../types";

function login(mail: string, password: string): Promise<Maybe<UserInfo>> {
  return Promise.resolve(null);
}
