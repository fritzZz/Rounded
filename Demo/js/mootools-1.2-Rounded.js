/*
---
description: Rounded
 
authors:
- Alessandro Franzi aka fritzzz (http://franziale.blogspot.com)
 
license:
- MIT-style license
 
requires:
core/1.2.4: '*'
 
provides:
- Rounded
...
*/
var Rounded = new Class({

	Implements: [Events, Options],

	options: {
		radius: "10px",
        selector: ".gc",
        cornered: "good-cornered"
	},
	
	styles : {
        gecko: {
            topleft: "-moz-border-radius-topleft",
            topright: "-moz-border-radius-topright",
            bottomleft: "-moz-border-radius-bottomleft",
            bottomright: "-moz-border-radius-bottomright",
            radius: "-moz-border-radius"
        },
        webkit: {
            topleft: "-webkit-border-top-left-radius",
            topright: "-webkit-border-top-right-radius",
            bottomleft: "-webkit-border-bottom-left-radius",
            bottomright: "-webkit-border-bottom-right-radius",
            radius: "-webkit-border-radius"
        }
    },
	
	initialize: function(element,options){
		this.setOptions(options);
		var params = Array.link(arguments, {'container': Element.type, 'options': Object.type, 'togglers': $defined, 'elements': $defined});
		
		// retrieve browser engine
		this.BE = Browser.Engine,
		this.layout = null;
		if (this.BE.webkit) {
	        this.layout = "webkit";
	    }
	    if (this.BE.gecko) {
	        this.layout = "gecko";
	    }
		if (this.layout == null) {
        	return false;
        }

        // Round corner
        this.how = new Hash(this.how || {
            radius: this.options.radius
        });
        this.how.each(function (value, key, obj) {
            // ignore other styles completly
            if ($defined(this.styles[this.layout][key]) == false) {
                return;
            }
            this.how.set(this.styles[this.layout][key], value);
            this.how.erase(key);
        }.bind(this));

        // Attach css class
        if (element!=null){
        	element.setStyles(this.how.getClean()).addClass(this.options.cornered);
        }else{
        	$$(this.options.selector).setStyles(this.how.getClean()).addClass(this.options.cornered);
        }
        return true;
	}
});