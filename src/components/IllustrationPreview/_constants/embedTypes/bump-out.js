import Base from './_base';
import Prefix from './_prefix';
import Container from './_container';
import Section from './_section';
import Suffix from './_suffix';

export const NAME = 'bump-out';

export default function BumpOut({ children, showArticle }) {
  return Container({
    showArticle,
    children:
      Prefix({ showArticle })
      + Base({ showArticle })
      + Section({
        children,
        className: 'is-medium-width',
        showArticle,
      })
      + Suffix({ showArticle }),
  });
}
