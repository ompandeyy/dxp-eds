To adapt the JS file to manipulate the DOM and prepare the HTML structure as provided, we need to ensure that the new JS follows the conventions and standards of EDS (Enterprise Design System) and AEM (Adobe Experience Manager).

Here's the adapted JS file:

```javascript
import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

// Media query match that indicates desktop width
const isDesktop = window.matchMedia('(min-width: 900px)');

function closeOnEscape(e) {
  if (e.code === 'Escape') {
    const nav = document.getElementById('nav');
    const navSections = nav.querySelector('.nav-sections');
    const navSectionExpanded = navSections.querySelector('[aria-expanded="true"]');
    if (navSectionExpanded && isDesktop.matches) {
      toggleAllNavSections(navSections);
      navSectionExpanded.focus();
    } else if (!isDesktop.matches) {
      toggleMenu(nav, navSections);
      nav.querySelector('button').focus();
    }
  }
}

function closeOnFocusLost(e) {
  const nav = e.currentTarget;
  if (!nav.contains(e.relatedTarget)) {
    const navSections = nav.querySelector('.nav-sections');
    const navSectionExpanded = navSections.querySelector('[aria-expanded="true"]');
    if (navSectionExpanded && isDesktop.matches) {
      toggleAllNavSections(navSections, false);
    } else if (!isDesktop.matches) {
      toggleMenu(nav, navSections, false);
    }
  }
}

function openOnKeydown(e) {
  const focused = document.activeElement;
  const isNavDrop = focused.className === 'nav-drop';
  if (isNavDrop && (e.code === 'Enter' || e.code === 'Space')) {
    const dropExpanded = focused.getAttribute('aria-expanded') === 'true';
    toggleAllNavSections(focused.closest('.nav-sections'));
    focused.setAttribute('aria-expanded', dropExpanded ? 'false' : 'true');
  }
}

function focusNavSection() {
  document.activeElement.addEventListener('keydown', openOnKeydown);
}

function toggleAllNavSections(sections, expanded = false) {
  sections.querySelectorAll('.nav-sections .default-content-wrapper > ul > li').forEach((section) => {
    section.setAttribute('aria-expanded', expanded);
  });
}

function toggleMenu(nav, navSections, forceExpanded = null) {
  const expanded = forceExpanded !== null ? !forceExpanded : nav.getAttribute('aria-expanded') === 'true';
  const button = nav.querySelector('.nav-hamburger button');
  document.body.style.overflowY = (expanded || isDesktop.matches) ? '' : 'hidden';
  nav.setAttribute('aria-expanded', expanded ? 'false' : 'true');
  toggleAllNavSections(navSections, expanded || isDesktop.matches ? 'false' : 'true');
  button.setAttribute('aria-label', expanded ? 'Open navigation' : 'Close navigation');

  const navDrops = navSections.querySelectorAll('.nav-drop');
  if (isDesktop.matches) {
    navDrops.forEach((drop) => {
      if (!drop.hasAttribute('tabindex')) {
        drop.setAttribute('tabindex', 0);
        drop.addEventListener('focus', focusNavSection);
      }
    });
  } else {
    navDrops.forEach((drop) => {
      drop.removeAttribute('tabindex');
      drop.removeEventListener('focus', focusNavSection);
    });
  }

  if (!expanded || isDesktop.matches) {
    window.addEventListener('keydown', closeOnEscape);
    nav.addEventListener('focusout', closeOnFocusLost);
  } else {
    window.removeEventListener('keydown', closeOnEscape);
    nav.removeEventListener('focusout', closeOnFocusLost);
  }
}

function decorateTools(nav) {
  const navTools = nav.querySelector('.nav-tools');
  if (navTools) {
    const searchItem = navTools.querySelector('li:has(a[href*="suche"], a[href*="search"])');
    if (searchItem) {
      searchItem.classList.add('nav-search');
      const searchLink = searchItem.querySelector('a');
      if (searchLink) {
        searchLink.innerHTML = `<span class="search-icon">🔍</span> ${searchLink.textContent}`;
      }
    }

    const langItems = navTools.querySelectorAll('li:has(a[href*="EN"], a[href*="DE"])');
    langItems.forEach((item) => {
      item.classList.add('nav-lang');
    });

    const countryItem = navTools.querySelector('li:has(a[href*="deutschland"], a[href*="germany"])');
    if (countryItem) {
      countryItem.classList.add('nav-country');
    }
  }
}

function createNavigationMenu() {
  const nav = document.createElement('nav');
  nav.id = 'nav';
  nav.innerHTML = `
    <div class="c-navigation js--flyout-keyboardtrap" data-navigation-type="static" data-navigation-show-stick-after="0px">
      <nav class="c-navigation--bar c-navigation--bar--main" role="navigation" aria-label="Dienstprogramm">
        <div class="c-navigation--bar--wrapper component-wide l-grid--between-s l-grid--middle-s">
          <div class="c-navigation-logo-wrapper">
            <a href="/de-de/home.html" target="_self" title="DHL Homepage" class="c-navigation-logo">
              <img src="/content/dam/dhl/global/core/images/logos/dhl-logo.svg" alt="DHL Homepage">
            </a>
          </div>
          <ul class="c-navigation--menu c-navigation-menu--language-list-container">
            <li data-on-search-hide="false" class="c-nav-primary--globalnewsflash js--nav-primary--globalnewsflash not-visible">
              <a class="c-navigation-menu--meta-link link has-icon icon-exception" href="/global-en/global-news-alerts.html" target="_self" aria-label="Warnmeldungen" rel="noopener noreferrer">
                <span class="c-navigation-menu--icon has-icon icon-exception sr-hidden" aria-hidden="true" tabindex="-1"></span>
                <span>Warnmeldungen</span>
              </a>
            </li>
            <li>
              <form action="/de-de/home/suche.html" method="GET" class="c-navigation-search--form js--navigation-search--form" data-open="false" data-show-label="" id="nav-search-static_a8bb08ea-a345-4b38-b35f-94ca8f479525" role="search">
                <label for="nav-search-static--input_a8bb08ea-a345-4b38-b35f-94ca8f479525" class="c-navigation-search--input-label has-icon" tabindex="0" role="button">
                  <span class="c-navigation-menu--icon has-icon icon-search sr-hidden" aria-hidden="true" tabindex="-1"></span>
                  <span class="c-navigation-search--input-label-text">Suche</span>
                </label>
                <div class="c-navigation-search--input-container">
                  <em class="c-navigation-search--icon icon-search" aria-hidden="true" tabindex="-1"></em>
                  <input class="c-navigation-search--input js--navigation-search--input" id="nav-search-static--input_a8bb08ea-a345-4b38-b35f-94ca8f479525" autocomplete="off" max-num-list="5" type="search" placeholder="dhl.com durchsuchen" name="q" data-target="#nav-search-static_a8bb08ea-a345-4b38-b35f-94ca8f479525" tabindex="0" role="combobox" aria-autocomplete="list" aria-controls="search-quick-list_a8bb08ea-a345-4b38-b35f-94ca8f479525" aria-expanded="false">
                  <span class="c-navigation-search--close icon-cancel js--navigation-search--close" data-target="#nav-search-static_a8bb08ea-a345-4b38-b35f-94ca8f479525" role="button" tabindex="0" aria-label="Suchleiste schließen" aria-expanded="true" aria-controls="search-quick-list_a8bb08ea-a345-4b38-b35f-94ca8f479525"></span>
                </div>
                <div class="c-navigation-search--quicklinks js--navigation-search--quicklinks">
                  <ul class="shadow-small" id="search-quick-list_a8bb08ea-a345-4b38-b35f-94ca8f479525"></ul>
                </div>
              </form>
            </li>
            <li>
              <a class="c-navigation-menu--meta-link link has-icon icon-globe" href="/de-de/home/standortauswahl.html" title="Standort auswählen">
                <span class="c-navigation-menu--icon has-icon icon-globe sr-hidden" aria-hidden="true" tabindex="-1"></span>
                <span>Deutschland</span>
              </a>
            </li>
            <li class="c-navigation-menu--language-list">
              <a class="c-navigation-menu--meta-link link has-icon js--nav-lang" href="/de-en/home/get-a-quote.html" data-selected="false" target="_self" aria-label="Sprache wechseln zu: English" aria-hidden="false" tabindex="0" rel="">
                EN
              </a>
            </li>
            <li class="c-navigation-menu--language-list">
              <span class="c-navigation-menu--meta-link is-selected sr-hidden" data-selected="true" aria-label="Deutsch" aria-hidden="true" tabindex="-1" rel="">
                DE
              </span>
            </li>
          </ul>
          <button class="c-navigation-mobile-menu--button js--close-trap-prefer" aria-controls="static_menu_b6b46e2f-8378-48c8-aa15-7109e64fc557" aria-label="Hauptmenü" aria-expanded="false">
            <div class="c-navigation-mobile-menu--bar" aria-hidden="true"></div>
            <div class="c-navigation-mobile-menu--bar" aria-hidden="true"></div>
            <div class="c-navigation-mobile-menu--bar" aria-hidden="true"></div>
          </button>
        </div>
        <div class="c-navigation-mobile-menu" id="static_menu_b6b46e2f-8378-48c8-aa15-7109e64fc557">
          <ul class="c-navigation--menu c-navigation-mobile-menu" role="list" data-scrollable="" data-scroll-menu="">
            <li>
              <div class="c-navigation-flyout">
                <a class="c-navigation-menu--link link has-icon" href="/de-de/home/sendungsverfolgung.html" data-analytics='{"trackedInteractions":"basic","interactionType":"dhl_utf_contentInteraction","content":{"name":"Track","type":"Link","interaction":"Click","position":"","context":"","attributes":{"component":"dhl/components/navigation/primaryxf","topic":"primary navigation"}}}' data-selected="false">
                  <span class="sr-hidden" aria-hidden="true" tabindex="-1"></span>
                  <span>Sendungsverfolgung</span>
                  <span class="c-navigation-menu--decorator has-icon sr-hidden" aria-hidden="true" tabindex="-1"></span>
                </a>
              </div>
            </li>
            <li>
              <div id="c-navigation-flyout-id-flyout_c5fa340b-90a7-4713-9c8b-fa3b7746ad7f" class="c-navigation-flyout js--navigation-flyout js--auto-close-on-tab-out js--auto-close-desktop" data-flyout-selected="false" data-flyout-open-by-default="false">
                <button class="c-navigation-menu--button js--close-trap has-icon" aria-expanded="false" data-flyout-target="#c-navigation-flyout-id-flyout_c5fa340b-90a7-4713-9c8b-fa3b7746ad7f" aria-controls="c-navigation-flyout-id-flyout_c5fa340b-90a7-4713-9c8b-fa3b7746ad7f-aria" data-analytics='{"trackedInteractions":"basic","interactionType":"dhl_utf_contentInteraction","content":{"name":"Ship","type":"Button","interaction":"Click","position":"","context":"","attributes":{"component":"dhl/components/navigation/primaryxf","topic":"primary navigation"}}}'>
                  <span>Versand</span>
                </button>
                <div class="c-navigation-flyout-container" tabindex="-1" aria-hidden="true" data-flyout-container="" id="c-navigation-flyout-id-flyout_c5fa340b-90a7-4713-9c8b-fa3b7746ad7f-aria">
                  <div class="c-navigation-flyout-content" data-flyout-size="full" data-flyout-content="">
                    <div>
                      <div class="xf-content-height">
                        <div class="aem-Grid aem-Grid--12 aem-Grid--default--12">
                          <div class="container aem-GridColumn aem-GridColumn--default--12">
                            <span class="link-anchor" id="root_container_copy"></span>
                            <div id="container-6f89cbd047" class="cmp-container cmp-container--white cmp-container--gutter-21 cmp-container--padding-size-14 cmp-container--left-on-top">
                              <div class="aem-Grid aem-Grid--12 aem-Grid--tablet--12 aem-Grid--default--12">
                                <div class="list bullet-type-none top-margin aem-GridColumn--tablet--12 aem-GridColumn--offset--tablet--0 aem-GridColumn--tablet--none aem-GridColumn aem-GridColumn--default--12">
                                  <span class="link-anchor" id="root_container_copy_list"></span>
                                  <ul id="list-a1efc1d1d5" class="cmp-list">
                                    <li class="cmp-list__item">
                                      <a class="cmp-list__item-link cmp-list__item-link--internal" href="/de-de/home/fordern-sie-ein-angebot-an.html" data-analytics='{"trackedInteractions":"basic","interactionType":"dhl_utf_contentInteraction","content":{"name":"Get a Quote","type":"Link","interaction":"Click","position":"","context":"Document and Package","attributes":{"component":"dhl/components/core/list","topic":"ship mobile flyout"}}}' aria-describedby=" ">
                                        <span class="cmp-list__item-title">Fordere ein Angebot an</span>
                                        <span class="cmp-list__item-decorator" aria-hidden="true" tabindex="-1"></span>
                                      </a>
                                    </li>
                                    <li class="cmp-list__item">
                                      <a class="cmp-list__item-link cmp-list__item-link--internal" href="/de-de/home/online-buchen.html" data-analytics='{"trackedInteractions":"basic","interactionType":"dhl_utf_contentInteraction","content":{"name":"Ship Now","type":"Link","interaction":"Click","position":"","context":"Document and Package","attributes":{"component":"dhl/components/core/list","topic":"ship mobile flyout"}}}' aria-describedby=" ">
                                        <span class="cmp-list__item-title">Jetzt verschicken</span>
                                        <span class="cmp-list__item-decorator" aria-hidden="true" tabindex="-1"></span>
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                                <div class="title title-margin-bottom title-margin-top aem-GridColumn--tablet--12 aem-GridColumn--offset--tablet--0 aem-GridColumn--tablet--none aem-GridColumn aem-GridColumn--default--12">
                                  <span class="link-anchor" id="root_container_copy_title"></span>
                                  <div class="cmp-title" id="title-4c8811958b">
                                    <h2 class="cmp-title__text cmp-title__text--level5">Dokument und Paket</h2>
                                  </div>
                                </div>
                                <div class="separator separator-color-gray aem-GridColumn aem-GridColumn--default--12">
                                  <span class="link-anchor" id="root_container_copy_separator"></span>
                                  <div class="cmp-separator" id="separator-49bfc79858">
                                    <hr class="cmp-separator__horizontal-rule" aria-hidden="true" role="none">
                                  </div>
                                </div>
                                <div class="list bullet-type-none top-margin aem-GridColumn--tablet--12 aem-GridColumn--offset--tablet--0 aem-GridColumn--tablet--none aem-GridColumn aem-GridColumn--default--12">
                                  <span class="link-anchor" id="root_container_copy_list_copy"></span>
                                  <ul id="list-8708b5afa7" class="cmp-list">
                                    <li class="cmp-list__item">
                                      <a class="cmp-list__item-link cmp-list__item-link--internal" href="/de-de/home/versand/paket-und-dokumentenversand.html" data-analytics='{"trackedInteractions":"basic","interactionType":"dhl_utf_contentInteraction","content":{"name":"Document and parcel shipping","type":"Link","interaction":"Click","position":"","context":"Document and Package","attributes":{"component":"dhl/components/core/list","topic":"ship mobile flyout"}}}' aria-describedby=" ">
                                        <span class="cmp-list__item-title">Dokumenten- und Paketversand</span>
                                        <span class="cmp-list__item-decorator" aria-hidden="true" tabindex="-1"></span>
                                      </a>
                                    </li>
                                    <li class="cmp-list__item">
                                      <a class="cmp-list__item-link cmp-list__item-link--internal" href="/de-de/home/versand/optionen-fur-einzelhandler-und-massenversender.html" data-analytics='{"trackedInteractions":"basic","interactionType":"dhl_utf_contentInteraction","content":{"name":"Volume shipping (Business Only)","type":"Link","interaction":"Click","position":"","context":"Document and Package","attributes":{"component":"dhl/components/core/list","topic":"ship mobile flyout"}}}' aria-describedby=" ">
                                        <span class="cmp-list__item-title">Volumenversand (nur Geschäftskunden)</span>
                                        <span class="cmp-list__item-decorator" aria-hidden="true" tabindex="-1"></span>
                                      </a>
                                    </li>
                                    <li class="cmp-list__item">
                                      <a class="cmp-list__item-link cmp-list__item-link--external" href="/de-de/home/versand/postversand-fur-geschaftskunden.html" data-analytics='{"trackedInteractions":"basic","interactionType":"dhl_utf_contentInteraction","content":{"name":"Direct mail for business","
