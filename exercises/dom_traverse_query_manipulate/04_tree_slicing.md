Implement a function, sliceTree, that is "similar" to the Array.prototype.slice
 method, but this time for a DOM tree. The sliceTree function takes two 
 arguments: the start index which is the parent node's id attribute and, the
  end index which is the innermost child node's id attribute. The function 
  returns an array of tagNames. Take note of the following when implementing
   the sliceTree function:

It's similar to slice but different in the sense that slice isn't inclusive 
on the right hand side.
The end index doesn't have to be the id of the "innermost" child node as 
some of the examples suggest.
Only consider element nodes.
Only elements that have body as an ancestor (parent, grandparent, etc.)
 are sliceable.
If the id attribute of the start or end index is not in the DOM, return
 undefined.
If the slice is not feasible — there's no path connecting the element at
 the starting index to the ending index — return undefined.
Use this HTML and sample run to test out your code:
```html
<!doctype html>
<html>
  <head>
    <title>Tree Slicing</title>
  </head>
  <body>
    <article id="1">1
      <header id="2">2
        <span id="3">3
          <a href="#" id="4">4</a>
        </span>
      </header>
      <main id="5">5
        <section id="6">6
          <p id="7">7
            <span id="8">8
              <strong id="9">9
                <a href="#" id="10">10</a>
              </strong>
            </span>
          </p>
        </section>
        <section id="11">11
          <p id="12">12
            <span id="13">13
              <strong id="14">14
                <a href="#" id="15">15</a>
              </strong>
            </span>
          </p>
          <p id="16">16
            <span id="17">17
              <strong id="18">18
                <a href="#" id="19">19</a>
              </strong>
            </span>
            <span id="20">20
              <strong id="21">21
                <a href="#" id="22">22</a>
              </strong>
            </span>
          </p>
        </section>
      </main>
      <footer id="23">23
        <p id="24">24</p>
      </footer>
    </article>
  </body>
</html>
````

Solution:
```javascript
function sliceTree(start, end) {
  let endElement = document.getElementById(end);
  const startElement = document.getElementById(start);

  if (!startElement || !endElement) {
    return undefined;
  }

  const slicedTree = [];
  let currentElement;

  do {
    currentElement = endElement;
    slicedTree.unshift(currentElement.tagName);
    endElement = endElement.parentNode;
  } while (currentElement.id !== String(start) && endElement.tagName !== 'BODY');

  return (endElement.tagName === 'BODY' && currentElement.id !== String(start) ? undefined : slicedTree);
}
```