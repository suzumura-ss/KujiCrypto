import qrcode from 'qrcode';
import KujiCrypto from "./KujiCrypto";

const baseUrl = 'https://example.com/';
const KujiGen = new KujiCrypto('p@ssWorD', 'ThE-sAlT', '9510ed5c321945212a57adc857bb42d8');

for (let did = 0; did < 10; ++did) {
  const encryptedId = KujiGen.encryptObject({id: 9999_9999 + did, location: 'Asia/Tokyo'});
  const url = `${baseUrl}${encryptedId}`;
  const decrypted = KujiGen.decryptObject(encryptedId);
  console.log(url, decrypted);
  qrcode.toFile(`tmp/${did}.png`, url);
}
