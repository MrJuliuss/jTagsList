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
            "tagPosition": "left", // positining tag list
            "selectedIds":[],
            "whenOpened": function(){},
            "whenAdded": function(){},
            "whenRemoved": function(){}
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
                        options.whenOpened();
                    }
                });

                return false;
            });

            // Add tag 
            $('#'+dropdownId+' .dropdown-list a', document).on('click', function()
            {
                methods.addTag(this);
                return false;
            });

            // Remove tag
            $(document).on('click', '#'+tagListId+' .del-tag',function()
            {
                methods.deleteTag(this);
                return false;
            });

            var methods = {
                'addTag': function(link){
                    var selectId = $(link).parent().parent().data('select-id');
                    var valueId = $(link).parent().data('value-id');
                    var hiddenInput = $('.tags-values', $(link).parent().parent().parent());
                    var listAnimate = $('#'+dropdownId+' .dropdown-list-container');

                    var currentValue = hiddenInput.val();
                    var valToSet = "";
                    if(currentValue !== "")
                    {
                        valToSet = currentValue+','+valueId;
                    }
                    else
                    {
                        valToSet = currentValue+valueId;
                    }
                    hiddenInput.attr('name', 'tags['+selectId+']');
                    hiddenInput.attr('id', 'tags-'+selectId);
                    hiddenInput.val(valToSet);

                    listAnimate.stop();
                    $(listAnimate.selector).height(0).removeClass('open');

                    $('#'+tagListId).attr('data-criteria-id', selectId);
                    $('#'+tagListId).append('<span class="tag" data-index="'+$(link).parent().index()+'" data-value="'+valueId+'">'+$(link).html()+'<span class="del-tag">X</span></span>');
                    $(link).parent().hide();

                     options.whenAdded(valueId);

                    // update scroll bar height
                    $(container).perfectScrollbar('update');

                    // update list height if the content of the list is smaller than the size list
                    if( $('#'+dropdownId+' .dropdown-list-container .dropdown-list').height() < $(container).height())
                    {
                        $(container).height($('#'+dropdownId+' .dropdown-list-container .dropdown-list').height());
                    }
                },
                'deleteTag': function(link){
                    var selectId = $(link).parent().parent().data('criteria-id');
                    var index = $(link).parent().data('index');
                    var value = $(link).parent().data('value');

                    var hiddenInput = $('#tags-'+selectId);
                    var splitValues = hiddenInput.val().split(',');
                    for(var i = 0 ; i < splitValues.length ; i++)
                    {
                        if(String(splitValues[i]) === String(value))
                        {
                            splitValues.splice(i,1);
                        }
                    }
                    hiddenInput.val(splitValues.join());

                    $('#'+dropdownId+' .dropdown-list li:eq('+index+')').show();
                    $(link).parent().remove();

                    // update scroll bar height
                    $(container).perfectScrollbar('update');
                    if($(container).hasClass('open'))
                    {
                        $(container).height($('#'+dropdownId+' .dropdown-list-container .dropdown-list').height());
                    }
                }
            }

            $(options.selectedIds).each(function(k, id){
                $link = $('li[data-value-id=' + id + ']', '.dropdown-list-container').find('a');
                methods.addTag($link.get(0));
            });


            // Close dropdown on click outside
            $(document).on('click', function()
            {
                var droplist = $('.dropdown-list-container');
                if(droplist.hasClass('open'))
                {
                    droplist.height(0).removeClass('open');
                }
            });
        });
    };
})(jQuery);