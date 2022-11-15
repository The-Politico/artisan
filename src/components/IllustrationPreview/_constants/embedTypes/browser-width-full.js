import Container from './_container';
import Main from './_main';

export const NAME = 'browser-width-full';

export default function BrowserWidthFull({ children, showArticle }) {
  return Container({
    showArticle,
    children:
      Main({
        children,
        showArticle,
        className: 'browser-width-full',
      }),
  });
}
