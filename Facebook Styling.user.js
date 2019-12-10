// ==UserScript==
// @name         Facebook Styling
// @namespace    https://github.com/jj-style
// @version      0.1
// @description  there's a lot of useless shit on facebook. Lets get it back to basics
// @author       JJ Style
// @match        *://*.facebook.com/*
// @grant        GM_addStyle
// ==/UserScript==

var css = `
#stories_pagelet_below_composer,
#pagelet_ego_pane
#navItem_2392950137,
#navItem_1606854132932955,
#pagelet_rhc_footer,
#navItem_193356651002223,
#navItem_140332009231,
#navItem_285571681929755,
#navItem_1433252076974635,
#navItem_526732794016279,
#navItem_577076605805053,
#navItem_977114232337111,
#navItem_1291706757509010,
#navItem_280033845760645,
#navItem_302677536798470 { display:none; !important;}
`;

//pesky motherfuckers
(function() {
    'use strict';
    GM_addStyle(css);
    document.getElementById("navItem_2392950137").style.display="none";
})();
