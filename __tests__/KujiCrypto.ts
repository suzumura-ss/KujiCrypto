import { describe, expect, it } from '@jest/globals';
import base64url from 'base64url';
import KujiCrypto from "../KujiCrypto";

describe('KujiCrypto', () => {
  describe('Constructor', () => {
    it('passwordとsaltで変換器を生成できる', () => {
      expect(new KujiCrypto('password', 'SALT')).toBeInstanceOf(KujiCrypto);
    });

    it('passwordとsaltとivで変換器を生成できる', () => {
      expect(new KujiCrypto('password', 'SALT', '9510ed5c321945212a57adc857bb42d8')).toBeInstanceOf(KujiCrypto);
    });

    it('passwordとsaltとivとアルゴリズムで変換器を生成できる', () => {
      expect(new KujiCrypto('password', 'SALT', '9510ed5c321945212a57adc857bb42d8', 'aes-256-cbc')).toBeInstanceOf(KujiCrypto);
    });
  });

  describe('#encryptObject', () => {
    it('objectを渡すと暗号化できること', () => {
      const kuji = new KujiCrypto('password', 'SALT');
      const encryptedString = kuji.encryptObject({id: 0});
      expect(base64url.toBuffer(encryptedString)).toBeInstanceOf(Buffer);
    });
  });

  describe('#decryptObject', () => {
    it('encrypt結果を渡すと復号できること', () => {
      const kuji = new KujiCrypto('password', 'SALT');
      const encryptedString = kuji.encryptObject({id: 0});
      expect(kuji.decryptObject(encryptedString)).toEqual({id: 0});
    });
  });

  describe('#cryptoIv', () => {
    it('自動生成されたiv(Hex)を取得できること', () => {
      const kuji = new KujiCrypto('password', 'SALT');
      expect(kuji.cryptoIv).toMatch(/^[0-9a-f]{32}$/);
    });

    it('constructorで指定したivを取得できること', () => {
      const iv = '9510ed5c321945212a57adc857bb42d8';
      const kuji = new KujiCrypto('password', 'SALT', iv);
      expect(kuji.cryptoIv).toBe(iv);
    });

    it('取得したivで復号できること', () => {
      const kuji1 = new KujiCrypto('password', 'SALT');
      const iv = kuji1.cryptoIv;
      const encryptedString = kuji1.encryptObject({id: 0});
      const kuji2 = new KujiCrypto('password', 'SALT', iv);
      expect(kuji2.decryptObject(encryptedString)).toEqual({id: 0});
    });
  });
});
