import cls from 'classnames';
import {
  flex, margin, borders, colors, typography, padding,
}
  from '../../theme';

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
        flex.flex,
        flex.flexCol,
        margin.m2,
      )
        }
    >
      <span className={cls(
        styles.labelText,
        typography.textSm,
        colors.textSlate700,
        margin.mb2,
      )}
      >
        {inputLabel}
      </span>
      <label htmlFor="textInput">
        <input
          className={
            darkMode ? cls(
              styles.darkTextInput,
              borders.roundedLg,
              colors.bgSlate600,
              typography.textXs,
              typography.textSlate200,
            )
              : cls(
                styles.textInput,
                borders.roundedLg,
                colors.bgSlate100,
                typography.textSlate700,
                padding.p1,
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
