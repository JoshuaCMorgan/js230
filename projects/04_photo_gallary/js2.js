$(function() {
  // getting elements we need
  // and in a structure we can work with
  let $slideshow = $('#slideshow');
  let $nav = $slideshow.find('ul');
  
  // locate the element that was clicked on
  // put a click event on the ul element, and bubble up 
  // from the a element to the ul element.
  $nav.on('click', 'a', function(e) {
    e.preventDefault();
    // get closest li element upward, and set
    let $li = $(e.currentTarget).closest('li');
    // get the index if element, used for retrieving appropriate img element
    let idx = $li.index();

    //// transition from current photo to chosen photo
    // find all figure elements and filter down to the one that 
    // is visible, change css display: block to none
    $slideshow.find("figure").stop().filter(':visible').fadeOut(300);
    // find all figures and return the one whose idx matches
    // change its display property from none to block
    $slideshow.find("figure").eq(idx).fadeIn(300);

    //// put a blue border around the active chosen picture
    // find the thumbnail element with active class and remove it.
    // locate the target li element and add class active
    $nav.find('.active').removeClass('active');
    $li.addClass('active');


  });
})