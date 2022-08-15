const element1 = document.querySelector('table');
const element2 = document.querySelector('main h1');
const element3 = document.querySelector('main');

const callback = ({target, currentTarget}) => {
  alert(`Target: ${target.tagName}\nCurrent Target: ${currentTarget.tagName}`);
};

function delegateEvent(parentElement, selector, eventType, callback) {
  if (parentElement && parentElement instanceof Element) {
    let validTarget = [...document.querySelectorAll(selector)]
    return !parentElement.addEventListener(eventType, (event) => {
      if (validTarget.includes(event.target)) {
        callback(event);
      }
    })
  }
}

delegateEvent(element1, 'p', 'click', callback);
delegateEvent(element2, 'p', 'click', callback);
 delegateEvent(element2, 'h1', 'click', callback);
delegateEvent(element3, 'h1', 'click', callback);
delegateEvent(element3, 'aside p', 'click', callback);
delegateEvent(element2, 'p', 'click', callback);

/*
<!doctype html>
<html lang="en-US">
  <head>
    <meta charset="utf-8">
    <title>Event Delegation Function</title>
  </head>
  <body>
    <main>
      <section>
        <h1>Header</h1>
        <p>Content</p>
      </section>
      <aside>
        <h2>Sub Side Notes</h2>
        <p>Note 1</p>
        <p>Note 2</p>
      </aside>
    </main>
    <nav>
      <p>Side Note</p>
    </nav>
  </body>
</html>
*/