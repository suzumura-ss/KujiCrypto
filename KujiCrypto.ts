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

  get cryptoIv() : string {
    return this.iv.toString('hex');
  }

  encryptBuffer(object: Buffer): string {
    const ciper = this.ciperCreator();
    let crypted = ciper.update(object);
    crypted = Buffer.concat([crypted, ciper.final()]);
    return crypted.toString('base64url');
  }

  encryptString(object: string): string {
    return this.encryptBuffer(Buffer.from(object));
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  encryptObject(object: any): string {
    return this.encryptString(JSON.stringify(object));
  }

  decryptBuffer(cryptedText: string): Buffer {
    const decipher = this.deciperCreator();
    const decrypted = decipher.update(Buffer.from(cryptedText, 'base64url'));
    return Buffer.concat([decrypted, decipher.final()]);
  }

  decryptString(cryptedText: string): string {
    return this.decryptBuffer(cryptedText).toString('utf-8');
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  decryptObject(cryptedText: string): any {
    return JSON.parse(this.decryptString(cryptedText));
  }
}
