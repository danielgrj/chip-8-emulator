import { formatHex } from './utils';

export default function disassembler(rom) {
  for (let pc = 0; pc < rom.length; pc += 2) {
    const loc = pc + 0x200;
    const code = (rom[pc] << 8) | rom[pc + 1];
    const firstnib = rom[pc] >> 4;
    let instruction;

    switch (firstnib) {
      case 0x00:
        instruction = '0 not handled yet';
        break;
      case 0x01:
        instruction = '1 not handled yet';
        break;
      case 0x02:
        instruction = '2 not handled yet';
        break;
      case 0x03:
        instruction = '3 not handled yet';
        break;
      case 0x04:
        instruction = '4 not handled yet';
        break;
      case 0x05:
        instruction = '5 not handled yet';
        break;
      case 0x06:
        const reg = rom[pc] & 0x0f;
        instruction = `${reg.toString(16)} ${code} MVI`;
        break;
      case 0x07:
        instruction = '7 not handled yet';
        break;
      case 0x08:
        instruction = '8 not handled yet';
        break;
      case 0x09:
        instruction = '9 not handled yet';
        break;
      case 0x0a:
        const addresshi = rom[pc] & 0x0f;
        instruction = `${addresshi} ${rom[pc + 1]} MVI`;
        break;
      case 0x0b:
        instruction = 'b not handled yet';
        break;
      case 0x0c:
        instruction = 'c not handled yet';
        break;
      case 0x0d:
        instruction = 'd not handled yet';
        break;
      case 0x0e:
        instruction = 'e not handled yet';
        break;
      case 0x0f:
        instruction = 'f not handled yet';
        break;
      default:
        break;
    }

    console.log(
      `${formatHex(loc, { digits: 3, prefix: true })} ${formatHex(code, {
        digits: 4,
      })}  ${instruction}`,
    );
  }
}
