import Base from './_base';
import Prefix from './_prefix';
import Container from './_container';

export const NAME = 'standard';

export default function Standard({ children, showArticle }) {
  const enhancement = `\
<aside class="story-enhancement">
  ${children}
</aside>
  `;

  return Container({
    showArticle,
    children:
      Prefix({ showArticle })
      + Base({ children: enhancement, showArticle }),
  });
}
