document.addEventListener("DOMContentLoaded", (event) => {
  let templates = {};
  let photos;

  document
    .querySelectorAll("script[type='text/x-handlebars']")
    .forEach((template) => {
      templates[template.id] = Handlebars.compile(template.innerHTML);
    });

  document.querySelectorAll("script[data-type=partial]").forEach((template) => {
    Handlebars.registerPartial(template.id, template.innerHTML);
  });

  document
    .querySelector("section > header")
    .addEventListener("click", (event) => {
      event.preventDefault();
      let button = event.target;
      let buttonType = button.getAttribute("data-property");
      if (buttonType) {
        let dataId = button.getAttribute("data-id");
        let href = button.href;

        fetch(href, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
          },
          body: "photo_id=" + dataId,
        })
          .then((response) => response.json())
          .then((json) => {
            button.textContent = button.textContent.replace(/\d+/, json.total);
            //renderPhotoInformation(dataId)
          });
      }
    });

    document.querySelector('form').addEventListener('submit', function(e) {
      e.preventDefault();
      let form = e.target;
      let href = form.getAttribute("action");
      let method = form.getAttribute("method");
      let data = new FormData(form);
      let currentSlideId = slideshow.currentSlide.getAttribute('data-id');
      data.set('photo_id', currentSlideId);
    
      fetch(href, {
        method: method,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        body: new URLSearchParams([...data])
      })
      .then(response => response.json())
      .then(json => {
        let commentsList = document.querySelector('#comments ul');
        commentsList.insertAdjacentHTML('beforeend', templates.photo_comment(json));
        form.reset();
      });
    });
    

  function renderPhotos() {
    let slides = document.querySelector("#slides");
    let html = templates.photos({ photos: photos });
    slides.insertAdjacentHTML("beforeend", html);
  }

  function renderPhotoInformation(idx) {
    let header = document.querySelector("section header");
    header.innerHTML = "";
    let photo = photos.filter((photo) => {
      return photo.id === idx;
    })[0];

    let html = templates.photo_information(photo);
    header.insertAdjacentHTML("beforeend", html);
  }

  function getCommentsFor(idx) {
    fetch("/comments?photo_id=" + idx)
      .then((response) => response.json())
      .then((comment_json) => {
        let comment_list = document.querySelector("#comments ul");
        comment_list.innerHTML = "";
        comment_list.insertAdjacentHTML(
          "beforeend",
          templates.photo_comments({ comments: comment_json })
        );
      });
  }

  const slideShow = {
    nextSlide: function (event) {
      event.preventDefault();
      let next = this.currentSlide.nextElementSibling;
      if (!next) {
        next = this.firstSlide;
      }

      this.fadeOut(this.currentSlide);
      this.fadeIn(next);
      this.renderPhotoContent(next.getAttribute("data-id"));
      this.currentSlide = next;
    },

    prevSlide: function (event) {
      event.preventDefault();
      let prev = this.currentSlide.previousElementSibling;
      if (!prev) {
        prev = this.lastSlide;
      }

      this.fadeOut(this.currentSlide);
      this.fadeIn(prev);
      this.renderPhotoContent(prev.getAttribute("data-id"));
      this.currentSlide = prev;
    },

    fadeIn: function (slide) {
      slide.classList.remove("hide");
      slide.classList.add("show");
    },

    fadeOut: function (slide) {
      slide.classList.remove("show");
      slide.classList.add("hide");
    },

    renderPhotoContent(idx) {
      renderPhotoInformation(Number(idx));
      getCommentsFor(idx);
    },

    bind: function () {
      let prev = document.querySelector("#slideshow .prev");
      let next = document.querySelector("#slideshow .next");

      next.addEventListener("click", (event) => this.nextSlide(event));
      prev.addEventListener("click", (event) => this.prevSlide(event));
    },

    init() {
      this.slideshow = document.querySelector("#slideshow");
      let slides = this.slideshow.querySelectorAll("figure");
      this.firstSlide = slides[0];
      this.lastSlide = slides[slides.length - 1];
      this.currentSlide = this.firstSlide;
      this.bind();
    },
  };

  fetch("/photos")
    .then((response) => response.json())
    .then((json) => {
      photos = json;
      renderPhotos(photos);
      renderPhotoInformation(photos[0].id);
      getCommentsFor(photos[0].id);
      slideShow.init();
    });
});
