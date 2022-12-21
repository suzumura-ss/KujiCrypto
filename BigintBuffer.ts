export function BigintToBuffer(object: bigint, objectBytes: number): Buffer {
  const hex = object.toString(16);
  return Buffer.from(hex.padStart(objectBytes * 2, '0').slice(0, objectBytes * 2), 'hex');
}
