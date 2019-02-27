import {
  Cipher,
  Decipher,
  createCipher,
  createDecipher,
  Utf8AsciiBinaryEncoding
} from "crypto";

const SALT = "luoo.qy";

function aseEncode(data: string): string {
  const cipher: Cipher = createCipher("aes192", SALT);
  let crypted = cipher.update(Buffer.from(data), "utf-8", "hex");
  crypted += cipher.final("hex");
  return crypted;
}

function aseDecode(data: string): string {
  const decipher: Decipher = createDecipher("aes192", SALT);
  let decrypted = decipher.update(
    data,
    "hex",
    "utf-8" as Utf8AsciiBinaryEncoding
  );
  decrypted += decipher.final("utf-8");
  return decrypted;
}

export {
    aseEncode,
    aseDecode
}
