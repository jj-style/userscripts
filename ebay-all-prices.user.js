// ==UserScript==
// @name         Ebay All Prices
// @description  display all prices for items on ebay
// @namespace    https://github.com/jj-style
// @version      0.3
// @author       JJ Style
// @match        *://*.ebay.co.uk/itm/*
// @match        *://*.ebay.com/itm/*
// @grant        none
// ==/UserScript==

// global varz
const emoji_check = String.fromCodePoint( 0x2705);
const emoji_cross = String.fromCodePoint( 0x274C);
const emoji_from_bool = (b) => b ? emoji_check : emoji_cross;

// get page source & find where the item JSON is in one of the script blocks
var generatedSource = new XMLSerializer().serializeToString(document);
const re2 = new RegExp("itmVarModel");
let matches = re2.exec(generatedSource);
let hitIndex = matches.index;
let json2end = generatedSource.substring(hitIndex + 13);

// iterate through string until end of json content
// and then parse to json object
let index = 0;
let depth = 0;
do {
  if (json2end[index] == "{") {
    depth++;
  } else if (json2end[index] == "}") {
    depth--;
  }
  index++;
} while (depth > 0 && index <= json2end.length);
let data = JSON.parse(json2end.substring(0, index));

// create an lookup to get selection name based on it's ID
var labelLookup = getSelectOptionLookup();

// create a table of prices & put in document under the main price
var table = document.createElement("table");
table.style.borderCollapse = "collapse";
var header = table.createTHead();
header.style.borderBottom = "1px solid black";
var body = table.createTBody();
var headerRow = header.insertRow(0);
var headings = new Set();
var additionalHeadings = {'price': 'price', 'quantityAvailable': 'remaining', 'inStock': 'in stock'};
Object.values(data.itemVariationsMap).forEach(item => {
  Object.keys(item.traitValuesMap).forEach(t => headings.add(t));
})
headings = Array.from(headings);

// add table headers: <th>
[...headings, ...Object.values(additionalHeadings)].forEach((h,hi) => {
  var hc = headerRow.insertCell(hi);
  hc.style.textAlign = "center";
  hc.innerText = h;
});

// build table body
Object.values(data.itemVariationsMap).forEach((item, idx) => {
  var r = body.insertRow(idx);
  [...headings, ...Object.keys(additionalHeadings)].forEach((h, hi) => {
    var c = r.insertCell(hi);
    c.style.margin = "3px";
    c.style.padding = "3px";
    c.style.textAlign = "center";
    if (h in additionalHeadings) {
        // items on the object itself can be rendered as is
        var val = item[h];
        if (typeof val == "boolean") {
            c.innerText = emoji_from_bool(val);
        } else {
            c.innerText = item[h] ?? "";
        }
    } else {
        // item traits (options like size) needs to lookup to the select box
        // to get the value
        var traitLookup = item.traitValuesMap[h] ?? "";
        if (traitLookup !== "") {
            c.innerText = labelLookup[h][traitLookup] ?? "";
        }
    }
  })
});

// insert options table on the DOM below the price
let priceContent = document.getElementsByClassName("x-bin-price__content")[0];
priceContent.appendChild(table);

// get dictionary of option id to display name for a given node
function getSelectOptions(v) {
    var optionTags = Array.from(v.getElementsByTagName("option"));
    var options = optionTags.reduce((a,v) => ({...a, [v.value]: v.innerText}), {});
    return options;
}

// get a dictionary of selection name to a nested dictionary of option id to display name
function getSelectOptionLookup() {
    var labels = Array.from(document.getElementsByClassName('x-msku__label'));
    var labelLookup = labels.reduce((a,v) => ({...a, [v.innerText]: getSelectOptions(v)}), {});
    return labelLookup;
}