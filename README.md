# pwa-test

## My guide(s)
* https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps

## Good to know
* [Install on app store](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Making_PWAs_installable#installation_from_an_app_store) and [PWA Builder](https://docs.pwabuilder.com/#/builder/quick-start)
* Manifest `<link>` must be referenced on every page
* [Control the installation prompt experience](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Making_PWAs_installable#triggering_the_install_prompt)
* [Offline/background magic](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Offline_and_background_operation)
* Service worker install time is not the same as PWA install time. A service worker's `install` event fires as soon as the service worker has been downloaded and executes, which will typically happen as soon as the user visits your site. *Even if the user never installs your site as a PWA, its service worker will be installed and activated.*
* [Storage quotas and eviction criteria](https://developer.mozilla.org/en-US/docs/Web/API/Storage_API/Storage_quotas_and_eviction_criteria)
* [App icon badges](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/How_to/Display_badge_on_app_icon)
* [PWA image generator](https://www.pwabuilder.com/imageGenerator)