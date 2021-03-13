/**
 * Function for searching index for specific category
 * @param {} category 
 * @param {*} specificCategory 
 * @returns index of wanted category from array 
 */

export function getCategory(category, specificCategory) {
  let index = 0;

  for (index; index < category.length; index++) {
    if (category[index]["category"] === specificCategory) {
      return index;
    }
  }
}

/**
 * Function for parsing parameters from url
 * @returns gamemode easy, intermediate, hard or advanced
 */
export function getParams() {
  var nameVal = [];
  var idx = document.URL.indexOf("?");
  if (idx != -1) {
    var pairs = document.URL.substring(idx + 1, document.URL.length).split("&");
    for (var i = 0; i < pairs.length; i++) {
      nameVal.push(pairs[i].split("=")[1]);
    }
  }
  return nameVal;
}
