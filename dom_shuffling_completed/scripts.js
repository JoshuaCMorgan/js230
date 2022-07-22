// let header = document.querySelectorAll('header')[1];

// let main = document.querySelector('main');
// document.body.insertBefore(header, main);


window.addEventListener('DOMContentLoaded', (event) => {
  function fixHeader() {
    let header = document.querySelectorAll('header')[1];
    let main = document.querySelector('main');
    document.body.insertBefore(header, main);
    let h1 = document.querySelector('h1');
   
    let nav = document.querySelector('nav');
    header.insertBefore(h1, nav);
    }
  fixHeader();

  function fixImages() {
    let [chinStickFigure, babyMopFigure] = document.querySelectorAll('figure');
    console.log(chinStickFigure);
    console.log(babyMopFigure);
    let babyMopImage = chinStickFigure.querySelector('img')
    let chinStickImage = babyMopFigure.querySelector('img');
    
    chinStickFigure.insertBefore(chinStickImage, chinStickFigure.firstChild)
    babyMopFigure.insertBefore(babyMopImage, babyMopFigure.firstChild)

    let article = document.querySelector('article');
    article.appendChild(chinStickFigure);
    article.appendChild(babyMopFigure);
  }

  fixImages()
});
