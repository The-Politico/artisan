import Container from './_container';
import Main from './_main';

export const NAME = 'browser-width';

export default function BrowserWidth({ children, showArticle }) {
  return Container({
    showArticle,
    children:
      Main({
        children,
        showArticle,
        className: 'browser-width',
      }),
  });
}
