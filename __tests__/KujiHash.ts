import { describe, expect, it } from '@jest/globals';
import base64url from 'base64url';
import KujiHash from "../KujiHash";

describe('KujiHash', () => {
  describe('Constructor', () => {
    it('passwordとsaltで変換器を生成できる', () => {
      expect(new KujiHash('password', 'SALT')).toBeInstanceOf(KujiHash);
    });

    it('passwordとsaltとivとアルゴリズムで変換器を生成できる', () => {
      expect(new KujiHash('password', 'SALT', 'sha256')).toBeInstanceOf(KujiHash);
    });
  });

  describe('hmac', () => {
    it('objectを渡すとHAMCハッシュを取得できること', () => {
      const kuji = new KujiHash('password', 'SALT');
      const hash = kuji.hmacObject({id: 0});
      expect(base64url.toBuffer(hash).toString('hex')).toMatch(/^[0-9a-f]{64}$/);
    });
  });
});
