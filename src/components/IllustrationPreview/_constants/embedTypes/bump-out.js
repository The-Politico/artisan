import Container from './_container';
import Main from './_main';
import AsideBumpOut from './_asideBumpOut';

export const NAME = 'bump-out';

export default function BumpOut({ children, showArticle }) {
  return Container({
    showArticle,
    children:
      Main({
        children: AsideBumpOut({ children, className: NAME }),
        showArticle,
        className: NAME,
      }),
  });
}
