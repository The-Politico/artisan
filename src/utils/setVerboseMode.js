export default (active) => {
  if (active) {
    process.env.VERBOSE_MODE = true;
  } else {
    process.env.VERBOSE_MODE = false;
  }
};
