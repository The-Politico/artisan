import cls from 'classnames';
import { margin, borders, colors } from '../../theme';

import styles from './styles.module.css';

export default function Input({ setTextInput, inputLabel, darkMode }) {
  const typingHandler = (event) => {
    if (event.target.value !== '') {
      setTextInput(event.target.value);
    } else {
      setTextInput('');
    }
  };

  return (
    <div className={
      cls(
        styles.container,
        margin.m2,
      )
        }
    >
      <span className={cls(styles.labelText, colors.textSlate700)}>
        {inputLabel}
      </span>
      <label htmlFor="textInput">
        <input
          className={
            darkMode ? cls(
              styles.darkTextInput,
              borders.roundedLg,
              colors.bgSlate600,
            )
              : cls(
                styles.textInput,
                borders.roundedLg,
                colors.bgSlate100,
              )
            }
          type="text"
          id="textInput"
          onChange={typingHandler}
        />
      </label>
      <br />
    </div>
  );
}
