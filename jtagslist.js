/**
 * jQuery jTagsList plugin
 * https://github.com/MrJuliuss/jTagsList
 *
 * Licensed under the MIT license.
 * Copyright 2013 Julien Richarte
 * https://github.com/MrJuliuss/
 * 
 */

(function($)
{
    $.fn.jTagsList=function(options)
    {
        var defaultOptions =
        {
            "tagPosition" : "left"// positining tag list
        };
        var options = $.extend(defaultOptions, options);
        var dropdown = this;
        var dropdownId = this.attr('id');
        var tagListId = dropdownId+'-tag-list';
        var tagList = '<div id="'+tagListId+'" class="tag-list"  data-criteria-id=""></div>';
        var listAnimate = null;
        var init = function()
        {
            if($('#'+tagListId).length === 0)
            {
                if(options.tagPosition === 'left')
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
                $('.open').each(function(index, item)
                {
                    if (container !== item) {
                        $(item).height(0).removeClass('open');
                    }
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
                var hiddenInput = $('.tags-values', $(this).parent().parent().parent());

                var currentValue = hiddenInput.val();
                hiddenInput.attr('name', 'tags['+selectId+']');
                hiddenInput.attr('id', 'tags-'+selectId);
                hiddenInput.val(currentValue+valueId+',');

                listAnimate.stop();
                $(listAnimate.selector).height(0).removeClass('open');

                $('#'+tagListId).attr('data-criteria-id', selectId);
                $('#'+tagListId).append('<span class="tag" data-index="'+$(this).parent().index()+'" data-value="'+valueId+'">'+$(this).html()+'<span class="del-tag">X</span></span>');
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
                var selectId = $(this).parent().parent().data('criteria-id');
                var index = $(this).parent().data('index');
                var value = $(this).parent().data('value');

                var hiddenInput = $('#tags-'+selectId);
                var splitedValues = hiddenInput.val().split(',');
                for(var i = 0 ; i < splitedValues.length ; i++)
                {
                    if(String(splitedValues[i]) === String(value))
                    {
                        splitedValues.splice(i,1);
                    }
                }
                hiddenInput.val(splitedValues.join());

                $('#'+dropdownId+' .dropdown-list li:eq('+index+')').show();
                $(this).parent().remove();

                // update scroll bar height
                $(container).perfectScrollbar('update');
                if($(container).hasClass('open'))
                {
                    $(container).height($('#'+dropdownId+' .dropdown-list-container .dropdown-list').height());
                }
            });
        });
    };
})(jQuery);