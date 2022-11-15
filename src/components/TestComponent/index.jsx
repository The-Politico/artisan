import cls from 'classnames';
import { colors, padding } from '../../theme';

export default function TestComponent(props) {
  const { content } = props;
  const testClass = cls(
    colors.bgSlate800,
    padding.p2,
  );
  console.log(testClass);

  return (
    <div className={testClass}><p>{content}</p></div>
  );
}
