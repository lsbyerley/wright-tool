(function(window, document, $) {
	'use strict';

    var CustomGoogleMap = {

        init: function() {
            var $latitude = 36.436095,
        		$longitude = -82.2996777,
        		$map_zoom = 14;

            //google map custom marker icon - .png fallback for IE11
        	var is_internetExplorer11= navigator.userAgent.toLowerCase().indexOf('trident') > -1;
        	var $marker_url = ( is_internetExplorer11 ) ? 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/148866/cd-icon-location.png' : 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/148866/cd-icon-location_1.svg';


            var style = [];

            //set google map options
        	var map_options = {
              	center: new google.maps.LatLng($latitude, $longitude),
              	zoom: $map_zoom,
              	panControl: false,
              	zoomControl: false,
              	mapTypeControl: false,
              	streetViewControl: false,
              	mapTypeId: google.maps.MapTypeId.ROADMAP,
              	scrollwheel: false,
              	styles: style,
            }
            //inizialize the map
        	var map = new google.maps.Map(document.getElementById('google-container'), map_options);
        	//add a custom marker to the map
        	var marker = new google.maps.Marker({
        	  	position: new google.maps.LatLng($latitude, $longitude),
        	    map: map,
        	    visible: true,
        	 	icon: $marker_url,
        	});

            //add custom buttons for the zoom-in/zoom-out on the map
        	function CustomZoomControl(controlDiv, map) {
        		//grap the zoom elements from the DOM and insert them in the map
        	  	var controlUIzoomIn= document.getElementById('cd-zoom-in'),
        	  		controlUIzoomOut= document.getElementById('cd-zoom-out');
        	  	controlDiv.appendChild(controlUIzoomIn);
        	  	controlDiv.appendChild(controlUIzoomOut);

        		// Setup the click event listeners and zoom-in or out according to the clicked element
        		google.maps.event.addDomListener(controlUIzoomIn, 'click', function() {
        		    map.setZoom(map.getZoom()+1)
        		});
        		google.maps.event.addDomListener(controlUIzoomOut, 'click', function() {
        		    map.setZoom(map.getZoom()-1)
        		});
        	}

        	var zoomControlDiv = document.createElement('div');
         	var zoomControl = new CustomZoomControl(zoomControlDiv, map);

          	//insert the zoom div on the top left of the map
          	map.controls[google.maps.ControlPosition.LEFT_TOP].push(zoomControlDiv);
        }

    }

    module.exports = CustomGoogleMap;

})(window, document, window.cash);
