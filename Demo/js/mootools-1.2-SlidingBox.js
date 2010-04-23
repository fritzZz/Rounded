/*
---
description: SlidingBox
 
authors:
- Alessandro Franzi aka fritzzz (http://franziale.blogspot.com)
 
license:
- MIT-style license
 
requires:
core/1.2.4: '*'
Rounded/0.9 '*'
 
provides:
- SlidingBox
...
*/
var SlidingBox = new Class({

    Implements: [Options, Events],

    options: {
    	delay : 0,
    	openOnStart : true,
        onchange : function(){  }
    },
    
    status : 'unlocked',
    
    initialize: function(selector, options, onChange) {
        this.setOptions(options);
        var params = Array.link(arguments, {'container': Element.type, 'options': Object.type, 'togglers': $defined, 'elements': $defined});
        
        var content = $(selector);
        if ($defined(content)){
        
        	// creating object
        	var box  = new Element('div', {'class': 'box'});
        	var boxAll  = new Element('div', {'class': 'box-all'});
        	var boxSlider  = new Element('div', {'class': 'boxSlider'});
        	var closeDiv = new Element ('div', {'class' : 'closeDiv'});
        	var newContent = new Element ('div', {'class' : 'boxSlider-int'});
        	var newH2 = new Element ('h2', {'class' : 'foo'});
        	var buttonClose = new Element ('a', {'class' : 'closeButton', 'href' : '#', 'html' : ''});
        	var buttonOpen = new Element ('a', {'class' : 'openButton', 'href' : '#', 'html' : ''});
        	
        	// retrieving content
        	var h2 = content.getChildren("h2");
        	newH2.set('html',h2.get('html'));
        	content.getChildren("h2").dispose();
        	newContent.set('html',content.get('html'));
        	
        	// dispose original content
        	content.set('html','');
        	
        	// injecting object
        	if (this.options.openOnStart){
        		closeDiv.grab(buttonClose);
        	}else{
        		closeDiv.grab(buttonOpen);
        	}
        	boxSlider.grab(closeDiv);
        	newH2.inject(boxSlider);
        	newContent.inject(boxSlider);
        	boxAll.grab(boxSlider);
        	box.grab(boxAll);
        	content.grab(box);
        	
        	// round box
        	var myRound = new Rounded(box);
        	
        	this.elementToSlide = boxSlider;
        	this.title = newH2;
        	this.buttonDiv = closeDiv;
        	this.buttonOff = buttonClose;
        	this.buttonOn = buttonOpen;
        	
        	buttonClose.addEvent('click',this.closeDiv.bind(this));
        	buttonOpen.addEvent('click',this.openDiv.bind(this));
        	
        	// creating FX
        	this.myVerticalSlide = new Fx.Slide(newContent);
        	this.myVerticalSlide.addEvent('complete', this.changeButton.bind(this));
        	
        	if (!this.options.openOnStart){
        		newContent.fade(0);
				this.myVerticalSlide.hide();
        	}
        	
        }
    },
    
    closeDiv: function (e){
    	e.stop();
    	if (this.status == 'unlocked'){
    		this.options.openOnStart = false;
    		this.status = "loked";
    		this.myVerticalSlide.slideOut();
			this.title.tween('border', '0px');
    	}
    },
    
    openDiv: function(e){
    	e.stop();
    	if (this.status == 'unlocked'){
    		this.options.openOnStart = true;
    		this.status = "loked";
    		this.myVerticalSlide.slideIn();
    		this.elementToSlide.fade(1);
			this.title.erase('style');
    	}
    },
    
    changeButton : function(){
		if (!this.options.openOnStart){
			// ho appena chiuso
			this.buttonDiv.set('html','');
			this.buttonDiv.grab(this.buttonOn);
		}else{
			// ho appena aperto
			this.buttonDiv.set('html','');
			this.buttonDiv.grab(this.buttonOff);
		}
		this.status = 'unlocked';
				
    }
});