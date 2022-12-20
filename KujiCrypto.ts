import crypto from 'crypto';

export default class KujiCrypto {
  private readonly ciperCreator: () => crypto.Cipher;
  private readonly deciperCreator: () => crypto.Decipher;
  private readonly iv: Buffer;

  constructor(password: string, salt: string, iv: string = crypto.randomBytes(16).toString('hex'), algorithm = 'aes-256-cbc') {
    const key = crypto.scryptSync(password, salt, 32);
    this.iv = Buffer.from(iv, 'hex');
    this.ciperCreator = () => crypto.createCipheriv(algorithm, key, this.iv);
    this.deciperCreator = () => crypto.createDecipheriv(algorithm, key, this.iv);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  encrypt(object: any): string {
    const ciper = this.ciperCreator();
    let crypted = ciper.update(Buffer.from(JSON.stringify(object)));
    crypted = Buffer.concat([crypted, ciper.final()]);
    return crypted.toString('base64url');
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  decrypt(cryptedText: string): any {
    const decipher = this.deciperCreator();
    let decrypted = decipher.update(Buffer.from(cryptedText, 'base64url'));
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return JSON.parse(decrypted.toString('utf-8'));
  }

  cryptoIv() {
    return this.iv.toString('hex');
  }
}
