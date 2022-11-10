import Container from './_container';
import Main from './_main';

export const NAME = 'bump-in';

export default function BumpIn({ children, showArticle }) {
  return Container({
    showArticle,
    children:
      Main({
        children,
        showArticle,
        className: 'bump-in',
      }),
  });
}
