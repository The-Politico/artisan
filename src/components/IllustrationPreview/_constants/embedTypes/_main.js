import lorem, { LOREM_HEADLINE, LOREM_DEK } from '../lorem';

export default function Main({ children, showArticle, className }) {
  const now = new Date();

  const { format } = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    timeZoneName: 'short',
  });

  const nowFormatted = format(now);
  const fullBleed = (className === 'browser-width-full')
    ? 'is-full-width-bleed' : '';

  console.log(fullBleed);
  console.log(className);
  console.log(className === 'browser-width-full');

  if (!showArticle) {
    return `\
        <section class="page-content__row page-content__row--story main-section ${fullBleed}">
        <div class="container container--story">
            <div class="container__column container__column--story">
            <aside class="story-enhancement ${className}">
                ${children}
            </aside>
            </div>
        </div>
        </section>`;
  }

  return `\
  <section class="page-content__row page-content__row--story" style="margin: 0 auto;">
  <div class="container container--story story-layout--fluid-fixed">
      <div class="container__column container__column--story summary-middle">
           <div class="container__row container__row--story story-layout--fixed-fluid">
              <div class="container__column container__column--story"></div>
              <div class="container__column container__column--story">

              </div>
          </div>
          <div class="container__row container__row--story story-layout--fixed-fluid">
              <div class="container__column container__column--story"></div>
              <div class="container__column container__column--story center-horizontally">
              
    <div class="story-text" style="margin: 0 auto !important;">
        <section class="media-item media-item--story media-item--story-lead">
            <div class="media-item__summary size--medium">

                <h2 class="headline">
                    ${LOREM_HEADLINE}
                </h2>
            <p class="dek">${LOREM_DEK}</p>  
            </div>
        </section>
                  
  <div class="story-meta">                              
    <div class="story-meta__authors-timestamp has-social-tools ">
      <div class="story-meta__details">
          <p class="story-meta__authors">Author Name</p>
          <p class="story-meta__timestamp">
            <time datetime=${now}>${nowFormatted}</time>
          </p>
      </div>

      <aside class="social-tools">
        <ul class="social-tools__list">
            <li class="social-tools__list-item">
                <a href="http://api.addthis.com/oexchange/0.8/forward/facebook/offer?pco=tbx32nj-1.0&amp;url=&amp;pubid=" target="_blank" aria-label="Facebook (opens in a new window)">
                    <span class="social-tools__svg social-tools__svg--facebook">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path></svg>
                    </span>
                </a>
            </li>
            <li class="social-tools__list-item">
                <a href="http://api.addthis.com/oexchange/0.8/forward/twitter/offer?pco=tbx32nj-1.0&amp;url=null&amp;text=Artisan+Embed+Testing&amp;pubid=" target="_blank" aria-label="Twitter (opens in a new window)">
                    <span class="social-tools__svg social-tools__svg--twitter">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M24 4.557a9.83 9.83 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.724 9.864 9.864 0 0 1-3.127 1.195 4.916 4.916 0 0 0-3.594-1.555c-3.179 0-5.515 2.966-4.797 6.045A13.978 13.978 0 0 1 1.671 3.149a4.93 4.93 0 0 0 1.523 6.574 4.903 4.903 0 0 1-2.229-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.935 4.935 0 0 1-2.224.084 4.928 4.928 0 0 0 4.6 3.419A9.9 9.9 0 0 1 0 19.54a13.94 13.94 0 0 0 7.548 2.212c9.142 0 14.307-7.721 13.995-14.646A10.025 10.025 0 0 0 24 4.557z"></path></svg>
                    </span>
                </a>
            </li>
            
            <li class="social-tools__list-item" aria-live="assertive">
                <a href="#" tabindex="-1">
                    <span class="social-tools__svg social-tools__svg--link" tabindex="0" aria-label="Click here to copy URL">
                        <svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" enable-background="new 0 0 24 24"><style>.st1{fill-rule:evenodd;clip-rule:evenodd;fill:#fff}</style><g transform="translate(0 -.528)"><defs><filter id="Adobe_OpacityMaskFilter" filterUnits="userSpaceOnUse" x="0" y=".6" width="14.2" height="15.4"><feColorMatrix values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0"></feColorMatrix></filter></defs><mask maskUnits="userSpaceOnUse" x="0" y=".6" width="14.2" height="15.4" id="b_1_"><g filter="url(#Adobe_OpacityMaskFilter)"><path id="a_1_" class="st1" d="M0 .5h14.2V16H0V.5z"></path></g></mask><path d="M14 13.6c-.3-.3-.7-.3-1 0-1.3 1.3-3.5 1.3-4.9 0L2.4 7.8C1 6.4 1 4.2 2.4 2.9c1.3-1.3 3.5-1.3 4.9 0l3.8 3.8c.3.3.7.2 1-.1.2-.3.2-.6 0-.9L8.2 1.9a4.86 4.86 0 0 0-6.8.1c-1.8 1.9-1.8 4.9 0 6.7l5.8 5.8c1.9 1.9 4.9 1.9 6.8 0 .3-.2.3-.6 0-.9" mask="url(#b_1_)"></path></g><g transform="translate(7 5.472)"><defs><filter id="Adobe_OpacityMaskFilter_1_" filterUnits="userSpaceOnUse" x="2.8" y="3.1" width="14.2" height="15.4"><feColorMatrix values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0"></feColorMatrix></filter></defs><mask maskUnits="userSpaceOnUse" x="2.8" y="3.1" width="14.2" height="15.4" id="d_1_"><g filter="url(#Adobe_OpacityMaskFilter_1_)"><path id="c_1_" class="st1" d="M2.8 3.1H17v15.4H2.8V3.1z"></path></g></mask><path d="M3 5.5c.3.3.7.3 1 0 1.3-1.3 3.5-1.3 4.9 0l5.8 5.8c1.3 1.3 1.3 3.5 0 4.9-1.3 1.3-3.5 1.3-4.9 0L6 12.4c-.3-.3-.7-.3-1 0-.3.3-.3.7 0 1l3.8 3.8c1.9 1.9 4.9 1.9 6.8 0 1.9-1.9 1.9-4.9 0-6.8L9.8 4.5c-1.9-1.9-5-1.9-6.8 0-.3.3-.3.7 0 1" mask="url(#d_1_)"></path></g></svg>
                    </span>
                </a>
                <ul class="social-tools__supplemental-list has-text">
                    <li class="social-tools__list-item">
                        <p class="link-copy">Link Copied</p>
                    </li>
                </ul>
            </li>
            <li class="social-tools__list-item">
                <a href="#" aria-label="More" class="social-tools__link--more" aria-expanded="false">
                    <span class="social-tools__svg social-tools__svg--more">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="3" cy="12" r="3"></circle><circle cx="21" cy="12" r="3"></circle><circle cx="12" cy="12" r="3"></circle></svg>
                    </span>
                </a>

                <ul class="social-tools__supplemental-list">
                    <li class="social-tools__list-item">
                        <a href="mailto:?to=&amp;subject=Artisan Embed Testing&amp;body=null" aria-label="Sent an Email">
                            <span class="social-tools__svg social-tools__svg--mail">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 20.4h24V3.6H0v16.8zM1.2 4.8h21.6L12 12 1.2 4.8zm0 1.2L12 13.2 22.8 6v13.2H1.2V6z"></path></svg>
                            </span>
                        </a>
                    </li>
                    <li class="social-tools__list-item">
                        <a href="http://www.reddit.com/submit?url=&amp;title=Artisan+Embed+Testing" target="_blank" aria-label="Reddit (opens in a new window)">
                        
                            <span class="social-tools__svg social-tools__svg--reddit">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M14.238 15.348c.085.084.085.221 0 .306-.465.462-1.194.687-2.231.687l-.008-.002-.008.002c-1.036 0-1.766-.225-2.231-.688-.085-.084-.085-.221 0-.305.084-.084.222-.084.307 0 .379.377 1.008.561 1.924.561l.008.002.008-.002c.915 0 1.544-.184 1.924-.561.085-.084.223-.084.307 0zm-3.44-2.418c0-.507-.414-.919-.922-.919-.509 0-.923.412-.923.919 0 .506.414.918.923.918.508.001.922-.411.922-.918zm13.202-.93c0 6.627-5.373 12-12 12s-12-5.373-12-12 5.373-12 12-12 12 5.373 12 12zm-5-.129c0-.851-.695-1.543-1.55-1.543-.417 0-.795.167-1.074.435-1.056-.695-2.485-1.137-4.066-1.194l.865-2.724 2.343.549-.003.034c0 .696.569 1.262 1.268 1.262.699 0 1.267-.566 1.267-1.262s-.568-1.262-1.267-1.262c-.537 0-.994.335-1.179.804l-2.525-.592c-.11-.027-.223.037-.257.145l-.965 3.038c-1.656.02-3.155.466-4.258 1.181-.277-.255-.644-.415-1.05-.415-.854.001-1.549.693-1.549 1.544 0 .566.311 1.056.768 1.325-.03.164-.05.331-.05.5 0 2.281 2.805 4.137 6.253 4.137s6.253-1.856 6.253-4.137c0-.16-.017-.317-.044-.472.486-.261.82-.766.82-1.353zm-4.872.141c-.509 0-.922.412-.922.919 0 .506.414.918.922.918s.922-.412.922-.918c0-.507-.413-.919-.922-.919z"></path></svg>
                            </span>
                        </a>
                    </li>
                    <li class="social-tools__list-item">
                        <a href="https://wa.me/?text=" target="_blank" aria-label="WhatsApp (opens in a new window)">
                            <span class="social-tools__svg social-tools__svg--whatsapp">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"></path></svg>
                            </span>
                        </a>
                    </li>
                </ul>
            </li>
            
        </ul>
      </aside>
    </div>
  </div>
</div>
              </div>
          </div>
      </div>

      
  </div>
</section>

<!-- NEW TEST SECTION -->
<section class="page-content__row page-content__row--story main-section">
    <div class="container container--story story-layout--fixed-fluid">
        <div class="container__column container__column--story center-horizontally hide-under-medium">
        
        </div>

        <div class="container__column container__column--story">
            <div class="container__row container__row--story story-layout--fluid-fixed">
                <div class="container__column container__column--story center-horizontally">
                    <div class="story-text">
                    <p class="story-text__paragraph   ">${lorem[0]}</p>
                    <p class="story-text__paragraph   ">${lorem[1]}</p>
                    <p class="story-text__paragraph   ">${lorem[3]}</p>

                    </div>
                </div>
 
            </div>
        </div>
        
    </div>
</section>

<!-- ATTEMPT AT A BETTER ASIDE -->
<section class="page-content__row page-content__row--story main-section ${fullBleed}">
    <div class="container container--story">
        <div class="container__column container__column--story">
        <aside class="story-enhancement ${className}">
            ${children}
        </aside>
        </div>
    </div>
</section>
<section class="page-content__row page-content__row--story main-section">
    <div class="container container--story story-layout--fixed-fluid">
        <div class="container__column container__column--story center-horizontally hide-under-medium">
        
        </div>

        <div class="container__column container__column--story">
            <div class="container__row container__row--story story-layout--fluid-fixed">
                <div class="container__column container__column--story center-horizontally">
                    <div class="story-text">
                    <p class="story-text__paragraph   ">${lorem[3]}</p>
                    <p class="story-text__paragraph   ">${lorem[0]}</p>
                    <p class="story-text__paragraph   ">${lorem[1]}</p>
                    </div>
                </div>
 
            </div>
        </div>
        
    </div>
</section>
<section class="page-content__row page-content__row--story below-article-section">
    <div class="container container--story story-layout--fixed-fluid">
        <div class="container__column container__column--story center-horizontally"></div>
        <div class="container__column container__column--story">
            <div class="container__row container__row--story story-layout--fluid-fixed">
                <div class="container__column container__column--story center-horizontally">
                    <div class="below-story-text" id="below-story-text">
                    </div>
                </div>
                <div class="container__column container__column--story center-vertically"></div>
            </div>
        </div>
    </div>
</section>
`;
}
