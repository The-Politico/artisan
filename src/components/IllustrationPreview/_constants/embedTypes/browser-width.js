import Container from './_container';
import Main from './_main';
import AsideBrowserWidth from './_asideBrowserWidth';

export const NAME = 'browser-width';

export default function BrowserWidth({ children, showArticle }) {
  return Container({
    showArticle,
    children:
      Main({
        children: AsideBrowserWidth({ children, className: NAME }),
        showArticle,
        className: NAME,
      }),
  });
}
