"use strict";var precacheConfig=[["/vov/assets/images/aws.9f669c21.png","9f669c219265599151cf5e97e9b505c3"],["/vov/assets/images/default.391cb92c.svg","391cb92c37f50780858a2a07643f6a03"],["/vov/assets/images/flickr.affdf736.jpg","affdf736f26b72ae8bcba59c55d21b8b"],["/vov/assets/images/imgur.d02be702.jpg","d02be7023d9d56a604bc2b8f738b3e3c"],["/vov/assets/images/tencent.0bd90e97.jpg","0bd90e97b5e6db764d2641afa78739ac"],["/vov/assets/images/upyun.197b2fcc.jpg","197b2fcc9aaa3c0e0effc377440d7d8d"],["/vov/client.2ae36fa8.js","cc6d9bf0a490c2cf3ba7e4bdae480c48"],["/vov/client.2ae36fa8.js.map","d3d50e0844c7a5a98100022a643ca771"],["/vov/client.f61bcfc6.css","9073b48790e7d7bee7ed2ac42ea3f9a7"],["/vov/client.f61bcfc6.css.map","581243644371760ad75419a06eb2b03e"],["/vov/index.html","895a5797a0b6c2b5d98a8009469d868e"],["/vov/manifest.28581e46.js","c20c15357e2f3a21d42eb0ebc66c0f08"],["/vov/manifest.28581e46.js.map","dde412469651fcd122beda27453ec4d8"],["/vov/vendor.3b918fd2.css","51166f7e0643b7ba695cc3ebf05c84cf"],["/vov/vendor.3b918fd2.css.map","9f9fe09ec59f6d370b79310f33f28bc3"],["/vov/vendor.4dee59e6.js","04ee8ba601325a7df16a5123095319b1"]],cacheName="sw-precache-v3-vov-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,t){var n=new URL(e);return"/"===n.pathname.slice(-1)&&(n.pathname+=t),n.toString()},cleanResponse=function(e){return e.redirected?("body"in e?Promise.resolve(e.body):e.blob()).then(function(t){return new Response(t,{headers:e.headers,status:e.status,statusText:e.statusText})}):Promise.resolve(e)},createCacheKey=function(e,t,n,a){var r=new URL(e);return a&&r.pathname.match(a)||(r.search+=(r.search?"&":"")+encodeURIComponent(t)+"="+encodeURIComponent(n)),r.toString()},isPathWhitelisted=function(e,t){if(0===e.length)return!0;var n=new URL(t).pathname;return e.some(function(e){return n.match(e)})},stripIgnoredUrlParameters=function(e,t){var n=new URL(e);return n.hash="",n.search=n.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(e){return t.every(function(t){return!t.test(e[0])})}).map(function(e){return e.join("=")}).join("&"),n.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var t=e[0],n=e[1],a=new URL(t,self.location),r=createCacheKey(a,hashParamName,n,!1);return[a.toString(),r]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(e){return setOfCachedUrls(e).then(function(t){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(n){if(!t.has(n)){var a=new Request(n,{credentials:"same-origin"});return fetch(a).then(function(t){if(!t.ok)throw new Error("Request for "+n+" returned a response with status "+t.status);return cleanResponse(t).then(function(t){return e.put(n,t)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var t=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(e){return e.keys().then(function(n){return Promise.all(n.map(function(n){if(!t.has(n.url))return e.delete(n)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(e){if("GET"===e.request.method){var t,n=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching);(t=urlsToCacheKeys.has(n))||(n=addDirectoryIndex(n,"index.html"),t=urlsToCacheKeys.has(n));0,t&&e.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(n)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(t){return console.warn('Couldn\'t serve response for "%s" from cache: %O',e.request.url,t),fetch(e.request)}))}});