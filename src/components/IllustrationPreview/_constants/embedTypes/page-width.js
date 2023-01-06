import Main from './_main';
import Container from './_container';
import AsidePageWidth from './_asidePageWidth';

export const NAME = 'page-width';

export default function PageWidth({ children, showArticle }) {
  return Container({
    showArticle,
    children:
      Main({
        children: AsidePageWidth({ children, className: NAME }),
        showArticle,
        className: NAME,
      }),
  });
}
