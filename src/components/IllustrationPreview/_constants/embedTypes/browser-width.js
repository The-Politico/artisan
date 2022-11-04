import Base from './_base';
import Prefix from './_prefix';
import Container from './_container';
import Section from './_section';
import Suffix from './_suffix';

export const NAME = 'browser-width';

export default function BrowserWidth({ children, showArticle }) {
  return Container({
    showArticle,
    children:
      Prefix({ showArticle })
      + Base({ showArticle })
      + Section({
        children,
        className: 'is-full-width',
        showArticle,
      })
      + Suffix({ showArticle }),
  });
}
