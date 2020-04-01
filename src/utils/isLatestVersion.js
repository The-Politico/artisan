import semver from 'semver';
import NpmApi from 'npm-api';
import meta from '../../package.json';

export default async(argv) => {
  const npm = new NpmApi();
  const packagejson = await npm.repo('@politico/artisan').package();
  return !semver.lt(meta.version, packagejson.version);
};
