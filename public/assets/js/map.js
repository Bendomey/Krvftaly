/* ================================================
---------- Hustle map.js For contact page------ */
(function ($) {
	"use strict";

	// Google Map api v3 - Map for contact pages
    if ( document.getElementById("map") && typeof google === "object" ) {
    	// Map pin coordinates and content of pin box
        var locations = [
            [
            	'<address><strong>Address:</strong> Madina Estate, Accra Ghana <br> <strong>Phone:</strong> +90 (211) 454 57 71</address>',
            	40.725399,
            	-73.988281
        	]
        ];

        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 13,
            center: new google.maps.LatLng(40.725399, -73.988281), // Map Center coordinates
            scrollwheel: false,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            styles: [
            		{
				        "featureType": "water",
				        "elementType": "geometry.fill",
				        "stylers": [
				            {
				                "color": "#d3d3d3"
				            }
				        ]
				    },
				    {
				        "featureType": "transit",
				        "stylers": [
				            {
				                "color": "#808080"
				            },
				            {
				                "visibility": "off"
				            }
				        ]
				    },
				    {
				        "featureType": "road.highway",
				        "elementType": "geometry.stroke",
				        "stylers": [
				            {
				                "visibility": "on"
				            },
				            {
				                "color": "#b3b3b3"
				            }
				        ]
				    },
				    {
				        "featureType": "road.highway",
				        "elementType": "geometry.fill",
				        "stylers": [
				            {
				                "color": "#ffffff"
				            }
				        ]
				    },
				    {
				        "featureType": "road.local",
				        "elementType": "geometry.fill",
				        "stylers": [
				            {
				                "visibility": "on"
				            },
				            {
				                "color": "#ffffff"
				            },
				            {
				                "weight": 1.8
				            }
				        ]
				    },
				    {
				        "featureType": "road.local",
				        "elementType": "geometry.stroke",
				        "stylers": [
				            {
				                "color": "#d7d7d7"
				            }
				        ]
				    },
				    {
				        "featureType": "poi",
				        "elementType": "geometry.fill",
				        "stylers": [
				            {
				                "visibility": "on"
				            },
				            {
				                "color": "#ebebeb"
				            }
				        ]
				    },
				    {
				        "featureType": "administrative",
				        "elementType": "geometry",
				        "stylers": [
				            {
				                "color": "#a7a7a7"
				            }
				        ]
				    },
				    {
				        "featureType": "road.arterial",
				        "elementType": "geometry.fill",
				        "stylers": [
				            {
				                "color": "#ffffff"
				            }
				        ]
				    },
				    {
				        "featureType": "road.arterial",
				        "elementType": "geometry.fill",
				        "stylers": [
				            {
				                "color": "#ffffff"
				            }
				        ]
				    },
				    {
				        "featureType": "landscape",
				        "elementType": "geometry.fill",
				        "stylers": [
				            {
				                "visibility": "on"
				            },
				            {
				                "color": "#efefef"
				            }
				        ]
				    },
				    {
				        "featureType": "road",
				        "elementType": "labels.text.fill",
				        "stylers": [
				            {
				                "color": "#696969"
				            }
				        ]
				    },
				    {
				        "featureType": "administrative",
				        "elementType": "labels.text.fill",
				        "stylers": [
				            {
				                "visibility": "on"
				            },
				            {
				                "color": "#737373"
				            }
				        ]
				    },
				    {
				        "featureType": "poi",
				        "elementType": "labels.icon",
				        "stylers": [
				            {
				                "visibility": "off"
				            }
				        ]
				    },
				    {
				        "featureType": "poi",
				        "elementType": "labels",
				        "stylers": [
				            {
				                "visibility": "off"
				            }
				        ]
				    },
				    {
				        "featureType": "road.arterial",
				        "elementType": "geometry.stroke",
				        "stylers": [
				            {
				                "color": "#d6d6d6"
				            }
				        ]
				    },
				    {
				        "featureType": "road",
				        "elementType": "labels.icon",
				        "stylers": [
				            {
				                "visibility": "off"
				            }
				        ]
				    },
				    {},
				    {
				        "featureType": "poi",
				        "elementType": "geometry.fill",
				        "stylers": [
				            {
				                "color": "#dadada"
				            }
				        ]
				    }
				]
        });

        var infowindow = new google.maps.InfoWindow();


        var marker, i;

        for ( i = 0; i < locations.length; i++ ) {  
          marker = new google.maps.Marker({
            position: new google.maps.LatLng(locations[i][1], locations[i][2]),
            map: map,
            animation: google.maps.Animation.DROP,
            icon: 'assets/images/pin.png'
          });

          google.maps.event.addListener(marker, 'click', (function (marker, i) {
            return function() {
              infowindow.setContent(locations[i][0]);
              infowindow.open(map, marker);
            }
          })(marker, i));
        }
    }
})(jQuery);