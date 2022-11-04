export default function Container({ children, showArticle }) {
  return `\
  <body class=" enable-ad-placeholder" data-theme-version="18" data-ad-refresh="30">
    <div class="page-wrapper">
      <div class="page-header">
        ${!showArticle ? '' : `
        <header class="header on-core  on-dark bgc--vulcan-gray19" id="js-top-header">
          <div class="header__row header__main">
            <div class="header__branding" role="banner">
              <h1>
                <a href="https://qablue.politico.com/" tabindex="3">
                  <b aria-hidden="true" class="bt-icon bt-icon--politico is-emphasized"></b>
                  <b aria-hidden="true" class="bt-icon bt-icon--core-small"></b>
                  <span class="icon-text">POLITICO</span>
                </a>
              </h1>
            </div>
            <div class="header__content">
              <div class="header__left">
                <button aria-label="Master menu" aria-expanded="false" class="hamburger js-hamburger" tabindex="2">
                  <span></span>
                </button>
              </div>
              <div class="header__right">
                <div class="actions-lineup">
                  <ul class="actions-lineup__list">
                    <li class="actions-lineup__item hide-at-mobile">
                      <a href="https://qablue.politico.com/magazine/magazine" target="_top" class="js-tealium-tracking" data-tracking="mpos=na&amp;mid=site_header&amp;lindex=1&amp;lcol=1">Magazine</a></li>

                    <li class="actions-lineup__item hide-at-mobile">
                      THE AGENDA</li>

                    <li class="actions-lineup__item hide-at-mobile">
                      <a href="https://qablue.politico.com/pro-marketing.html" target="_top" class="js-tealium-tracking" data-tracking="mpos=na&amp;mid=site_header&amp;lindex=3&amp;lcol=3">PRO</a></li>

                    <li class="actions-lineup__item ">
                      <div class="slide-search" role="presentation">
                        <a href="#" class="slide-search__open js-tealium-tracking" id="search-open" aria-label="Open search form" aria-pressed="false" role="button" target="_top" data-tracking="mpos=na&amp;mid=site_search_open&amp;lindex=1&amp;lcol=1"><b
                            class="bt-icon bt-icon--search"></b><span class="icon-text">Search</span>
                        </a>
                        <div class="slide-search__content bgc--vulcan-gray19" id="search-input" aria-hidden="true">
                          <form class="slide-search__form" action="https://qablue.politico.com/search" method="get">
                            <input class="slide-search__input" type="search" name="q" id="searchTerm" aria-label="Search for any story" placeholder="Enter search term...">
                            <button class="slide-search__run" type="submit" aria-label="Start search"><b class="bt-icon bt-icon--search"></b><span class="icon-text">Search</span></button>
                            <button class="slide-search__close" id="search-close" type="button"><b class="bt-icon bt-icon--close" aria-label="Close Search"></b></button>
                          </form>
                        </div>
                      </div>
                    </li>

                  </ul>
                </div>
              </div>
            </div>
          </div>
          <nav class="master-menu js-master-menu" role="navigation" aria-hidden="true">
            <div class="master-menu__content bgc--vulcan-gray19">
              <div class="row row--6-col">
                <div class="col is-menu">
                  <div class="col is-menu">
                    <h2 class="menu-toggle js-menu-toggle section-heading" tabindex="-1">SECTIONS</h2>
                    <ul class="master-menu__list">
                      <li class="master-menu__item">
                        <a href="https://qablue.politico.com/congress" target="_top" tabindex="-1" class="js-tealium-tracking" data-tracking="mpos=na&amp;mid=site_navigation&amp;lindex=1&amp;lcol=1">Congress</a></li>
                      <li class="master-menu__item">
                        <a href="https://qablue.politico.com/white-house" target="_top" tabindex="-1" class="js-tealium-tracking" data-tracking="mpos=na&amp;mid=site_navigation&amp;lindex=2&amp;lcol=1">White House</a></li>
                      <li class="master-menu__item">
                        <a href="https://qablue.politico.com/video" target="_top" tabindex="-1" class="js-tealium-tracking" data-tracking="mpos=na&amp;mid=site_navigation&amp;lindex=3&amp;lcol=1">Video</a></li>
                      <li class="master-menu__item">
                        <a href="https://qablue.politico.com/podcasts" target="_top" tabindex="-1" class="js-tealium-tracking" data-tracking="mpos=na&amp;mid=site_navigation&amp;lindex=4&amp;lcol=1">Podcasts</a></li>
                    </ul>
                  </div>
                </div>
                <div class="col is-menu">
                  <div class="col is-menu">
                    <h2 class="menu-toggle js-menu-toggle section-heading" tabindex="-1">NEWSLETTERS</h2>
                    <ul class="master-menu__list">
                      <li class="master-menu__item">
                        <a href="https://qablue.politico.com/newsletters/playbook" target="_top" tabindex="-1" class="js-tealium-tracking" data-tracking="mpos=na&amp;mid=site_navigation&amp;lindex=1&amp;lcol=2">Playbook</a></li>
                      <li class="master-menu__item">
                        <a href="https://qablue.politico.com/newsletters/playbook-power-lunch" target="_top" tabindex="-1" class="js-tealium-tracking" data-tracking="mpos=na&amp;mid=site_navigation&amp;lindex=2&amp;lcol=2">POLITICO Playbook PM</a></li>
                      <li class="master-menu__item">
                        <a href="https://qablue.politico.com/newsletters/huddle" target="_top" tabindex="-1" class="js-tealium-tracking" data-tracking="mpos=na&amp;mid=site_navigation&amp;lindex=3&amp;lcol=2">Huddle</a></li>
                      <li class="master-menu__item">
                        <a href="https://qablue.politico.com/newsletters" target="_top" tabindex="-1" class="js-tealium-tracking" data-tracking="mpos=na&amp;mid=site_navigation&amp;lindex=4&amp;lcol=2">All Newsletters</a></li>
                    </ul>
                  </div>
                </div>
                <div class="col is-menu">
                  <div class="col is-menu">
                    <h2 class="menu-toggle js-menu-toggle section-heading" tabindex="-1">SERIES</h2>
                    <ul class="master-menu__list">
                      <li class="master-menu__item">
                        <a href="https://qablue.politico.com/what-works" target="_top" tabindex="-1" class="js-tealium-tracking" data-tracking="mpos=na&amp;mid=site_navigation&amp;lindex=1&amp;lcol=3">What Works</a></li>
                      <li class="master-menu__item">
                        <a href="https://qablue.politico.com/events/women-rule-series" target="_top" tabindex="-1" class="js-tealium-tracking" data-tracking="mpos=na&amp;mid=site_navigation&amp;lindex=2&amp;lcol=3">Women Rule</a></li>
                      <li class="master-menu__item">
                        <a href="/agenda/issue/agenda-2020-health" target="_blank" tabindex="-1" class="js-tealium-tracking" data-tracking="mpos=na&amp;mid=site_navigation&amp;lindex=3&amp;lcol=3">Agenda 2020</a></li>
                      <li class="master-menu__item">
                        <a href="https://qablue.politico.com/recovery-lab-mock#recovery-lab" target="_blank" tabindex="-1" class="js-tealium-tracking" data-tracking="mpos=na&amp;mid=site_navigation&amp;lindex=4&amp;lcol=3">Recovery Lab</a></li>
                    </ul>
                  </div>
                </div>
                <div class="col is-menu">
                  <div class="col is-menu">
                    <h2 class="menu-toggle js-menu-toggle section-heading" tabindex="-1">POLITICO LIVE</h2>
                    <ul class="master-menu__list">
                      <li class="master-menu__item">
                        <a href="https://qablue.politico.com/live-events" target="_top" tabindex="-1" class="js-tealium-tracking" data-tracking="mpos=na&amp;mid=site_navigation&amp;lindex=1&amp;lcol=4">Home</a></li>
                      <li class="master-menu__item">
                        <a href="https://qablue.politico.com/live-events/test-title" target="_top" tabindex="-1" class="js-tealium-tracking" data-tracking="mpos=na&amp;mid=site_navigation&amp;lindex=2&amp;lcol=4">Anushka test Upcoming Events</a></li>
                      <li class="master-menu__item">
                        <a href="https://qablue.politico.com/live-events/previous-event" target="_top" tabindex="-1" class="js-tealium-tracking" data-tracking="mpos=na&amp;mid=site_navigation&amp;lindex=3&amp;lcol=4">Previous Event</a></li>
                      <li class="master-menu__item">
                        <a href="https://qablue.politico.com/live-events/about" target="_top" tabindex="-1" class="js-tealium-tracking" data-tracking="mpos=na&amp;mid=site_navigation&amp;lindex=4&amp;lcol=4">About POLITICO Live</a></li>
                    </ul>
                  </div>
                  <div class="col is-menu">
                    <h2 class="menu-toggle js-menu-toggle section-heading" tabindex="-1">COLUMNS &amp; CARTOONS</h2>
                    <ul class="master-menu__list">
                      <li class="master-menu__item">
                        <a href="https://qablue.politico.com/playbook-plus-2" target="_top" tabindex="-1" class="js-tealium-tracking" data-tracking="mpos=na&amp;mid=site_navigation&amp;lindex=5&amp;lcol=4">Playbook Plus </a></li>
                      <li class="master-menu__item">
                        <a href="https://qablue.politico.com/blogs/under-the-radar" target="_top" tabindex="-1" class="js-tealium-tracking" data-tracking="mpos=na&amp;mid=site_navigation&amp;lindex=6&amp;lcol=4">Josh Gerstein</a></li>
                      <li class="master-menu__item">
                        <a href="https://qablue.politico.com/magazine/tag/rich-lowry" target="_top" tabindex="-1" class="js-tealium-tracking" data-tracking="mpos=na&amp;mid=site_navigation&amp;lindex=7&amp;lcol=4">Rich Lowry</a></li>
                      <li class="master-menu__item">
                        <a href="https://qablue.politico.com/magazine/tag/fourth-estate" target="_top" tabindex="-1" class="js-tealium-tracking" data-tracking="mpos=na&amp;mid=site_navigation&amp;lindex=8&amp;lcol=4">Jack Shafer</a></li>
                      <li class="master-menu__item">
                        <a href="https://qablue.politico.com/news/matt-wuerker" target="_top" tabindex="-1" class="js-tealium-tracking" data-tracking="mpos=na&amp;mid=site_navigation&amp;lindex=9&amp;lcol=4">Matt Wuerker</a></li>
                      <li class="master-menu__item">
                        <a href="https://qablue.politico.com/tag/cartoon-carousel" target="_top" tabindex="-1" class="js-tealium-tracking" data-tracking="mpos=na&amp;mid=site_navigation&amp;lindex=10&amp;lcol=4">Cartoon Carousel</a></li>
                    </ul>
                  </div>
                  <div class="col is-menu">
                    <h2 class="menu-toggle js-menu-toggle section-heading" tabindex="-1">EDITIONS</h2>
                    <ul class="master-menu__list">
                      <li class="master-menu__item">
                        <a href="https://www.politico.eu" target="_blank" tabindex="-1" class="js-tealium-tracking" data-tracking="mpos=na&amp;mid=site_navigation&amp;lindex=11&amp;lcol=4">Europe</a></li>
                      <li class="master-menu__item">
                        <a href="https://qablue.politico.com/states/florida" target="_top" tabindex="-1" class="js-tealium-tracking" data-tracking="mpos=na&amp;mid=site_navigation&amp;lindex=12&amp;lcol=4">Florida</a></li>
                      <li class="master-menu__item">
                        <a href="https://qablue.politico.com/states/new-jersey" target="_top" tabindex="-1" class="js-tealium-tracking" data-tracking="mpos=na&amp;mid=site_navigation&amp;lindex=13&amp;lcol=4">New Jersey</a></li>
                      <li class="master-menu__item">
                        <a href="https://qablue.politico.com/states/new-york" target="_top" tabindex="-1" class="js-tealium-tracking" data-tracking="mpos=na&amp;mid=site_navigation&amp;lindex=14&amp;lcol=4">New York</a></li>
                    </ul>
                  </div>
                </div>
                <div class="col is-menu">
                  <div class="col is-menu">
                    <h2 class="menu-toggle js-menu-toggle section-heading" tabindex="-1">POLICY</h2>
                    <ul class="master-menu__list">
                      <li class="master-menu__item">
                        <a href="https://qablue.politico.com/agriculture" target="_top" tabindex="-1" class="js-tealium-tracking" data-tracking="mpos=na&amp;mid=site_navigation&amp;lindex=1&amp;lcol=5">Agriculture</a></li>
                      <li class="master-menu__item">
                        <a href="https://qablue.politico.com/tag/canada-politics-policy" target="_top" tabindex="-1" class="js-tealium-tracking" data-tracking="mpos=na&amp;mid=site_navigation&amp;lindex=2&amp;lcol=5">Canada Politics &amp; Policy</a></li>
                      <li class="master-menu__item">
                        <a href="https://qablue.politico.com/cybersecurity" target="_top" tabindex="-1" class="js-tealium-tracking" data-tracking="mpos=na&amp;mid=site_navigation&amp;lindex=3&amp;lcol=5">Cybersecurity</a></li>
                      <li class="master-menu__item">
                        <a href="https://qablue.politico.com/defense" target="_top" tabindex="-1" class="js-tealium-tracking" data-tracking="mpos=na&amp;mid=site_navigation&amp;lindex=4&amp;lcol=5">Defense</a></li>
                      <li class="master-menu__item">
                        <a href="https://qablue.politico.com/education" target="_top" tabindex="-1" class="js-tealium-tracking" data-tracking="mpos=na&amp;mid=site_navigation&amp;lindex=5&amp;lcol=5">Education</a></li>
                      <li class="master-menu__item">
                        <a href="https://qablue.politico.com/ehealth" target="_top" tabindex="-1" class="js-tealium-tracking" data-tracking="mpos=na&amp;mid=site_navigation&amp;lindex=6&amp;lcol=5">eHealth</a></li>
                      <li class="master-menu__item">
                        <a href="https://qablue.politico.com/news/employment" target="_top" tabindex="-1" class="js-tealium-tracking" data-tracking="mpos=na&amp;mid=site_navigation&amp;lindex=7&amp;lcol=5">Employment &amp; Immigration</a></li>
                      <li class="master-menu__item">
                        <a href="https://qablue.politico.com/energy-and-environment" target="_top" tabindex="-1" class="js-tealium-tracking" data-tracking="mpos=na&amp;mid=site_navigation&amp;lindex=8&amp;lcol=5">Energy &amp; Environment</a></li>
                      <li class="master-menu__item">
                        <a href="https://qablue.politico.com/finance" target="_top" tabindex="-1" class="js-tealium-tracking" data-tracking="mpos=na&amp;mid=site_navigation&amp;lindex=9&amp;lcol=5">Finance &amp; Tax</a></li>
                      <li class="master-menu__item">
                        <a href="https://qablue.politico.com/health-care" target="_top" tabindex="-1" class="js-tealium-tracking" data-tracking="mpos=na&amp;mid=site_navigation&amp;lindex=10&amp;lcol=5">Health Care</a></li>
                      <li class="master-menu__item">
                        <a href="https://qablue.politico.com/technology" target="_top" tabindex="-1" class="js-tealium-tracking" data-tracking="mpos=na&amp;mid=site_navigation&amp;lindex=11&amp;lcol=5">Technology</a></li>
                      <li class="master-menu__item">
                        <a href="https://qablue.politico.com/trade" target="_top" tabindex="-1" class="js-tealium-tracking" data-tracking="mpos=na&amp;mid=site_navigation&amp;lindex=12&amp;lcol=5">Trade</a></li>
                      <li class="master-menu__item">
                        <a href="https://qablue.politico.com/transportation" target="_top" tabindex="-1" class="js-tealium-tracking" data-tracking="mpos=na&amp;mid=site_navigation&amp;lindex=13&amp;lcol=5">Transportation &amp; Infrastructure</a></li>
                    </ul>
                  </div>
                </div>
                <div class="col is-menu">
                  <div class="col is-menu">
                    <h2 class="menu-toggle js-menu-toggle section-heading" tabindex="-1">EDITIONS</h2>
                    <ul class="master-menu__list">
                      <li class="master-menu__item">
                        <a href="https://qablue.politico.com/states/new-york/news/california" target="_top" tabindex="-1" class="js-tealium-tracking" data-tracking="mpos=na&amp;mid=site_navigation&amp;lindex=1&amp;lcol=6">California</a></li>
                    </ul>
                  </div>
                </div>
              </div>
              <footer class="row menu-footer">
                <div class="menu-footer__follow">
                  <h2 class="section-heading">Follow us</h2>
                  <ul class="menu-footer__list menu-footer__list--follow">
                    <li class="menu-footer__item">
                      <a href="https://twitter.com/politico" target="_blank" tabindex="-1" class="js-tealium-tracking" data-tracking="mpos=na&amp;mid=site_navigation&amp;lindex=1&amp;lcol=7">TWITTER</a></li>
                    <li class="menu-footer__item">
                      <a href="https://www.instagram.com/politico/" target="_blank" tabindex="-1" class="js-tealium-tracking" data-tracking="mpos=na&amp;mid=site_navigation&amp;lindex=2&amp;lcol=7">INSTAGRAM</a></li>
                    <li class="menu-footer__item">
                      <a href="https://www.facebook.com/politico/" target="_blank" tabindex="-1" class="js-tealium-tracking" data-tracking="mpos=na&amp;mid=site_navigation&amp;lindex=3&amp;lcol=7">FACEBOOK</a></li>
                  </ul>
                </div>
                <div class="menu-footer__actions">
                  <ul class="menu-footer__list menu-footer__list--actions">
                    <li class="menu-footer__item">
                      <a href="https://qablue.politico.com/settings" target="_top" class="js-tealium-tracking" data-tracking="mpos=na&amp;mid=site_navigation&amp;lindex=1&amp;lcol=8" tabindex="-1">My Account</a></li>
                    <li class="menu-footer__item">
                      <a href="https://qablue.politico.com/_login?base=https%3A%2F%2Fqablue.politico.com%2F&amp;redirect=%2F_login&amp;logout=%2F_logout&amp;lRedirect=true&amp;sRedirect=%2Fsettings&amp;js=false" style="display: none;" class="politico-auth auth-logged-out js-tealium-tracking"
                        target="_top" data-login="https://qablue.politico.com/_login?base=https%3A%2F%2Fqablue.politico.com%2F&amp;redirect=/_login&amp;logout=/_logout&amp;lRedirect=true&amp;sRedirect=/settings" data-tracking="mpos=na&amp;mid=site_navigation&amp;lindex=2&amp;lcol=8"
                        tabindex="-1">Log In</a><a href="https://qablue.politico.com/_logout?base=https%3A%2F%2Fqablue.politico.com%2F&amp;redirect=%2F_logout&amp;js=false" style="" class="politico-auth auth-logged-in js-tealium-tracking" data-logout="https://qablue.politico.com/_logout?base=https%3A%2F%2Fqablue.politico.com%2F&amp;redirect=/_logout"
                        target="_top" data-tracking="mpos=na&amp;mid=site_navigation&amp;lindex=2&amp;lcol=8" tabindex="-1">Log Out</a></li>
                  </ul>
                </div>
              </footer>
            </div>
          </nav>

        </header>
        `}
      </div>
      <main id="main" tabindex="-1">
        <div class="page-content page-content--story story-type--core" data-modules="/spring/cms-api/v1/modules?page=00000178-a90c-d7ef-a37c-fd5da2c50003" data-ad-slot-insertion-interval="2" data-ad-slot-first-insertion="1" data-viewport-ad-slot-id="pol-vp">
${children}
        </div>
      </main>
      ${!showArticle ? '' : `
      <div class="page-footer">
        <footer class="footer">
          <nav class="footer__group footer__group--links" role="contentinfo">
            <ul>
              <li>
                About Us</li>
              <li>
                null</li>
              <li>
                <a href="https://qablue.ops.politico.com/subscribe/breaking-news-alerts" target="_blank" class="js-tealium-tracking" data-tracking="mpos=na&amp;mid=site_footer&amp;lindex=3&amp;lcol=1">Breaking News Alerts</a></li>
              <li>
                <a href="https://qablue.politico.com/employment" target="_top" class="js-tealium-tracking" data-tracking="mpos=na&amp;mid=site_footer&amp;lindex=4&amp;lcol=1">Careers</a></li>
              <li>
                <a href="https://qablue.politico.com/payment" target="_top" class="js-tealium-tracking" data-tracking="mpos=na&amp;mid=site_footer&amp;lindex=5&amp;lcol=1">Credit Card Payments </a></li>
              <li>
                <a href="http://edition.pagesuite-professional.co.uk/Launch.aspx?bypass=true&amp;PBID=74262970-aa07-44b3-80c8-21fa8a8ac376" target="_blank" class="js-tealium-tracking" data-tracking="mpos=na&amp;mid=site_footer&amp;lindex=6&amp;lcol=1">Digital
                  Edition</a></li>
              <li>
                <a href="https://qablue.politico.com/faq" target="_top" class="js-tealium-tracking" data-tracking="mpos=na&amp;mid=site_footer&amp;lindex=7&amp;lcol=1">POLITICO FAQ</a></li>
              <li>
                <a href="https://qablue.politico.com/feedback" target="_top" class="js-tealium-tracking" data-tracking="mpos=na&amp;mid=site_footer&amp;lindex=8&amp;lcol=1">Feedback</a></li>
              <li>
                <a href="https://qablue.politico.com/story14" target="_top" class="js-tealium-tracking" data-tracking="mpos=na&amp;mid=site_footer&amp;lindex=9&amp;lcol=1">Headlines</a></li>
              <li>
                <a href="https://qablue.politico.com/news/photos" target="_top" class="js-tealium-tracking" data-tracking="mpos=na&amp;mid=site_footer&amp;lindex=10&amp;lcol=1">Photos</a></li>
              <li>
                <a href="http://www.powerjobs.com/" target="_blank" class="js-tealium-tracking" data-tracking="mpos=na&amp;mid=site_footer&amp;lindex=11&amp;lcol=1">POWERJobs</a></li>
              <li>
                Press</li>
              <li>
                <a href="https://qablue.politico.com/subscriptions" target="_top" class="js-tealium-tracking" data-tracking="mpos=na&amp;mid=site_footer&amp;lindex=13&amp;lcol=1">Print Subscriptions</a></li>
              <li>
                <a href="https://qablue.politico.com/rss" target="_top" class="js-tealium-tracking" data-tracking="mpos=na&amp;mid=site_footer&amp;lindex=14&amp;lcol=1">RSS</a></li>
              <li>
                <a href="https://qablue.politico.com/sitemap" target="_top" class="js-tealium-tracking" data-tracking="mpos=na&amp;mid=site_footer&amp;lindex=15&amp;lcol=1">Site Map</a></li>
            </ul>

            <ul>
              <li>
                <a href="https://qablue.politico.com/terms-of-service" target="_top" class="js-tealium-tracking" data-tracking="mpos=na&amp;mid=site_footer&amp;lindex=1&amp;lcol=2">Terms of Service</a></li>
              <li>
                <a href="https://qablue.politico.com/privacy" target="_top" class="js-tealium-tracking" data-tracking="mpos=na&amp;mid=site_footer&amp;lindex=2&amp;lcol=2">Privacy Policy</a></li>
            </ul>

          </nav>
          <div class="footer__group footer__group--legal">
            <p class="footer__copyright"> © 2021 POLITICO LLC</p>
          </div>
        </footer>
        `}
  </body>`;
}
