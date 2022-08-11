Write a function that takes two element ids as arguments and swaps
the positions of the elements represented by the ids. The function
returns true for valid swaps and undefined for invalid. To put
the focus on the node swapping functionality, you can assume that
nodes will have a value for the id attribute and two arguments
will always be provided. Use the following HTML and sample codes
to test your output:
```html
<!doctype html>
<html>
  <head>
    <title>Node Swap</title>
  </head>
  <body>
    <div id="1">
      <div id="4"></div>
      <div id="5">
        <div id="6"></div>
      </div>
    </div>
    <div id="2"></div>
    <div id="3">
      <div id="7"></div>
      <div id="8"></div>
      <div id="9"></div>
    </div>
  </body>
</html>
```
solution: 
```javascript
function childOfNode(first, second) {
    let children = first.children;
    if ([...children].includes(second)) return false;
    return true;
  }
  
  function nodeSwap(idA, idB) {
    let nodeA = document.getElementById(String(idA));
    let nodeB = document.getElementById(String(idB));

    if (!nodeA || !nodeB) {
      return undefined
    } else if ((childOfNode(nodeA, nodeB) || childOfNode(nodeB, nodeA))) {
      return undefined
    }

    let parentA = nodeA.parentNode;
    let parentB = nodeB.parentNode;
    let siblingA = nodeA.nextElementSibling;
    
    // Move 'nodeA' to before position of 'nodeB'
    parentB.insertBefore(nodeA, nodeB);
    // move 'nodeB' to before the sibling of 'nodeA'
    parentA.insertBefore(nodeB, siblingA);

  }
// at least one of the id attributes doesn't exist
nodeSwap(1, 20); //undefined

// at least one of the nodes is a "child" of the other
nodeSwap(1, 4));; //undefined
nodeSwap(9, 3));; //undefined

// one swap
nodeSwap(1, 3);

// multiple swaps
nodeSwap(3, 1);
nodeSwap(9, 7);
```