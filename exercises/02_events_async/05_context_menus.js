let main = document.querySelector('main');
let sub = document.querySelector('#sub');

sub.addEventListener('contextmenu', (event)  => {
  event.preventDefault()
  event.stopPropagation()
  alert('sub')
})

main.addEventListener('contextmenu', (event) => {
  event.preventDefault()
  alert(event.target.tagName)
})

/*
<head>
    <meta charset="utf-8">
    <title>Bold Element + Custom</title>
  </head>
  <style>
    main, #sub {
      padding: 15px;
    }
    main {
      width: 100%;
      height: 200px;
      background: blue;
      color: white;
    }

    #sub {
      position: relative;
      top: 100px;
      left: 15px;
      background: red;
      height: 50px;
      width: 50%;
    }
  </style>
  <body>
    <main>
      Main Area
      <section id="sub">
        Sub Area
      </section>
    </main>
  </body>
  <script src="play.js"> </script>
</html>

*/