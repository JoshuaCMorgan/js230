/*
ORIGINAL
<a href="https://www.launchschool.com">
  Home
  <img src="https://d24f1whwu8r3u4.cloudfront.net/assets/launch-logo-b6d01bd15ee9da31457ee3c315845718823aa8a741858be598ab35042a312348.svg" />
</a>

img {
  display: block;
  width: 15%;
  margin-top: 10px;
  cursor: auto;
}

document.querySelector('img').addEventListener('click', event => {
  event.stopPropagation();
}, false);
*/

// FIXED
document.querySelector('img').addEventListener('click', event => {
  event.preventDefault();
});