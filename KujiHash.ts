import crypto from 'crypto';
import { BigintToBuffer } from './BigintBuffer';

export default class KujiHash {
  private readonly hmacCreator: () => crypto.Hmac;

  constructor(password: string, salt: string, algorithm = 'sha256') {
    const key = crypto.scryptSync(password, salt, 32);
    this.hmacCreator = () => crypto.createHmac(algorithm, key);
  }

  hmacBuffer(object: Buffer): string {
    const hmac = this.hmacCreator();
    const hash = hmac.update(object);
    return hash.digest('base64url');
  }

  hmacString(object: string): string {
    return this.hmacBuffer(Buffer.from(object));
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  hmacObject(object: any): string {
    return this.hmacString(JSON.stringify(object));
  }

  hmacBigInt(object: bigint, objectBytes: number): string {
    return this.hmacBuffer(BigintToBuffer(object, objectBytes));
  }
}
