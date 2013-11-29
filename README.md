# jTagsList 

A simple jQuery plugin Tag Manager

### No longer maintained

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
		<div class="dropdown-list-upper-container">
  		<div class="dropdown-list-container">
    		<ul class="dropdown-list" data-select-id="foobar">
    		  <li data-value-id="foo"><a href="#">Foo</a></li>
    		  <li data-value-id="bar"><a href="#">Bar</a></li>
    		</ul>
    		<input type="hidden" value="" name="" class="tags-values" />
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
    $('#select-lang').jTagsList({
    'tagPosition' : 'left',
    'selectedIds': [<?php echo $news->lang; ?>],
    'whenAdded': function(valueId){
        $.getJSON('/right/to/path/webservice/?nid=' + news_id + '&lid=' + valueId + '&action=add&returnType=json', function(data){
          if (data.errors != 0)
          {
            alert("l'enregistrement a échoué.");
          } 
        });   
    },
    'whenRemoved': function(valueId)
    {
      $.getJSON('/right/to/path/webservice/?nid=' + news_id + '&lid=' + valueId + '&action=delete&returnType=json', function(data){
        if (data.errors != 0)
        {
          alert("l'enregistrement a échoué.");
        } 
      });   
    }
  });
});
```

### options : 

- tag position : position the list to the right or left
- selectedIds : ids list, separated by comma
- whenAdded : callback when item is added
- whenRemoved : callback when item is removed

## Aditional informations : 

thank to Cronos87 *https://github.com/Cronos87* for collaboration
