import disassembler from '../disassembler';

describe('disassembler', () => {
  it('should return an array half the lenght as the Uint8Array passed', () => {
    const length = 4;
    const rom = new Uint8Array(length);
    const instructions = disassembler(rom);

    expect(Array.isArray(instructions)).toBe(true);
    expect(instructions.length).toBe(length / 2);
  });

  describe('nibble 0x00', () => {
    it('should return the right instruction for 0x00e0', () => {
      const rom = new Uint8Array([0x00, 0xe0]);
      const [instruction] = disassembler(rom);

      expect(instruction).toEqual({ loc: '0x200', opCode: '00e0', nemonic: 'CLS', description: 'Clear screen' });
    });
    it('should return the right instruction for 0x00ee', () => {
      const rom = new Uint8Array([0x00, 0xee]);
      const [instruction] = disassembler(rom);

      expect(instruction).toEqual({
        loc: '0x200',
        opCode: '00ee',
        nemonic: 'RET',
        description: 'Return from subrutine',
      });
    });
  });

  describe('nibble 0x01', () => {
    it('should return the right instruction for 0x1nnn', () => {
      const rom = new Uint8Array([0x1a, 0x23]);
      const [instruction] = disassembler(rom);

      expect(instruction).toEqual({
        loc: '0x200',
        opCode: '1a23',
        nemonic: 'JP addr',
        description: 'Jump to address 0xa23',
      });
    });
  });

  describe('nibble 0x02', () => {
    it('should return the right instruction for 0x2nnn', () => {
      const rom = new Uint8Array([0x2a, 0x23]);
      const [instruction] = disassembler(rom);

      expect(instruction).toEqual({
        loc: '0x200',
        opCode: '2a23',
        nemonic: 'CALL addr',
        description: 'Call subrutine at address 0xa23',
      });
    });
  });

  describe('nibble 0x03', () => {
    it('should return the right instruction for 0x3xkk', () => {
      const rom = new Uint8Array([0x3a, 0x23]);
      const [instruction] = disassembler(rom);

      expect(instruction).toEqual({
        loc: '0x200',
        opCode: '3a23',
        nemonic: 'SE Vx, byte',
        description: 'Skip next instruction if register Va == 23',
      });
    });
  });

  describe('nibble 0x04', () => {
    it('should return the right instruction for 0x4xkk', () => {
      const rom = new Uint8Array([0x4a, 0x23]);
      const [instruction] = disassembler(rom);

      expect(instruction).toEqual({
        loc: '0x200',
        opCode: '4a23',
        nemonic: 'SNE Vx, byte',
        description: 'Skip next instruction if register Va != 23',
      });
    });
  });

  describe('nibble 0x05', () => {
    it('should return the right instruction for 0x5xy0', () => {
      const rom = new Uint8Array([0x5a, 0x23]);
      const [instruction] = disassembler(rom);

      expect(instruction).toEqual({
        loc: '0x200',
        opCode: '5a23',
        nemonic: 'SE Vx, Vy',
        description: 'Skip next instruction if register Va == V2',
      });
    });
  });

  describe('nibble 0x06', () => {
    it('should return the right instruction for 0x6xkk', () => {
      const rom = new Uint8Array([0x6a, 0x23]);
      const [instruction] = disassembler(rom);

      expect(instruction).toEqual({
        loc: '0x200',
        opCode: '6a23',
        nemonic: 'LD Vx, byte',
        description: 'Set Va = 23',
      });
    });
  });

  describe('nibble 0x07', () => {
    it('should return the right instruction for 0x7xkk', () => {
      const rom = new Uint8Array([0x7a, 0x23]);
      const [instruction] = disassembler(rom);

      expect(instruction).toEqual({
        loc: '0x200',
        opCode: '7a23',
        nemonic: 'ADD Vx, byte',
        description: 'Add the value 23 to the register Va',
      });
    });
  });

  describe('nibble 0x08', () => {
    it('should return the right instruction for 0x8xy0', () => {
      const rom = new Uint8Array([0x8a, 0x20]);
      const [instruction] = disassembler(rom);

      expect(instruction).toEqual({
        loc: '0x200',
        opCode: '8a20',
        nemonic: 'LD Vx, Vy',
        description: 'Set Va = V2',
      });
    });

    it('should return the right instruction for 0x8xy1', () => {
      const rom = new Uint8Array([0x8a, 0x21]);
      const [instruction] = disassembler(rom);

      expect(instruction).toEqual({
        loc: '0x200',
        opCode: '8a21',
        nemonic: 'OR Vx, Vy',
        description: 'Set Va = Va OR V2',
      });
    });

    it('should return the right instruction for 0x8xy2', () => {
      const rom = new Uint8Array([0x8a, 0x22]);
      const [instruction] = disassembler(rom);

      expect(instruction).toEqual({
        loc: '0x200',
        opCode: '8a22',
        nemonic: 'AND Vx, Vy',
        description: 'Set Va = Va AND V2',
      });
    });

    it('should return the right instruction for 0x8xy3', () => {
      const rom = new Uint8Array([0x8a, 0x23]);
      const [instruction] = disassembler(rom);

      expect(instruction).toEqual({
        loc: '0x200',
        opCode: '8a23',
        nemonic: 'XOR Vx, Vy',
        description: 'Set Va = Va XOR V2',
      });
    });

    it('should return the right instruction for 0x8xy4', () => {
      const rom = new Uint8Array([0x8a, 0x24]);
      const [instruction] = disassembler(rom);

      expect(instruction).toEqual({
        loc: '0x200',
        opCode: '8a24',
        nemonic: 'ADD Vx, Vy',
        description: 'Set Va = Va + V2, set VF = carry',
      });
    });

    it('should return the right instruction for 0x8xy5', () => {
      const rom = new Uint8Array([0x8a, 0x25]);
      const [instruction] = disassembler(rom);

      expect(instruction).toEqual({
        loc: '0x200',
        opCode: '8a25',
        nemonic: 'SUB Vx, Vy',
        description: 'Set Va = Va - V2, set VF = NOT borrow',
      });
    });

    it('should return the right instruction for 0x8xy6', () => {
      const rom = new Uint8Array([0x8a, 0x26]);
      const [instruction] = disassembler(rom);

      expect(instruction).toEqual({
        loc: '0x200',
        opCode: '8a26',
        nemonic: 'SHR Vx {, Vy}',
        description: 'Set Va = Va SHR 1',
      });
    });

    it('should return the right instruction for 0x8xy7', () => {
      const rom = new Uint8Array([0x8a, 0x27]);
      const [instruction] = disassembler(rom);

      expect(instruction).toEqual({
        loc: '0x200',
        opCode: '8a27',
        nemonic: 'SUBN Vx, Vy',
        description: 'Set Va = V2 - Va, set VF = NOT borrow',
      });
    });

    it('should return the right instruction for 0x8xye', () => {
      const rom = new Uint8Array([0x8a, 0x2e]);
      const [instruction] = disassembler(rom);

      expect(instruction).toEqual({
        loc: '0x200',
        opCode: '8a2e',
        nemonic: 'SHL Vx {, Vy}',
        description: 'Set Va = Va SHL 1',
      });
    });
  });

  describe('nibble 0x09', () => {
    it('should return the right instruction for 0x9xy0', () => {
      const rom = new Uint8Array([0x9a, 0x23]);
      const [instruction] = disassembler(rom);

      expect(instruction).toEqual({
        loc: '0x200',
        opCode: '9a23',
        nemonic: 'SNE Vx, Vy',
        description: 'Skip next instruction if register Va != V2',
      });
    });
  });

  describe('nibble 0x0a', () => {
    it('should return the right instruction for 0xannn', () => {
      const rom = new Uint8Array([0xaa, 0x23]);
      const [instruction] = disassembler(rom);

      expect(instruction).toEqual({
        loc: '0x200',
        opCode: 'aa23',
        nemonic: 'LD I, addr',
        description: 'Set register I to 0xa23',
      });
    });
  });

  describe('nibble 0x0b', () => {
    it('should return the right instruction for 0xbnnn', () => {
      const rom = new Uint8Array([0xba, 0x23]);
      const [instruction] = disassembler(rom);

      expect(instruction).toEqual({
        loc: '0x200',
        opCode: 'ba23',
        nemonic: 'JP V0, addr',
        description: 'Jump to location 0xa23 + V0',
      });
    });
  });

  describe('nibble 0x0c', () => {
    it('should return the right instruction for 0xcxkk', () => {
      const rom = new Uint8Array([0xca, 0x23]);
      const [instruction] = disassembler(rom);

      expect(instruction).toEqual({
        loc: '0x200',
        opCode: 'ca23',
        nemonic: 'RND Vx, byte',
        description: 'Set Va = random byte AND 23',
      });
    });
  });

  describe('nibble 0x0d', () => {
    it('should return the right instruction for 0xdxyn', () => {
      const rom = new Uint8Array([0xda, 0x23]);
      const [instruction] = disassembler(rom);

      expect(instruction).toEqual({
        loc: '0x200',
        opCode: 'da23',
        nemonic: 'DRW Vx, Vy, nibble',
        description: 'Display 3-byte sprite starting at memory location I at (Va, V2), set VF = collision',
      });
    });
  });

  describe('nibble 0x0e', () => {
    it('should return the right instruction for 0xex9e', () => {
      const rom = new Uint8Array([0xea, 0x9e]);
      const [instruction] = disassembler(rom);

      expect(instruction).toEqual({
        loc: '0x200',
        opCode: 'ea9e',
        nemonic: 'SKP Vx',
        description: 'Skip next instruction if key Va is pressed',
      });
    });

    it('should return the right instruction for 0xexa1', () => {
      const rom = new Uint8Array([0xea, 0xa1]);
      const [instruction] = disassembler(rom);

      expect(instruction).toEqual({
        loc: '0x200',
        opCode: 'eaa1',
        nemonic: 'SKNP Vx',
        description: 'Skip next instruction if key Va is not pressed',
      });
    });
  });

  describe('nibble 0x0f', () => {
    it('should return the right instruction for 0xfx07', () => {
      const rom = new Uint8Array([0xfa, 0x07]);
      const [instruction] = disassembler(rom);

      expect(instruction).toEqual({
        loc: '0x200',
        opCode: 'fa07',
        nemonic: 'LD Vx, DT',
        description: 'Set Va = delay timer value',
      });
    });

    it('should return the right instruction for 0xfx0a', () => {
      const rom = new Uint8Array([0xfa, 0x0a]);
      const [instruction] = disassembler(rom);

      expect(instruction).toEqual({
        loc: '0x200',
        opCode: 'fa0a',
        nemonic: 'LD Vx, K',
        description: 'Wait for a key press, set Va = key pressed',
      });
    });

    it('should return the right instruction for 0xfx15', () => {
      const rom = new Uint8Array([0xfa, 0x15]);
      const [instruction] = disassembler(rom);

      expect(instruction).toEqual({
        loc: '0x200',
        opCode: 'fa15',
        nemonic: 'LD DT, Vx',
        description: 'Set delay timer = Va',
      });
    });

    it('should return the right instruction for 0xfx18', () => {
      const rom = new Uint8Array([0xfa, 0x18]);
      const [instruction] = disassembler(rom);

      expect(instruction).toEqual({
        loc: '0x200',
        opCode: 'fa18',
        nemonic: 'LD ST, Vx',
        description: 'Set sound timer = Va',
      });
    });

    it('should return the right instruction for 0xfx1e', () => {
      const rom = new Uint8Array([0xfa, 0x1e]);
      const [instruction] = disassembler(rom);

      expect(instruction).toEqual({
        loc: '0x200',
        opCode: 'fa1e',
        nemonic: 'ADD I, Vx',
        description: 'Set I = I + Va',
      });
    });

    it('should return the right instruction for 0xfx29', () => {
      const rom = new Uint8Array([0xfa, 0x29]);
      const [instruction] = disassembler(rom);

      expect(instruction).toEqual({
        loc: '0x200',
        opCode: 'fa29',
        nemonic: 'LD F, Vx',
        description: 'Set I = location of sprite for digit Va',
      });
    });

    it('should return the right instruction for 0xfx33', () => {
      const rom = new Uint8Array([0xfa, 0x33]);
      const [instruction] = disassembler(rom);

      expect(instruction).toEqual({
        loc: '0x200',
        opCode: 'fa33',
        nemonic: 'LD B, Vx',
        description: 'Store BCD representation of Va in memory locations I, I+1, and I+2',
      });
    });

    it('should return the right instruction for 0xfx55', () => {
      const rom = new Uint8Array([0xfa, 0x55]);
      const [instruction] = disassembler(rom);

      expect(instruction).toEqual({
        loc: '0x200',
        opCode: 'fa55',
        nemonic: 'LD [I], Vx',
        description: 'Store registers V0 through Va in memory starting at location I',
      });
    });

    it('should return the right instruction for 0xfx65', () => {
      const rom = new Uint8Array([0xfa, 0x65]);
      const [instruction] = disassembler(rom);

      expect(instruction).toEqual({
        loc: '0x200',
        opCode: 'fa65',
        nemonic: 'LD Vx, [I]',
        description: 'Read registers V0 through Va from memory starting at location I',
      });
    });
  });
});
