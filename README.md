# jTagsList 

A simple jQuery plugin Tag Manager

## Dependencies : 

- Requires jQuery 1.8.x or higher.
- perfect-scrollbar with mousewheel : https://github.com/noraesae/perfect-scrollbar

## Demo : 

Coming soon...

## Installation :

Include script after the jQuery library : 


    <script src="/path/to/jquery.jtagslist.js"></script>
    <script src="/path/to/perfect-scrollbar.with-mousewheel.min.js"></script>
    
    <link rel="stylesheet" type="text/css" href="perfect-scrollbar.css" />
    <link rel="stylesheet" type="text/css" href="jtagslist.css" />
    

## Usage : 
``` html
  <!DOCTYPE html>
  <html>
  <head>
    <!-- styles, scripts, etc -->
  </head>
  <body>

  <form>
  	<div id="select-foo" class="dropdown-btn">
		<a href="#">Add</a>
		<div class="dropdown-upper-container">
  		<div class="dropdown-list-container">
    		<ul class="dropdown-list" data-select-id="foobar">
    		  <li data-value-id="foo"><a href="#">Foo</a></li>
    		  <li data-value-id="bar"><a href="#">Bar</a></li>
    		</ul>
  		</div>
		</div>
		</div>
  </form>
  </body>
  </html>
```
  
``` javascript
$(document).ready(function() 
{
  $('#select-foo').jTagsList({'tagPosition' : 'left'});
});
```

### options : 

- tag position : position the list to the right or left


## Aditional informations : 

thank to Cronos87 *https://github.com/Cronos87* for collaboration
