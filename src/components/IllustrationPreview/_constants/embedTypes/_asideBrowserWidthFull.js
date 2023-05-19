export default function AsideBrowserWidthFull({ children, className }) {
  return `\
  <section class="page-content__row page-content__row--story main-section is-full-width-bleed">
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
