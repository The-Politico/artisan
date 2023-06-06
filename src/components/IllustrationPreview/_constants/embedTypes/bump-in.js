import Container from './_container';
import Main from './_main';
import AsideBumpIn from './_asideBumpIn';

export const NAME = 'bump-in';

export default function BumpIn({ children, showArticle }) {
  return Container({
    showArticle,
    children:
      Main({
        children: AsideBumpIn({ children, className: NAME }),
        showArticle,
        className: NAME,
      }),
  });
}
