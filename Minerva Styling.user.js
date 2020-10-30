// ==UserScript==
// @name         Minerva Styling
// @namespace    https://github.com/jj-style
// @version      0.2
// @description  well we all know Minerva looks like garbage
// @author       JJ Style
// @match        *://*.minerva.leeds.ac.uk/*
// @grant        GM_addStyle
// ==/UserScript==

var css = `
body .global-nav-bar-wrap, .button-6 { background-color:black; !important; }
#column1, #column2, .UoL_Portal_Footer { display:none; !important; }
h1, h2, h3, h4, h5, h6, span, p { color: black; !important; }
h3.a:hover { color:green; !important; }
#appTabList > tbody > tr > td > a > span { color:white; !important; }
/*#appTabList > tbody > tr > td { background-color: darkslategray; !important; }*/
#column0 { width:100%; !important; }
#tab-content1 #filterDiv select,
#tab-content1 #vleModules_length select,
#tab-content1 #vleOrganisations_length select,
#tab-content1 #vleModules_filter input,
#tab-content1 #vleOrganisations_filter input {
border-radius: 5px;
border: 2px solid black;
background-color: white;
padding: 5px;
color: black;
!important;}
.containerPortal > #column0 { width:100%; !important; }
div #column0 > #module\\:_1167_1 { display:none; !important; }
#tab-content1 { background-color: LightGray; !important; }
span > a > label:hover, #tab-content1 #filterDiv select, #tab-content1 #vleModules_length select { cursor:pointer; !important; }
#alert_container { display:none; !important; }
`;

//pesky elements that won't go normally
(function() {
    'use strict';
    GM_addStyle(css);
    document.getElementsByClassName("button-6")[0].style.backgroundColor = "black";
})();
