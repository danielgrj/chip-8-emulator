const loadRom = file => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);

    reader.onload = () => {
      const rom = new Uint8Array(reader.result);
      resolve(rom);
    };

    reader.onerror = e => {
      reject(e);
    };
  });
};

const formatHex = (value, { digits, prefix = false } = {}) => {
  const PREFIX = '0x';
  const MISSING_DIGIT_REPLACEMENT = '0';

  const rawHex = value.toString(16);
  const missingDigits = MISSING_DIGIT_REPLACEMENT.repeat(digits ? digits - rawHex.length : 0);

  if (prefix) return `${PREFIX}${missingDigits}${rawHex}`;

  return `${missingDigits}${rawHex}`;
};

export { loadRom, formatHex };
