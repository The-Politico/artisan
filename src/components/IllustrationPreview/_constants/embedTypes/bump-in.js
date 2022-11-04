import Base from './_base';
import Prefix from './_prefix';
import Container from './_container';

export const NAME = 'bump-in';

export default function BumpIn({ children, showArticle }) {
  const enhancement = `\
<aside class="story-enhancement bump-in">
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
