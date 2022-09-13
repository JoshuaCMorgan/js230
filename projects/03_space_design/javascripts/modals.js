/*
For this to work, elements that will fadeIn need to have css property of 
'display' set to 'none', which hides it.
'fadeIn' will change value of 'display' from 'none' to 'block'. 
*/

$(function() {
  $("#team li a").on("click", function(e) {
    e.preventDefault();
    // context is the a element clicked
    var $e = $(this);

    // isolate siblings of a element, particularly, the element with class '.modal'
    // it has a top: 0
    // change it to a position that is relative to current position of window scrollbar.
    $e.siblings(".modal").css({
      top: $(window).scrollTop() + 30
    });

    // retrieve all div elements next to target a element
    // and change display from none to block
    $e.nextAll("div").fadeIn(400);
  });

  // for those elements with selected class
    // select all elements that are 'visible'
    // visible: those elements that currently have a width or 
    // height that is greater than zero.  
    // change 'display' from 'block' to 'none'
  $(".modal_layer, a.close").on("click", function(e) {
    e.preventDefault();

    $(".modal_layer, .modal").filter(":visible").fadeOut(400);
  });
});

