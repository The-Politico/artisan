import Main from './_main';
import Container from './_container';

export const NAME = 'page-width';

export default function PageWidth({ children, showArticle }) {
  return Container({
    showArticle,
    children:
      Main({
        children,
        showArticle,
        className: 'page-width',
      }),
  });
}
