export default function AsideBumpIn({ children, className }) {
  return `\
  <section class="page-content__row page-content__row--story main-section">
<div class="container container--story story-layout--fixed-fluid">
<div class="container__column container__column--story center-horizontally hide-under-medium"></div>
<div class="container__column container__column--story">
<div class="container__row container__row--story story-layout--fluid-fixed">
<div class="container__column container__column--story center-horizontally">
<div class="story-text">                  
        <aside class="story-enhancement  ${className}">
          ${children}
        </aside>
                    </div>
                </div>

                <div class="container__column container__column--story center-vertically right-zone hide-under-small" aria-hidden="true"></div>
            </div>
        </div>
    </div>
</section>
  `;
}
