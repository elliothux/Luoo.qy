import { getHeader } from "../utils";

function getSession(): Promise<Maybe<string>> {
  return getHeader("http://www.luoo.net/login/dialog", "LUOOSESS");
}

getSession()
  .then(i => {
    console.log(111, i);
    process.exit();
  })
  .catch(e => {
      console.log(222);
      console.error(e);
    process.exit();
  });
