SlidingBox
===========

SlidingBox is a simple Mootools class that help you to obtain sliding box that sobstitute divs in your page.

![Screenshot](http://franziale.netsons.org/SlidingBox/screen.png)

How to Use
----------

It's very easy to use this component. You can use it on each div in your document.

### HTML
	<div id="mybox">
		<h2>My Box Sample</h2>
		content
	</div>


You can initialize sliding box on 'domready' event of your document

### Javascript
	window.addEvent('domready', function(){
		var mySlider = new SlidingBox("mybox");
	});
	
The possible options are the follows :

	openOnStart: default true, if false the div will be close when you're page is loaded
