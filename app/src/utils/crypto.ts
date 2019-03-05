import {
  createCipher,
  createDecipher,
  Cipher,
  Decipher,
  Utf8AsciiBinaryEncoding
} from "crypto";

const ALGORITHM = 'aes-256-ctr';
const SALT = "luoo.qy";

function aseEncode(text: string): string {
  const cipher = createCipher(ALGORITHM, SALT);
  let crypted = cipher.update(text,'utf8','hex');
  crypted += cipher.final('hex');
  return crypted;
}

function aseDecode(text: string): string {
  const decipher = createDecipher(ALGORITHM, SALT);
  let dec = decipher.update(text,'hex','utf8');
  dec += decipher.final('utf8');
  return dec;
}

export { aseEncode, aseDecode };
