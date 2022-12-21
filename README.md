crypto利用のお試し
====

1. `{ id: 99999999, location: 'Asia/Tokyo' }` ～ `{ id: 100000008, location: 'Asia/Tokyo' }` を格納した
`https://example.com/<暗号化文字列>` を生成して `tmp/crypto_*.png` にそのQRコードを出力します。
2. 99999999~100000008 とそのSHA256ハッシュをURLに埋め込んだURLを生成して `tmp/hmac_*.png` にそのQRコードを出力します。

```bash
$ yarn start
```
