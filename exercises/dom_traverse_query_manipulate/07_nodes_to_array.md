
Implement a function that converts the DOM, starting from the body, to nested 
arrays. Each element in the DOM is represented as ["PARENT_TAG_NAME", 
[children]] where children are elements as well and as such follow the same 
format. When an element has no children, it's represented as ["PARENT_TAG_NAME", 
[]]. For instance, if the HTML doesn't have any elements inside the body, the 
result array would be: ["BODY", []]. Likewise, if the HTML only has a div 
element as its content, the result array would be: ["BODY", [["DIV", []]]].

Go over the examples below to better visualize how the DOM is represented as 
nested arrays.
SOLUTION TO EXAMPLES:
```javascript
function findChildren(node) {
  let result = [];
  [...node.children].forEach((child) => {
    if (child.children.length === 0) {
      result.push([child.tagName, []])
    } else {
      result.push([child.tagName, findChildren(child)]);
    }
  })
  return result;
}
function nodesToArr() {
  let node = document.body
  let result = [node.tagName];
  result.push(findChildren(node))
  return result;
}
```

Example 1
```html
<!doctype html>
<html>
  <head>
    <title>Nodes to Array</title>
  </head>
  <body>
    <header id="1"></header>
    <main id="2"></main>
    <footer id="3"></footer>
  </body>
</html>
```
```javascript
> nodesToArr();
= ["BODY",[["HEADER",[]],["MAIN",[]],["FOOTER",[]]]]

// OR

= ["BODY", [
    ["HEADER", []],
    ["MAIN", []],
    ["FOOTER", []]]]
```
Example 2
```html
<!doctype html>
<html>
  <head>
    <title>Nodes to Array</title>
  </head>
  <body>
    <header id="1"></header>
    <main id="2">
      <div></div>
      <div></div>
    </main>
    <footer id="3"></footer>
  </body>
</html>
```
```javascript
> nodesToArr();
= ["BODY",[["HEADER",[]],["MAIN",[["DIV",[]],["DIV",[]]]],["FOOTER",[]]]]

// OR

= ["BODY", [
    ["HEADER", []],
    ["MAIN", [
      ["DIV", []],
      ["DIV", []]]],
    ["FOOTER",[]]]]
```
Example 3
```html
<!doctype html>
<html>
  <head>
    <title>Nodes to Array</title>
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
```javascript
> nodesToArr();
= ["BODY",[["DIV",[["DIV",[]],["DIV",[["DIV",[]]]]]],["DIV",[]],["DIV",[["DIV",[]],["DIV",[]],["DIV",[]]]]]]

// OR

= ["BODY", [
    ["DIV", [
      ["DIV", []],
      ["DIV", [
        ["DIV",[]]]]]],
    ["DIV", []],
    ["DIV", [
      ["DIV", []],
      ["DIV", []],
      ["DIV", []]]]]]
```

