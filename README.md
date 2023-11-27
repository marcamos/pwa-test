# pwa-test

## My guide(s)
* https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps

## Good to know
* [Install on app store](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Making_PWAs_installable#installation_from_an_app_store) and [PWA Builder](https://docs.pwabuilder.com/#/builder/quick-start)
* Manifest `<link>` must be referenced on every page
* [Control the installation prompt experience](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Making_PWAs_installable#triggering_the_install_prompt)
* [Offline/background magic](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Offline_and_background_operation)
* Service worker install time is not the same as PWA install time. A service worker's `install` event fires as soon as the service worker has been downloaded and executes, which will typically happen as soon as the user visits your site. *Even if the user never installs your site as a PWA, its service worker will be installed and activated.*
* Once the PWA is installed on the user's machine, the only way to inform the browser that there are updated files to be retrieved is for there to be a change in the service worker. If a change is made to any other PWA resource — if the HTML is updated, a bug is fixed in the CSS, a function is added to app.js, an image is compressed to reduce the file save, etc. — the service worker of your installed PWA will not know it needs to download updated resources. Only when the service worker is altered in any way, will the PWA know it may be time to update the cache; which is the service worker's task to initiate. While changing any character may technically suffice, a PWA best practice is to create a version number constant that gets updated sequentially to indicate an update to the file. Updating a version number (or date), provides an official edit to the service worker even if nothing else is changed in the service worker itself and provides developers with a way of identifying app versions.
* [Storage quotas and eviction criteria](https://developer.mozilla.org/en-US/docs/Web/API/Storage_API/Storage_quotas_and_eviction_criteria)
* [App icon badges](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/How_to/Display_badge_on_app_icon)
* [PWA image generator](https://www.pwabuilder.com/imageGenerator)