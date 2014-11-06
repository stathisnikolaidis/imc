var imc_mod_map;
function imc_mod_map_initialize() {
	var latitude = 40.62,
	    longitude = 22.96,
	    center = new google.maps.LatLng(latitude,longitude);


  var mapOptions = {
    zoom: 14,
    center: center
  };
  imc_mod_map = new google.maps.Map(document.getElementById('imc-map-canvas'),
      mapOptions);

  setMarkers(center, imc_mod_map);
}

function setMarkers(center, map) {
    var json = (function () { 
        var json = null; 
        jQuery.ajax({ 
            'async': true, 
            'global': false, 
            'url': "index.php?option=com_imc&task=issues.markers&format=json", 
            'dataType': "json", 
            'success': function (data) {
                json = data; 



      			    //loop between each of the json elements
      			    for (var i = 0, length = json.data.length; i < length; i++) {
      			        var data = json.data[i],
      			        latLng = new google.maps.LatLng(data.latitude, data.longitude); 

  			            // Create marker and putting it on the map
  			            var imc_mod_marker = new google.maps.Marker({
  			                position: latLng,
  			                map: map,
  			                title: data.title
  			            });
  			            infoBox(map, imc_mod_marker, data);

  			            if(data.state == 0){
  			            	imc_mod_marker.setIcon('http://maps.google.com/mapfiles/ms/icons/blue-dot.png');
  			            }
      			    }


             }
        });
        return json;
    })();


}


function infoBox(map, marker, data) {
    var infoWindow = new google.maps.InfoWindow();
    // Attaching a click event to the current marker
    google.maps.event.addListener(marker, "click", function(e) {
        infoWindow.setContent(data.title);
        infoWindow.open(map, marker);
    });

    // Creating a closure to retain the correct data 
    // Pass the current data in the loop into the closure (marker, data)
    (function(marker, data) {
      // Attaching a click event to the current marker
      google.maps.event.addListener(marker, "click", function(e) {
        infoWindow.setContent(data.title);
        infoWindow.open(map, marker);
      });
    })(marker, data);
}