Rounded
===========

Rounded is a simple Mootools class that help you to obtain round corners on each element on your page.

![Screenshot](http://franziale.netsons.org/Rounded/screen.png)

How to Use
----------

It's very easy to use this component. You can use it on each object in your document.
In this sample I use Rounded to obtain rounded corners on my div. In the first div I use the default radius (10px),
in the second sample, in the second I specify a different value (5px)
### HTML
	<div id="first" style="background-color : #cccccc; width : 200px;height:30px; padding-left:1em"> 
		First sample (default corner)
	</div>
	<div id="second" style="background-color : #cccccc; width : 200px;height:30px; padding-left:1em"> 
		Second sample (corner 5px)
	</div>


You can initialize corners on 'domready' event of your document

### Javascript
	window.addEvent('domready', function() {
		// round first div
		var myRound = new Rounded($$("#first"));
		// select radius in px
		var opt = {
	    	radius : "5px"
	    }
		// round second div
		var myRound = new Rounded($$("#second"),opt);
	});
	
The possible options are the follows :

	radius: radius in pixel for your rounded corners,
    selector: default selector if not specified,
    cornered: css class used after transformation
