import exec from 'Utils/exec';

export default async() => {
  await exec('npm run pubProduction');
};
