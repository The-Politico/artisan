export default function AsidePageWidth({ children, className }) {
  return `\
  <section class="page-content__row page-content__row--story is-bg-full-width">
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
