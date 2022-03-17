/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["README.md","e3be75ae2ae6f4ee29b2171474a65f7e"],["about.html","99bb825fce3f692625a7de9945ecf7c5"],["audio/demo/loop pfs/ambience.logicx/Alternatives/000/DisplayState.plist","121006cc05dd76e488122f746bd27224"],["audio/demo/loop pfs/ambience.logicx/Alternatives/000/MetaData.plist","eb5e96233fa0b73227cd694ddbef35c8"],["audio/demo/loop pfs/ambience.logicx/Alternatives/000/Project File Backups/00/MetaData.plist","b56b63dc46740d45aaee0b42bef529d1"],["audio/demo/loop pfs/ambience.logicx/Alternatives/000/Project File Backups/01/MetaData.plist","b56b63dc46740d45aaee0b42bef529d1"],["audio/demo/loop pfs/ambience.logicx/Alternatives/000/Project File Backups/02/MetaData.plist","b56b63dc46740d45aaee0b42bef529d1"],["audio/demo/loop pfs/ambience.logicx/Alternatives/000/Project File Backups/03/MetaData.plist","d0e635a4925d9b3f3f1052a60207e008"],["audio/demo/loop pfs/ambience.logicx/Alternatives/000/Project File Backups/04/MetaData.plist","d0e635a4925d9b3f3f1052a60207e008"],["audio/demo/loop pfs/ambience.logicx/Alternatives/000/Project File Backups/05/MetaData.plist","680597b4e69a64c00368d0e0d93f302a"],["audio/demo/loop pfs/ambience.logicx/Alternatives/000/Project File Backups/06/MetaData.plist","6ae25a410321571f815a078e24fc9851"],["audio/demo/loop pfs/ambience.logicx/Alternatives/000/Project File Backups/07/MetaData.plist","6ae25a410321571f815a078e24fc9851"],["audio/demo/loop pfs/ambience.logicx/Alternatives/000/Project File Backups/08/MetaData.plist","6ae25a410321571f815a078e24fc9851"],["audio/demo/loop pfs/ambience.logicx/Alternatives/000/Project File Backups/09/MetaData.plist","6ae25a410321571f815a078e24fc9851"],["audio/demo/loop pfs/ambience.logicx/Alternatives/000/WindowImage.jpg","63d621aa3b7ee1ce37c19ecf0d3cf892"],["audio/demo/loop pfs/ambience.logicx/Resources/ProjectInformation.plist","e221ff4e2900cc6beae88ed1276edbf6"],["audio/demo/loop pfs/loop_town(outside).logicx/Alternatives/000/DisplayState.plist","d061e2eaee21d8fe8af9503cc343b645"],["audio/demo/loop pfs/loop_town(outside).logicx/Alternatives/000/MetaData.plist","63ad16ab6b340173cd98f4ff0cb2cd5c"],["audio/demo/loop pfs/loop_town(outside).logicx/Alternatives/000/Project File Backups/00/MetaData.plist","63ad16ab6b340173cd98f4ff0cb2cd5c"],["audio/demo/loop pfs/loop_town(outside).logicx/Alternatives/000/Project File Backups/01/MetaData.plist","e777aee20a9617ee01e555345ea6ac57"],["audio/demo/loop pfs/loop_town(outside).logicx/Alternatives/000/Project File Backups/02/MetaData.plist","0ea4a451740e9d5904228358f87ea490"],["audio/demo/loop pfs/loop_town(outside).logicx/Alternatives/000/Project File Backups/03/MetaData.plist","ba67b94b343f63aa2ddb7cb649e0a8cb"],["audio/demo/loop pfs/loop_town(outside).logicx/Alternatives/000/Project File Backups/04/MetaData.plist","63ad16ab6b340173cd98f4ff0cb2cd5c"],["audio/demo/loop pfs/loop_town(outside).logicx/Alternatives/000/Project File Backups/05/MetaData.plist","63ad16ab6b340173cd98f4ff0cb2cd5c"],["audio/demo/loop pfs/loop_town(outside).logicx/Alternatives/000/Project File Backups/06/MetaData.plist","63ad16ab6b340173cd98f4ff0cb2cd5c"],["audio/demo/loop pfs/loop_town(outside).logicx/Alternatives/000/Project File Backups/07/MetaData.plist","63ad16ab6b340173cd98f4ff0cb2cd5c"],["audio/demo/loop pfs/loop_town(outside).logicx/Alternatives/000/Project File Backups/08/MetaData.plist","63ad16ab6b340173cd98f4ff0cb2cd5c"],["audio/demo/loop pfs/loop_town(outside).logicx/Alternatives/000/Project File Backups/09/MetaData.plist","63ad16ab6b340173cd98f4ff0cb2cd5c"],["audio/demo/loop pfs/loop_town(outside).logicx/Alternatives/000/WindowImage.jpg","2c1a15aaca57f95c30bc203d27dc1731"],["audio/demo/loop pfs/loop_town(outside).logicx/Resources/ProjectInformation.plist","6c60fa5379af7b8265986e4019830a55"],["audio/demo/music/loop_soft_piano.ogg","4c17d7fd3756de2a2399418fff3fcf54"],["audio/demo/music/loop_town_outside.ogg","259bef475dbfd3c1f3a9e333b8e7585c"],["blog.html","a79cd405cabba887a98dac023acecc4e"],["css/dice_animation.css","cde0563886d2630e93674ba7a3f60d26"],["css/main.css","05626444c5d31d24877ec7f770fe525e"],["css/print.css","c18c25d5a9570bf8b35d37b89a129dd9"],["database.html","22923b99be8cbda76e69daad17720d19"],["dice.html","fe8063c57fd55ab099266df9faedbdd9"],["fonts/Raleway/OFL.txt","7a36082ad889d5cafbe77a63a5ebb75f"],["fonts/Raleway/README.txt","79a57b0c26f6ded4733f727c61fb2c5e"],["fonts/Raleway/Raleway-Italic-VariableFont_wght.ttf","6568fb2d4cb1248c290988d377dce62a"],["fonts/Raleway/Raleway-VariableFont_wght.ttf","e2c3271576c410d8b097ed9809cb6539"],["fonts/Raleway/static/Raleway-Black.ttf","38b405eba92acbb5aef45d8152f2a736"],["fonts/Raleway/static/Raleway-BlackItalic.ttf","82163a0f87990e4f9d9ec2b7893e796a"],["fonts/Raleway/static/Raleway-Bold.ttf","7802d8b27fcb19893ce6b38c0789268e"],["fonts/Raleway/static/Raleway-BoldItalic.ttf","2c6f0ac361f6a86d7e8d74f3d6737380"],["fonts/Raleway/static/Raleway-ExtraBold.ttf","c9503ab0f939e9d37fcfb59b25acf8b3"],["fonts/Raleway/static/Raleway-ExtraBoldItalic.ttf","db1ef2f98145c0429dbc90c817a3cfdf"],["fonts/Raleway/static/Raleway-ExtraLight.ttf","3d22c4cbf0bbf560dbc16342b6bdccd4"],["fonts/Raleway/static/Raleway-ExtraLightItalic.ttf","005cfa6da2e318c6e260b9a4118f4be4"],["fonts/Raleway/static/Raleway-Italic.ttf","f73026bcd64e5a5265ab616e5083cd48"],["fonts/Raleway/static/Raleway-Light.ttf","6c084270ccdeb72fd9f5a5144cea628f"],["fonts/Raleway/static/Raleway-LightItalic.ttf","78efd1da53f2af86712d955dd36af0a7"],["fonts/Raleway/static/Raleway-Medium.ttf","2ec8557460d3a2cd7340b16ac84fce32"],["fonts/Raleway/static/Raleway-MediumItalic.ttf","a55ff2cd6e2cffc65817240e14da6813"],["fonts/Raleway/static/Raleway-Regular.ttf","75b4247fdd3b97d0e3b8e07b115673c2"],["fonts/Raleway/static/Raleway-SemiBold.ttf","8a192102b50118c45033e53ce897f103"],["fonts/Raleway/static/Raleway-SemiBoldItalic.ttf","2ed1e9696712eac2b9ec02ada1045fcb"],["fonts/Raleway/static/Raleway-Thin.ttf","07ac22f3d71e66a0799703116b533ac5"],["fonts/Raleway/static/Raleway-ThinItalic.ttf","8fe060be26aca99ed4c879d41c3a8b6d"],["gfx/mockup/Adobe After Effects Auto-Save/dnd-music-mockup auto-save 1.aep","924127341a03add11ae8cf89b4d6941a"],["gfx/mockup/Adobe After Effects Auto-Save/dnd-music-mockup auto-save 2.aep","a3ec8a2ebdbba65424a69467539affcf"],["gfx/mockup/Adobe After Effects Auto-Save/dnd-music-mockup auto-save 3.aep","fb282ef020b9a1e013302d2973c7118a"],["gfx/mockup/Adobe After Effects Auto-Save/dnd-music-mockup auto-save 4.aep","50b8faaa8a4ae811cdbcdab74d6a7f43"],["gfx/mockup/dnd-music-mockup.aep","38da1e317eb19d45a454be61e9ba4b07"],["img/6852408_0.jpeg","b7e01edd5f7fd792fb9dda3f106f6259"],["img/Digital-Patreon-Logo_Black.png","f25136604124f53ff0d01e40319a16d4"],["img/Digital-Patreon-Logo_Black_00000.png","5fba2018de3f5fbe578c2679dcfe139e"],["img/ambience/anvil-svgrepo-com.svg","1dfbb733db230bff8699b54d144fdc1d"],["img/ambience/bat-svgrepo-com.svg","caf88b23871e77714a735fafdafa3cf0"],["img/ambience/beach-svgrepo-com.svg","6d90269b703309d6b490876f7039168b"],["img/ambience/bear-svgrepo-com.svg","6baeac8ae646e8f2956716dc913981ba"],["img/ambience/boat-with-sails-svgrepo-com.svg","4a4b18b8f8c4039b092e463cc9505984"],["img/ambience/bonfire-svgrepo-com.svg","fbb2e0063a4f31791ef0d2e4bcbbf33a"],["img/ambience/campfire-svgrepo-com.svg","bcc991297c8560d3dc593cc429c67386"],["img/ambience/cave-svgrepo-com.svg","dd1000fd7aee859f9ede8cb74f8e3060"],["img/ambience/crystal-mineral-svgrepo-com.svg","fdef58ac9888201bb65598d40fba130f"],["img/ambience/dancing-black-horse-with-one-lift-foot-svgrepo-com.svg","9ac15546a8454b258843a28150105aff"],["img/ambience/dragon-svgrepo-com.svg","773e4e6311a8853ce1b3a6bb487f7578"],["img/ambience/forest-svgrepo-com.svg","56e2327010851aea9df930768f4a7ace"],["img/ambience/house-svgrepo-com.svg","23a95014dacac2c3a9781ad284d98c1d"],["img/ambience/icicle-svgrepo-com.svg","6ce606c31496f0e0b8a8a9778289b576"],["img/ambience/mode-standard-dragon-svgrepo-com.svg","b5325e6581a8d9d85933e1180c787af7"],["img/ambience/monster-grasp-svgrepo-com.svg","efc0bed75123e374ce8ce4ed07add95e"],["img/ambience/moon-svgrepo-com.svg","a542b766b732b01b13897d37de8b7afb"],["img/ambience/night-svgrepo-com.svg","f721daff784c007744e52fec608fd298"],["img/ambience/night-svgrepo-com_1.svg","e22a5bf99cd8a93b5f6dea19ba1cf296"],["img/ambience/people-audience-svgrepo-com.svg","b65d66a4d1896a3007a9a4ff4c16832a"],["img/ambience/rain-svgrepo-com.svg","13f63aad6e6c3a0308572c7849350ce1"],["img/ambience/rat-svgrepo-com.svg","bfc2a7bfe9cdc20c656e6645ba86b944"],["img/ambience/river-svgrepo-com.svg","adf7b7b3d1164738d94bf7316e8fe403"],["img/ambience/sea-dragon-svgrepo-com.svg","48bdb7b5abf49f9665cd17250cb09b9b"],["img/ambience/snake-svgrepo-com.svg","7dfec92e9da03718f5163b8a758cfb45"],["img/ambience/sun-svgrepo.svg","b21b7b1fd63cf3f6a3fb8d42e4968b8d"],["img/ambience/tavern-sign-svgrepo-com.svg","9bebf02a6f9590a4ccbca4b6b84a675c"],["img/ambience/walking-dragon-legend-myth-folklore-svgrepo-com.svg","c57bde7f8a14a81d53b5719f3de1f7de"],["img/ambience/water-svgrepo-com.svg","80bab643c0434b216582231b5917b6ad"],["img/ambience/waterfall-svgrepo-com.svg","4b6223b41f84be03de705eaa628a9369"],["img/ambience/wolf-svgrepo-com.svg","7cfb3b662865d169f4eb0891fe985b8c"],["img/audio-spectrum-svgrepo-com.svg","7c38b71e1c19ccba9dea52c49a5457c0"],["img/dice/d10.png","68072c19e46a7aec2281f02ed4812a26"],["img/dice/d12.png","58d8bd8ff4070242689f49698a700e24"],["img/dice/d20.png","5e6c5e23a7bdd4a6e2dccddb26ee93c8"],["img/dice/d4.png","13d6ac233b47276ecfaff84fedb0d5fc"],["img/dice/d6.png","249584814f32b1313e9b744779d9db4e"],["img/dice/d8.png","8b997db67684b535167541fa1ac88bee"],["img/dice/noun_D20_2453700.svg","f0f92660a07903fe9ae8b820b64bf16b"],["img/dice/noun_d10_2453698.svg","1213a866c6e190efe7979d996715770d"],["img/dice/noun_d12_2453697.svg","32703dfab7cec1ce1bf0074eb9d95cc1"],["img/dice/noun_d4_2453696.svg","b5dc4bb83ca9714b4d1b9631be4559e7"],["img/dice/noun_d6_2453695.svg","34221a85dccb8696aec13fc96ff3d937"],["img/dice/noun_d8_2453699.svg","1cb893066152641d01dae3aefbc207f9"],["img/history-svgrepo-com.svg","32c8920fdcbf45f5b5b8f5d3a28cf9bb"],["img/iconmonstr-media-control-48.svg","8c02d04626606e141817e27cb5abf070"],["img/iconmonstr-media-control-49.svg","9a07c2631020b3792305674257ab81d0"],["img/iconmonstr-paypal-5.svg","0158b583f2d7ac612c4cb343805701cc"],["img/iconmonstr-spotify-4-240.png","e04f8f78528aa7eb7a684fe419ca8312"],["img/iconmonstr-twitter-4-240.png","313dcc58c2d7bc9429c9cc13db3d1720"],["img/iconmonstr-youtube-9-240.png","321bb80488bf93277f7d75918b49cf41"],["img/music/castle-svgrepo-com.svg","730b22ad63e9832414f3df6ec3448623"],["img/music/leaves-svgrepo-com.svg","3c527509093c35288232173d1c79a500"],["img/music/magic-gate-svgrepo-com.svg","9dee31a5c312c257d0244107668d2ad9"],["img/music/sword-svgrepo-com.svg","078df1feb008ee799b328d829e0acf01"],["img/music/tree-svgrepo-com.svg","a7934fc9648c4aee7d7e86bf0297aeb7"],["index.html","3039739d24a0ebebbca1769a11eedfdb"],["js/audio_engine.js","9da45c7e6477c4ba99da3eb687841122"],["js/dice_engine.js","de7024d171302435c15873667e83007d"],["js/howler_testing.js","d41d8cd98f00b204e9800998ecf8427e"],["js/scheme.json","cb4ac70ddc7e4d46d1f29af26e07e297"],["manifest.json","2ed480755d9f73d74c7e9290635f0eb7"],["node_modules/howler/CHANGELOG.md","0b617bfd456495edef8cf231201fe67a"],["node_modules/howler/LICENSE.md","c1bddd5b0d96ababaf93d0132f1fdcec"],["node_modules/howler/README.md","aa586566f406f9e45f02ffa995405f1d"],["node_modules/howler/dist/howler.core.min.js","8c4330df1b3a5491bcb6296cfb80515e"],["node_modules/howler/dist/howler.js","6390a9f7ac0ef080267557d7440a279a"],["node_modules/howler/dist/howler.min.js","5e24edc86f97b2460c4d12d5d1b4c394"],["node_modules/howler/dist/howler.spatial.min.js","5e476cd3a43375ef8f50d4bf86b60517"],["node_modules/howler/package.json","0bbb29c6752bc9c3a0c052e4512cd679"],["node_modules/howler/src/howler.core.js","bb228a2484317d88de7cf04d4293c6d9"],["node_modules/howler/src/plugins/howler.spatial.js","4eed7838465f412cf5717366b16c768f"],["package-lock.json","0dfea13432f77fc543cdcf9c32ac1e53"],["package.json","3dae9216d120ef6e4bb441d84bf57dc6"],["scores/a_terrible_fate_Score.pdf","94197b3ff5a6e03fe68b32820f746365"],["scores/phase_1_Score.pdf","9af5bc5323506648ab83e457d9ba3755"],["scores/soft_harp_Score.pdf","01250ad2eafae983b2c16fcf942d5fe2"],["scores/soft_piano_Score.pdf","02a536ae65827c6952e42a71fd548615"],["scores/town_(outside)_Score.pdf","6dd892ca02c6a6f89e7c4c13b235d878"],["soundboard.html","f6c4e2caded6610b9343c4eb4f1a6d9a"],["subform.html","a7e8acb898c86e2aa3148a2af6ae1cd5"],["support.html","c8e9fae65987975911d39dbe8b125306"],["templates/blog_articles.txt","70b85d9a5efc2eda873bb702e698976d"]];
var cacheName = 'sw-precache-v3-sw-precache-' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function(originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function(originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function(originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function(whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function(originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







