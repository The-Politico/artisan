import exec from './exec';

export default dir => {
  return exec('npm install', dir);
};
