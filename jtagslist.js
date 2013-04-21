/**
 * jQuery jTagsList plugin
 * https://github.com/MrJuliuss/jTagsList
 *
 * Licensed under the MIT license.
 * Copyright 2013 Julien Richarte
 * https://github.com/MrJuliuss/
 */

(function($)
{
    $.fn.jTagsList=function(options)
    {
    	var defaultOptions = 
    	{
    		"tagPosition" : "left" // positining tag list
    	};

    	var options = $.extend(defaultOptions, options);
    	var dropdown = this;
    	var dropdownId = this.attr('id');
    	var tagListId = dropdownId+'-tag-list';
    	var tagList = '<div id="'+tagListId+'" class="tag-list"></div>';
    	var listAnimate = null;

		var init = function()
		{
			if($('#'+tagListId).length == 0)
			{
				if(options.tagPosition == 'left')
				{
					dropdown.before(tagList);
				}
				else
				{
					dropdown.after('<div id="'+tagListId+'"></div>');
				}
			}
			$('#'+dropdownId+' .dropdown-list-container').perfectScrollbar();
		};

    	init();

		return this.each(function()
		{
			var container = $('.dropdown-list-container', this).get(0);
			// Open list
			$(this).on('click', function()
			{
				// multi lists in page
				// close all lists on open list
				$('.open').each(function(index, item){
					if (container !== item) {
						$(item).height(0).removeClass('open');
					};
				});

				var newHeight = $('#'+dropdownId+' .dropdown-list-container .dropdown-list').outerHeight();
				if($(container).hasClass('open'))
				{
					newHeight = 0;
				}

				listAnimate = $('#'+dropdownId+' .dropdown-list-container').animate({
					"height": newHeight
				},
				{
					queue: false,
					complete: function()
					{
						$(this).toggleClass('open');
					}
				});
			});   				

			// Add tag 
			$(document).on('click', '#'+dropdownId+' .dropdown-list a', function()
			{
				var selectId = $(this).parent().parent().data('select-id');
				var valueId = $(this).parent().data('value-id');
				var hiddenInput = '<input type="hidden" name="tags['+50+'][]" value="'+valueId+'"/>';

				listAnimate.stop();
				$(listAnimate.selector).height(0).removeClass('open');
				
				$('#'+tagListId).append('<span class="tag" data-id="'+$(this).parent().index()+'">'+$(this).html()+'<span class="del-tag">X</span>'+hiddenInput+'</span>');
				$(this).parent().hide();
				// update scroll bar height
				$(container).perfectScrollbar('update');

				// update list height if the content of the list is smaller than the size list
				if( $('#'+dropdownId+' .dropdown-list-container .dropdown-list').height() < $(container).height())
				{
					$(container).height($('#'+dropdownId+' .dropdown-list-container .dropdown-list').height());
				}
			});

			// Remove tag
			$(document).on('click', '#'+tagListId+' .del-tag',function()
			{
				var index = $(this).parent().data('id');
				$('#'+dropdownId+' .dropdown-list li:eq('+index+')').show();
				$(this).parent().remove();
			});
		});
    }; 
})(jQuery);