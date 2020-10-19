import { formatHex } from './utils';

export default function disassembler(rom) {
  const instructions = [];

  for (let pc = 0; pc < rom.length; pc += 2) {
    const loc = formatHex(pc + 0x200, { digits: 3, prefix: true });
    const fByte = rom[pc];
    const sByte = rom[pc + 1];
    const op = (fByte << 8) | sByte;
    const opCode = formatHex(op, { digits: 4 });
    const firstnib = fByte >> 4;

    switch (firstnib) {
      case 0x00:
        switch (sByte) {
          case 0xe0:
            instructions.push({
              loc,
              opCode,
              nemonic: 'CLS',
              description: 'Clear screan',
            });
            break;
          case 0xee:
            instructions.push({
              loc,
              opCode,
              nemonic: 'RTS',
              description: 'Return from subrutine',
            });
            break;
          default:
            instructions.push({
              loc,
              opCode,
              nemonic: 'UNKNOWN 0',
              description: '',
            });
            break;
        }
        break;
      case 0x01:
        instructions.push({
          loc,
          opCode,
          nemonic: 'JP',
          description: `Jump to address ${formatHex(op & 0x0fff, {
            digits: 3,
            prefix: true,
          })}`,
        });
        break;
      case 0x02:
        instructions.push({
          loc,
          opCode,
          nemonic: 'CALL',
          description: `Call subrutine at address ${formatHex(op & 0x0fff)}`,
        });
        break;
      case 0x03:
        instructions.push({
          loc,
          opCode,
          nemonic: 'SE Vx, byte',
          description: `Skip next instruction if register V${formatHex(fByte & 0x0f)} == ${formatHex(sByte)}`,
        });
        break;
      case 0x04:
        instructions.push({
          loc,
          opCode,
          nemonic: 'SNE Vx, byte',
          description: `Skip next instruction if register V${formatHex(fByte & 0x0f)} != ${formatHex(sByte)}`,
        });
        break;
      case 0x05:
        instructions.push({
          loc,
          opCode,
          nemonic: 'SE Vx, Vy',
          description: `Skip next instruction if register V${formatHex(fByte & 0x0f)} == V${formatHex(sByte >> 4)}`,
        });
        break;
      case 0x06:
        instructions.push({
          loc,
          opCode,
          nemonic: 'LD Vx, byte',
          description: `Set V${formatHex(fByte & 0x0f)} = V${formatHex(sByte)}`,
        });
        break;
      case 0x07:
        instructions.push({
          loc,
          opCode,
          nemonic: 'ADD Vx, byte',
          description: `Add the value ${formatHex(sByte, { digits: 2 })} to the register V${formatHex(fByte & 0x0f)}`,
        });
        break;
      case 0x08:
        switch (sByte & 0x0f) {
          case 0x0:
            instructions.push({
              loc,
              opCode,
              nemonic: 'LD Vx, Vy',
              description: `Set V${formatHex(fByte & 0x0f)} = V${formatHex(sByte >> 4)}`,
            });
            break;
          case 0x1:
            instructions.push({
              loc,
              opCode,
              nemonic: 'OR Vx, Vy',
              description: `Set V${formatHex(fByte & 0x0f)} = V${formatHex(fByte & 0x0f)} OR V${formatHex(sByte >> 4)}`,
            });
            break;
          case 0x2:
            instructions.push({
              loc,
              opCode,
              nemonic: 'AND Vx, Vy',
              description: `Set V${formatHex(fByte & 0x0f)} = V${formatHex(fByte & 0x0f)} AND V${formatHex(sByte >> 4)}`,
            });
            break;
          case 0x3:
            instructions.push({
              loc,
              opCode,
              nemonic: 'XOR Vx, Vy',
              description: `Set V${formatHex(fByte & 0x0f)} = V${formatHex(fByte & 0x0f)} XOR V${formatHex(sByte >> 4)}`,
            });
            break;
          case 0x4:
            instructions.push({
              loc,
              opCode,
              nemonic: 'AND Vx, Vy',
              description: `Set V${formatHex(fByte & 0x0f)} = V${formatHex(fByte & 0x0f)} + V${formatHex(sByte >> 4)}, set VF = carry`,
            });
            break;
          case 0x5:
            instructions.push({
              loc,
              opCode,
              nemonic: 'SUB Vx, Vy',
              description: `Set V${formatHex(fByte & 0x0f)} = V${formatHex(fByte & 0x0f)} - V${formatHex(sByte >> 4)}, set VF = NOT borrow`,
            });
            break;
          case 0x6:
            instructions.push({
              loc,
              opCode,
              nemonic: 'SHR Vx, Vy',
              description: `Set V${formatHex(fByte & 0x0f)} = V${formatHex(fByte & 0x0f)} SHR 1`,
            });

            break;
          case 0x7:
            instructions.push({
              loc,
              opCode,
              nemonic: 'SUBN Vx, Vy',
              description: `Set V${formatHex(fByte & 0x0f)} = V${formatHex(sByte >> 4)} - V${formatHex(fByte & 0x0f)}, set VF = NOT borrow`,
            });
            break;
          case 0xe:
            instructions.push({
              loc,
              opCode,
              nemonic: 'SUBN Vx, Vy',
              description: `Set V${formatHex(fByte & 0x0f)} = V${formatHex(sByte >> 4)} SHL 1`,
            });
            break;
          default:
            instructions.push({
              loc,
              opCode,
              nemonic: 'UNKNOWN 8',
              description: '',
            });
            break;
        }
        break;
      case 0x09:
        instructions.push({
          loc,
          opCode,
          nemonic: 'SNE Vx, Vy',
          description: `Skip next instruction if register V${formatHex(fByte & 0x0f)} != V${formatHex(sByte >> 4)}`,
        });
        break;
      case 0x0a:
        instructions.push({
          loc,
          opCode,
          nemonic: 'LD I, addr',
          description: `Set register I to ${formatHex(op & 0x0fff, {
            digits: 3,
            prefix: true,
          })}`,
        });
        break;
      case 0x0b:
        instructions.push({
          loc,
          opCode,
          nemonic: 'JP V0, addr',
          description: `Jump to location ${formatHex(op & 0x0fff, {
            digits: 3,
            prefix: true,
          })} + V0`,
        });
        break;
      case 0x0c:
        instructions.push({
          loc,
          opCode,
          nemonic: 'RND Vx, byte',
          description: `Set V${formatHex(fByte & 0x0f)} to ${formatHex(sByte)} AND random byte`,
        });
        break;
      case 0x0d:
        instructions.push({
          loc,
          opCode,
          nemonic: 'DRW Vx, Vy, nibble',
          description: `Display ${formatHex(sByte & 0x0f)}-byte sprite starting at memory location I at (V${formatHex(fByte & 0x0f)}, V${formatHex(
            sByte >> 4,
          )}), set VF = collision.`,
        });
        break;
      case 0x0e:
        switch (sByte) {
          case 0x9e:
            instructions.push({
              loc,
              opCode,
              nemonic: 'SKP Vx',
              description: `Skip next instruction if key V${formatHex(sByte & 0x0f)} is pressed.`,
            });
            break;
          case 0xa1:
            instructions.push({
              loc,
              opCode,
              nemonic: 'SKNP Vx',
              description: `Skip next instruction if key V${formatHex(sByte & 0x0f)} is not pressed.`,
            });
            break;
          default:
            instructions.push({
              loc,
              opCode,
              description: '',
              nemonic: 'UNKNOWN e',
            });
            break;
        }
        break;
      case 0x0f:
        switch (sByte) {
          case 0x07:
            instructions.push({
              loc,
              opCode,
              nemonic: 'LD Vx, DT',
              description: `Set V${formatHex(fByte & 0x0f)} = delay timer value.`,
            });
            break;
          case 0x0a:
            instructions.push({
              loc,
              opCode,
              nemonic: 'LD Vx, K',
              description: `Wait for a key press, set V${formatHex(fByte & 0x0f)} = key pressed`,
            });
            break;
          case 0x15:
            instructions.push({
              loc,
              opCode,
              nemonic: 'LD DT, Vx',
              description: `Set delay timer = V${formatHex(fByte & 0x0f)}.`,
            });
            break;
          case 0x18:
            instructions.push({
              loc,
              opCode,
              nemonic: 'LD ST, Vx',
              description: `Set sound timer = V${formatHex(fByte & 0x0f)}.`,
            });
            break;
          case 0x1e:
            instructions.push({
              loc,
              opCode,
              nemonic: 'ADD I, Vx',
              description: `Set I = I + V${formatHex(fByte & 0x0f)}.`,
            });
            break;
          case 0x29:
            instructions.push({
              loc,
              opCode,
              nemonic: 'LD F, Vx',
              description: `Set I = location of sprite for digit V${formatHex(fByte & 0x0f)}.`,
            });
            break;
          case 0x33:
            instructions.push({
              loc,
              opCode,
              nemonic: 'LD F, Vx',
              description: `Store BCD representation of V${formatHex(fByte & 0x0f)} in memory locations I, I+1, and I+2`,
            });
            break;
          case 0x55:
            instructions.push({
              loc,
              opCode,
              nemonic: 'LD [I], Vx',
              description: `Store registers V0 through V${formatHex(fByte & 0x0f)} in memory starting at location I`,
            });
            break;
          case 0x65:
            instructions.push({
              loc,
              opCode,
              nemonic: 'LD Vx, [I]',
              description: `Read registers V0 through V${formatHex(fByte & 0x0f)} in memory starting at location I`,
            });
            break;
          default:
            instructions.push({
              loc,
              opCode,
              description: '',
              nemonic: 'UNKNOWN f',
            });
            break;
        }
        break;
      default:
        break;
    }
  }

  return instructions;
}
