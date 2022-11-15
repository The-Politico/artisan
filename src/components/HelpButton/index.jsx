import { QuestionMarkCircleIcon } from '@heroicons/react/24/solid';
import styles from './styles.module.css';

export default function HelpButton() {
  return (
    <a href="https://www.politico.com/" target="_blank" rel="noreferrer">
      <QuestionMarkCircleIcon className={styles.circle} />
    </a>
  );
}
