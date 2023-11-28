import Input from '../Input';

export default function PopoverInputs({ setNewProjectName, setNewIlloName }) {
  return (
    <>
      <Input
        label="Project Name"
        setValue={setNewProjectName}
      />
      <Input
        label="Illustration Name"
        setValue={setNewIlloName}
      />
    </>
  );
}
