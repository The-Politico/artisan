import Container from './_container';
import Main from './_main';
import AsideStandard from './_asideStandard';

export const NAME = 'standard';

export default function Standard({ children, showArticle }) {
  return Container({
    showArticle,
    children:
      Main({
        children: AsideStandard({ children, className: NAME }),
        showArticle,
        className: NAME,
      }),
  });
}
