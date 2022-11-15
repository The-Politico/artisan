import Container from './_container';
import Main from './_main';

export const NAME = 'standard';

export default function Standard({ children, showArticle }) {
  return Container({
    showArticle,
    children:
      Main({
        children,
        showArticle,
        className: 'standard',
      }),
  });
}
