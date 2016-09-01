# Trio
Trio.Renderer is the rendering library for Trio. It is designed to:
 1. Expose a set of API for creating HTML template in JavaScript
 2. Expose a patching function to efficiently diff and update DOM incrementally

Instead of storing a virtual DOM for diff-ing, Trio.Renderer diff each DOM node as it is being generated. It is designed with Web Component in mind, and it's patching algorithm is compatible with nested shadow DOM. 

# Content
- [createTemplate](#createtemplate-)
- From the template object
  - [open] (#templateopen-tagname-)
  - [close] (#templateclose-)
  - [render] (#templaterender-data-)
  - [addClass] (#templateaddclass-classname-)
  - [attr] (#templateattr-name-value-)
  - [text] (#templatetext-stringorfunction-)
  - [style] (#templatestyle-name-value-)
  - [if] (#templateif-valueorfunction-)
  - [else] (#templateelse-)
  - [each] (#templateeach-arrayorfunction-)
  - [done] (#templatedone-)
  - [data] (#templatedata-data-)
  - [patch] (#templatepatch-root-data-)

# API
The following methods are accessed through:
```js
Trio.Renderer.*
```
***
#### createTemplate( )
Return a template object

Sample:
```js
var tmpl = Trio.Renderer.createTemplate();
```
***
# API of a template object
#### template.open( tagName ) 
Open a HTML tag. 

| Parameter        | Type                | Description                                                        |
| ---------------- | ------------------- | ------------------------------------------------------------------ |
| tagName          | String              | HTML/Custom Tag Name. Accept .className and #id as part of tag name|

***
#### template.close( ) 
Close a HTML tag. Just like writing HTML, any open tag must be closed.

***
#### template.render( data ) 
Render template to HTML with data that's passed in

| Parameter        | Type                | Description                                                         |
| ---------------- | ------------------- | ------------------------------------------------------------------- |
| data             | Any                 | Data to be rendered                                                 |


Sample:
```js
var template = Trio.Renderer.createTemplate();

template.open('div.container')
        .open('div#child').close()
    .close();

template.render();
```
Generate:
```html
<div class="container">
    <div id="child"></div>
</div>
```
***
#### template.addClass( className )
Add class name to an open tag

| Parameter        | Type                | Description                                                        |
| ---------------- | ------------------- | ------------------------------------------------------------------ |
| className        | String              | Class names                                                        |

Sample:
```js
var template = Trio.Renderer.createTemplate();

template.open('div')
            .addClass('adding-this-class')
        .close();

template.render();
```
Generate:
```html
<div class="adding-this-class"></div>
```
***
#### template.attr( name, value )
Add attribute to an open tag

| Parameter        | Type                  | Description                                                        |
| ---------------- | --------------------- | ------------------------------------------------------------------ |
| name             | String                | Attribute names                                                    |
| value            | String/Number/Boolean | Attribute value                                                    |

Sample:
```js
var template = Trio.Renderer.createTemplate();

template.open('input')
            .attr('id', 'some-id')
            .attr('disabled', true)
        .close();

template.render();
```
Generate:
```html
<input id="some-id" disabled="true"></input>
```
***
#### template.text( stringOrFunction )
Add text content to open tag

| Parameter          | Type            | Description                                                        |
| -----------------  | --------------- | ------------------------------------------------------------------ |
| stringOrFunction   | String/Funciton | String or Funtion that returns a string                            |

Sample:
```js
var template = Trio.Renderer.createTemplate();

template.open('span')
            .text('Hello!')
        .close();

template.render();
```
Generate:
```html
<span>Hello!</span>
```
***
#### template.style( name, value )
Add inline styling to open tag

| Parameter        | Type                  | Description                                                        |
| ---------------- | --------------------- | ------------------------------------------------------------------ |
| name             | String                | CSS Style names                                                    |
| value            | String                | CSS Style value                                                    |

Sample:
```js
var template = Trio.Renderer.createTemplate();

template.open('span')
            .style('width', '10px')
            .style('height', '10px')
            .style('background-color', 'blue')
        .close();

template.render();
```
Generate:
```html
<span style="width: 10px; height: 10px; background-color: blue;"></span>
```
***
#### template.if( valueOrFunction )
Add conditional logic. Any chained command before .if is done will only be executed if valueOrFunction is truthy.

| Parameter        | Type                  | Description                                                        |
| ---------------- | --------------------- | ------------------------------------------------------------------ |
| valueOrFunction  | Any                   | A value, or a function that will return a value                    |

Sample:
```js
var template = Trio.Renderer.createTemplate();

template.open('span')
            .if(function(d) { return d.shouldRender; })
                .open('span.truthy').close()
            .done()
        .close();

template.render({ shouldRender: true });
```
Generate:
```html
<span>
    <span class="truthy"></span>
</span>
```
***
#### template.else( )
Negative conditional inside an if command. 

Sample:
```js
var template = Trio.Renderer.createTemplate();

template.open('span')
            .if(function(d) { return d.shouldRender; })
                .open('span.truthy').close()
            .else()
                .open('span.falsey').close()
            .done()
        .close();

template.render({ shouldRender: false });
```
Generate:
```html
<span>
    <span class="falsey"></span>
</span>
```
***
#### template.each( arrayOrFunction )
Add looping logic. Any chained command before .each is done will only be executed for the length of arrayOrFunction.

| Parameter        | Type                  | Description                                                        |
| ---------------- | --------------------- | ------------------------------------------------------------------ |
| arrayOrFunction  | Array/Function        | An array, or a function that will return an array                  |

Sample:
```js
var template = Trio.Renderer.createTemplate();

template.open('span')
            .each(function(d) { return d.messages; })
                .open('span.message').close()
            .done()
        .close();

template.render({
    messages: [1, 2, 3, 4, 5] 
});
```
Generate:
```html
<span>
    <span class="message"></span>
    <span class="message"></span>
    <span class="message"></span>
    <span class="message"></span>
    <span class="message"></span>
</span>
```
***
#### template.done( )
Mark any logic as done.


***
#### template.data( data )
Render custom elements with data. Can open be used when a custom element tag is opened

| Parameter        | Type                | Description                                                         |
| ---------------- | ------------------- | ------------------------------------------------------------------- |
| data             | Any                 | Data to be rendered                                                 |

Sample:
```js
var template = Trio.Renderer.createTemplate();

template.open('x-foo')
            .data(function(d) { return d.content; })
        .close();

template.render({
    content: {
        name: 'Jacky',
        messages: []
    }
});
```
Generate:
```html
<x-foo>
    <!-- 
    The shadowDOM of x-foo would be rendered with data,
    with the template defined inside x-foo's template object 
    -->
</x-foo>
```
***
#### template.patch( root, data )
Diff root node against new DOM rendered with data, and update what's necessary

| Parameter        | Type                  | Description                                                        |
| ---------------- | --------------------- | ------------------------------------------------------------------ |
| root             | HTML Node             | root node to start diffing                                         |
| data             | Any                   | Data to render new DOM with                                        |

Sample:
```js
var template = Trio.Renderer.createTemplate();

template.open('div.business-card')
            .open('span.name').text(function(d){ return d.name; }).close()
            .if(function(d) { return d.address; })
                .open('span.address-containner')
                    .open('span').text('Address:').close()
                    .open('span.address').text(function(d) { return d.address; }).close()
                .close()
            .done()
        .close();

var root = template.render({
    name: 'Jacky',
    address: '123 4th St'
});
```
Generate:
```html
<!-- Original render -->
<div class="business-card">
    <span class="name">Jacky</span>
    <span class="address-container">
        <span>Address:</span>
        <span class="address">123 4th St</span>
    </span>
</div>
```

Patch:
```js
template.patch(root, {
    name: 'John Doe'
});
```

Update DOM:
```html
<!-- After patch -->
<div class="business-card">
    <span class="name">John Doe</span>
</div>
```





 