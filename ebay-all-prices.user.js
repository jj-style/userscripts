// ==UserScript==
// @name         Ebay All Prices
// @description  display all prices for items on ebay
// @namespace    https://github.com/jj-style
// @version      0.1
// @author       JJ Style
// @match        https://www.ebay.co.uk/itm/*
// @grant        none
// ==/UserScript==

// get page source & find where the item JSON is in one of the script blocks
var generatedSource = new XMLSerializer().serializeToString(document);
const re2 = new RegExp("itmVarModel");
let matches = re2.exec(generatedSource);
let hitIndex = matches.index;
let json2end = generatedSource.substring(hitIndex + 13);

// iterate through string until end of json content
// and then parse to json object
let idx = 0;
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

// create a list of prices & put in document under the main price
var el = document.createElement("ul");
Object.values(j.itemVariationsMap).forEach((item) => {
  let li = document.createElement("li");
  li.innerText = item.price;
  el.appendChild(li);
});

let priceContent = document.getElementsByClassName("x-bin-price__content")[0];
priceContent.appendChild(el);
