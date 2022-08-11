This is a challenging exercise. You may opt not work on it. We will not have 
problems of this level of difficulty in the exams.

The challenge is mainly because of the logic/mental model for it can be tough to 
visualize right away. Once you've got a mental model the code isn't long and 
complex.
Implement a function that converts a nested array of nodeNames (see Nodes to 
Array exercise for examples) to nodes. Go over the sample code and the 
corresponing return values below as a guide for what you will implement.

answer:
```javascript
function arrayToNodes(nodes) {
  const parent = document.createElement(nodes[0]);
  const children = nodes[1];

  if (children.length === 0) {
    return parent;
  } else {
    for (let i = 0; i < children.length; i += 1) {
      parent.appendChild(arrayToNodes(children[i]));
    }
  }

  return parent;
}
const nodes = ["BODY",[["HEADER",[]],["MAIN",[]],["FOOTER",[]]]];
document.body = arrayToNodes(nodes);
```
Example 1
```javascript
// Nested array of nodes
const nodes = ["BODY",[["HEADER",[]],["MAIN",[]],["FOOTER",[]]]];

// OR
//
// ["BODY", [
//   ["HEADER", []],
//   ["MAIN", []],
//   ["FOOTER", []]]]

arrayToNodes(nodes);
```
```html
<body>
  <header></header>
  <main></main>
  <footer></footer>
</body>
```
EXAMPLE 2
```javascript
// Nested array of nodes
const nodes = ["BODY",[["DIV",[["DIV",[]],["DIV",[["DIV",[]]]]]],["DIV",[]],["DIV",[["DIV",[]],["DIV",[]],["DIV",[]]]]]];

// OR
//
// ["BODY", [
//   ["DIV", [
//     ["DIV", []],
//     ["DIV", [
//       ["DIV",[]]]]]],
//   ["DIV", []],
//   ["DIV", [
//     ["DIV", []],
//     ["DIV", []],
//     ["DIV", []]]]]]

arrayToNodes(nodes);
```

```html
<body>
  <div>
    <div></div>
    <div>
      <div></div>
    </div>
  </div>
  <div></div>
  <div>
    <div></div>
    <div></div>
    <div></div>
  </div>
</body>
```