document.addEventListener('DOMContentLoaded', function() {
  // get elements we need to manipulate later.
  let modal = document.querySelector('#modal');
  let modalLayer = document.querySelector('#modal-layer');
  let modalTitle = modal.querySelector('h3');
  let modalImage = modal.querySelector('img');
  let modalText = modal.querySelector('p');
  let teamLinks = document.querySelectorAll('#team li > a');

  // use closest method to retrieve closest matching anchor element to the event target. 
  function showModal() {
    event.preventDefault();
    // closest returns closest ancestor or self.
    let link = event.target.closest('a');
    //set content for modal
    modalTitle.textContent = link.dataset.name;
    modalImage.src = link.dataset.imageSource;
    modalImage.alt = link.dataset.name;
    modalText.textContent = link.dataset.text;
    // remove hide and add show 
    modalLayer.classList.replace('hide', 'show');
    modal.classList.replace('hide', 'show');
  }

  // empties modal content and removes show to add hide
  function hideModal() {
    event.preventDefault();
    modalTitle.textContent = '';
    modalImage.src = '';
    modalImage.alt = '';
    modalText.textContent = '';
    modalLayer.classList.replace('show', 'hide');
    modal.classList.replace('show', 'hide');
  }

  // add event listener to each list item.
  teamLinks.forEach(link => link.addEventListener('click', showModal));
  // hide if it anywhere in the modal layer
  document.querySelector('#modal-layer').addEventListener('click', hideModal);
  // hide if hit close arrow
  document.querySelector('#modal a.close').addEventListener('click', hideModal);
  // hide modal if esc key is pressed
  document.addEventListener('keyup', function(event) {
    if (event.keyCode === 27) {
      hideModal();
    }
  });
});