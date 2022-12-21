import {BigintToBuffer} from '../BigintBuffer';

describe('BigintBuffer', () => {
  describe('BigintToBuffer', () => {
    it('0x123456789an/5byte長を指定すると[0x12,0x34,0x56,0x78,0x9a]が得られること', () => {
      expect(BigintToBuffer(0x123456789an, 5)).toEqual(Buffer.from([0x12,0x34,0x56,0x78,0x9a]));
    });

    it('1n/4byte長を指定すると[0,0,0,1]が得られること', () => {
      expect(BigintToBuffer(1n, 4)).toEqual(Buffer.from([0, 0, 0, 1]));
    });
  });
});
