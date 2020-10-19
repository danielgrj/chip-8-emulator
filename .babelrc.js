const isProd = String(process.env.NODE_ENV) === 'production';
const isTest = String(process.env.NODE_ENV) === 'test';

module.exports = {
  presets: [['@babel/preset-env', { modules: isTest ? 'commonjs' : false }]],
  plugins: ['@babel/proposal-class-properties', '@babel/proposal-object-rest-spread'],
};
