/*
  add event listener on each ul image.
  if clicked, perform active toggle
    - create css for a:toggle
    - find active class element
    - remove class active from currently held element
    - add class active to current target element

  hide current visibile image
    find img in figure with class show, replace with class hide

  show clicked image
    find current element with active class, get title
    find figure img with same title
    replace class hide with class show
*/

document.addEventListener('DOMContentLoaded', (event) => {
  let currentActiveImg = document.querySelector('.active');
  let images = document.querySelectorAll('.photo-gallery img');

  function swapActiveImage(event) {
    let newActiveImage = event.target;
    newActiveImage.classList.add('active');
    currentActiveImg.classList.remove('active');
  }
  function hideCurrentImage() {
    let currentlyShownImg = document.querySelector('.show');
    currentlyShownImg.classList.replace('show', 'hide');
  }

  function showClickedImage(event) {
    let thumbNameTitle = event.target.getAttribute('title');
    let figureImages = document.querySelectorAll('figure img');
    console.log([...figureImages][0].getAttribute('title'));
    let toShowImg = [...figureImages].find((image) => {
      return image.getAttribute('title') === thumbNameTitle;
    });
    toShowImg.classList.replace('hide', 'show');
  }
  function changeImage(event) {
    
    swapActiveImage(event);
    hideCurrentImage(event);
    showClickedImage(event);
  }
  images.forEach(image => image.addEventListener('click', changeImage))
  
});
