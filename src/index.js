import 'core-js/stable';
import 'regenerator-runtime/runtime';

import disassembler from './disassembler';
import { loadRom } from './utils';

const input = document.createElement('input');
input.type = 'file';
input.id = 'file';

document.querySelector('#root').appendChild(input);

input.addEventListener('change', async event => {
  const [file] = event.target.files;

  const rom = await loadRom(file);
  disassembler(rom);
});
