import disassembler from '../disassembler';

describe('disassembler', () => {
  it('should return an array the half the lenght as the Uint8Array passed', () => {
    const length = 4;
    const rom = new Uint8Array(length);

    const instructions = disassembler(rom);

    expect(Array.isArray(instructions)).toBe(true);
    expect(instructions.length).toBe(length / 2);
  });
});
