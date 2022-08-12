document.querySelector('html').addEventListener('click', (event) => {
  let container = document.querySelector('#container');
  if (!container.contains(event.target)) {
    container.style = 'display: none';
  }
});
/*
<html lang="eng">
  <head>
    <meta charset="UTF-8"/>
    <title>Reverse Engineer</title>
    <style>
      #container {
        width: 100px;
        height: 100px;
        background-color: red;
      }
      #inner {
        width: 25px;
        height: 25px;
        background-color: purple;
      }
    </style>
  </head>
  <body>
    <div id="container">
      <div id='inner'></div>
    </div>
    <script src="play.js"> </script>
  </body>
</html>
*/