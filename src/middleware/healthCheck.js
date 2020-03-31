import semver from 'semver';
import NpmApi from 'npm-api';
import meta from '../../package.json';
import chalk from 'chalk';

export default async(argv) => {
  const npm = new NpmApi();
  const packagejson = await npm.repo('@politico/artisan').package();

  let inGoodHealth = true;

  if (semver.lt(meta.version, packagejson.version)) {
    console.log(chalk.yellow(`\nIt looks like your version of Artisan is out of date.\nYou should run "npm install -g @politico/artisan" to update to version ${chalk.bold(packagejson.version)}.\n`));
    inGoodHealth = false;
  }

  return {
    healthy: inGoodHealth,
  };
};
