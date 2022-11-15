import Container from './_container';
import Main from './_main';

export const NAME = 'bump-out';

export default function BumpOut({ children, showArticle }) {
  return Container({
    showArticle,
    children:
      Main({
        children,
        showArticle,
        className: 'bump-out',
      }),
  });
}
