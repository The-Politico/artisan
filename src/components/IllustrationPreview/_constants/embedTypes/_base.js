import lorem from '../lorem';

export default function Base({ children = '', showArticle } = {}) {
  return `\
<section class="page-content__row page-content__row--story main-section">
  <div class="container container--story story-layout--fixed-fluid">
    <div class="container__column container__column--story center-horizontally hide-under-medium">
    </div>
    <div class="container__column container__column--story">
      <div class="container__row container__row--story story-layout--fluid-fixed">
        <div class="container__column container__column--story center-horizontally">
          <div class="story-text">
            ${children}

            ${!showArticle ? '' : `
              <p class=" story-text__paragraph">
                ${lorem[3]}
              </p>

              <p class=" story-text__paragraph">
                ${lorem[4]}
              </p>

              <p class=" story-text__paragraph">
                ${lorem[1]}
              </p>
            `}
          </div>
        </div>
        <div
          aria-hidden="true"
          class="container__column container__column--story center-vertically right-zone hide-under-small"
        />
      </div>
    </div>
  </div>
</section>`;
}
