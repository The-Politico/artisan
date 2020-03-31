import setVerboseMode from 'Utils/setVerboseMode';

export default (args) => {
  const verbose = typeof args.verbose === 'undefined' ? true : args.verbose;
  setVerboseMode(verbose);
  return {};
};
