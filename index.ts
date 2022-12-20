import KujiCrypto from "./KujiCrypto";

const KujiGen = new KujiCrypto('p@ssWorD', 'ThE-sAlT', '9510ed5c321945212a57adc857bb42d8');

for (let did = 0; did < 10; ++did) {
  const encryptedId = KujiGen.encrypt({id: 9999_9999 + did, location: 'Asia/Tokyo'});
  const url = `https://example.com/${encryptedId}`;
  const decrypted = KujiGen.decrypt(encryptedId);
  console.log(url, decrypted);
}
