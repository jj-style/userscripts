// ==UserScript==
// @name         Facebook Styling
// @namespace    https://github.com/jj-style
// @version      0.1
// @description  there's a lot of useless stuff on facebook. Lets get it back to basics
// @author       JJ Style
// @match        *://*.facebook.com/*
// @grant        GM_addStyle
// ==/UserScript==

var css = `
div[data-pagelet="VideoChatHomeUnit"],
div[data-pagelet="Stories"],
div a[href*="marketplace"],
div a[href$="/watch/"],
a[href^="/pages"] > span > span
{ display:none; !important;}

`;

//pesky elements that won't go normally
(function() {
    'use strict';
    GM_addStyle(css);
    document.getElementById("navItem_2392950137").style.display="none";
})();
