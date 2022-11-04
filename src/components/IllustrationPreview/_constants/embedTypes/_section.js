export default function Section({ className, children }) {
  return `\
<section class="page-content__row page-content__row--story main-section ${className}">
  <div class="container container--story">
    <div class="container__column container__column--story">
      <aside class="story-enhancement">
        ${children}
      </aside>
    </div>
  </div>
</section>`;
}
