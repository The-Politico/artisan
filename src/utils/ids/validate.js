import parse from './parse';

const VALID_ID = /^[A-Za-z0-9\s\-_]+$/;

export default function validate({ id, project, illustration }) {
  let projectValidate = project;
  let illustrationValidate = illustration;

  if (id) {
    const names = parse(id);
    projectValidate = names.project;
    illustrationValidate = names.illustration;
  }

  if (!projectValidate && !illustrationValidate) {
    return false;
  }

  if (projectValidate && !VALID_ID.test(projectValidate)) {
    return false;
  }

  if (illustrationValidate && !VALID_ID.test(illustrationValidate)) {
    return false;
  }

  return true;
}
