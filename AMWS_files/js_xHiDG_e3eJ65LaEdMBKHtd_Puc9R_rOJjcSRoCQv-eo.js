/**
 * jQuery.placeholder - Placeholder plugin for input fields
 * Written by Blair Mitchelmore (blair DOT mitchelmore AT gmail DOT com)
 * Licensed under the WTFPL (http://sam.zoy.org/wtfpl/).
 * Date: 2008/10/14
 *
 * @author Blair Mitchelmore
 * @version 1.0.1
 *
 **/
new function($) {
    $.fn.placeholder = function(settings) {
        settings = settings || {};
        var key = settings.dataKey || "placeholderValue";
        var attr = settings.attr || "placeholder";
        var className = settings.className || "placeholder";
        var values = settings.values || [];
        var block = settings.blockSubmit || false;
        var blank = settings.blankSubmit || false;
        var submit = settings.onSubmit || false;
        var value = settings.value || "";
        var position = settings.cursor_position || 0;

        
        return this.filter(":input").each(function(index) { 
            $.data(this, key, values[index] || $(this).attr(attr)); 
        }).each(function() {
            if ($.trim($(this).val()) === "")
                $(this).addClass(className).val($.data(this, key));
        }).focus(function() {
            if ($.trim($(this).val()) === $.data(this, key)) 
                $(this).removeClass(className).val(value)
                if ($.fn.setCursorPosition) {
                  $(this).setCursorPosition(position);
                }
        }).blur(function() {
            if ($.trim($(this).val()) === value)
                $(this).addClass(className).val($.data(this, key));
        }).each(function(index, elem) {
            if (block)
                new function(e) {
                    $(e.form).submit(function() {
                        return $.trim($(e).val()) != $.data(e, key)
                    });
                }(elem);
            else if (blank)
                new function(e) {
                    $(e.form).submit(function() {
                        if ($.trim($(e).val()) == $.data(e, key)) 
                            $(e).removeClass(className).val("");
                        return true;
                    });
                }(elem);
            else if (submit)
                new function(e) { $(e.form).submit(submit); }(elem);
        });
    };
}(jQuery);;
(function($) {
  Drupal.behaviors.holdSlider = {
    attach : function() {
      if($('.alert.holds').length) {
        this.attachHoldBehaviors();
      }
    },
    attachHoldBehaviors : function() {
      $('.alert.holds .body').addClass('element-invisible');
      $('.alert.holds .views-row h3').append('<a href="#" class="show-body">' + Drupal.t('more info') + '</a>');
      $('.alert.holds .views-row a.show-body').click(function() {
        var $body = $(this).parents('.views-row').find('.body');
        if($body.hasClass('element-invisible')) {
          $body.removeClass('element-invisible');
        }
        else {
          $body.addClass('element-invisible')
        }
        return false;
      });
    }
  };

  
  Drupal.behaviors.scrollMultipage = {
    attach : function() {
      $('.multipage-button a, .multipage-button input').click(function() { 
        $('html, body').scrollTop($("#page").offset().top);
      });
    }
  };
  
  Drupal.theme.prototype.multipage = function (settings) {
    var controls = {};
    controls.item = $('<span class="multipage-button"></span>');
    controls.item.append(controls.nextLink = $('<input type="button" class="form-submit multipage-link-next" value="" />').val(controls.nextTitle = Drupal.t('Next page')));
    controls.item.prepend(controls.previousLink = $('<a class="multipage-link-previous element-invisible" href="#"></a>'));
    if (!settings.has_next) {
      controls.nextLink.hide();
    }
    if (settings.has_previous) {
      controls.previousLink.append(controls.previousTitle = $('<strong></strong>').text(Drupal.t('Previous')))
                           .removeClass('element-invisible');
    }
    return controls;
  };

  
})(jQuery);;
