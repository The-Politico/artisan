export default function AsideBrowserWidth({ children, className }) {
  console.log('ran aside browser width');
  return `\
  <section class="page-content__row page-content__row--story is-full-width">
  <div class="container container--story">
      <div class="container__column container__column--story">
         <aside class="story-enhancement  ${className}">
         ${children}
        </aside>
      </div>
  </div>
</section>
  `;
}
