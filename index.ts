import qrcode from 'qrcode';
import KujiCrypto from "./KujiCrypto";
import KujiHash from './KujiHash';

const baseUrl = 'https://example.com/';

function generateWithCrypto() {
  const KujiGen = new KujiCrypto('p@ssWorD', 'ThE-sAlT', '9510ed5c321945212a57adc857bb42d8');
  for (let did = 0; did < 10; ++did) {
    const encryptedId = KujiGen.encryptObject({id: 9999_9999 + did, location: 'Asia/Tokyo'});
    const url = `${baseUrl}${encryptedId}`;
    const decrypted = KujiGen.decryptObject(encryptedId);
    console.log(url, decrypted);
    qrcode.toFile(`tmp/crypto_${did}.png`, url);
  }
}

function generateWithHash() {
  const HashGen = new KujiHash('ssWorD', 'ThE-sAlT');
  for (let did = 0n; did < 10n; ++did) {
    const id = `${9999_9999n + did}`;
    const hash = HashGen.hmacString(id);
    const url = `${baseUrl}${id}/${hash}`;
    console.log(url);
    qrcode.toFile(`tmp/hmac_${did}.png`, url);
  }
}

generateWithCrypto();
generateWithHash();
