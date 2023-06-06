import Container from './_container';
import Main from './_main';
import AsideBrowserWidthFull from './_asideBrowserWidthFull';

export const NAME = 'browser-width-full';

export default function BrowserWidthFull({ children, showArticle }) {
  return Container({
    showArticle,
    children:
      Main({
        children: AsideBrowserWidthFull({ children, className: NAME }),
        showArticle,
        className: NAME,
      }),
  });
}
