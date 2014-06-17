


$(document).ready(function(){

    //google.maps.event.addDomListener(window, 'load', initialize);

    getLocation();

    



	$('#carousel_ul li:first').before($('#carousel_ul li:last')); 
	$('.right-scroll').click(function(){
		var item_width = $('#carousel_ul li').outerWidth() + 20; //get item width plus the margins
		var left_indent = parseInt($('#carousel_ul').css('left')) + item_width; //cancel out the left attribute

		$('#carousel_ul').animate({'left': left_indent},{queue:false, duration:500},function(){

		$('#carousel_ul li:first').after($('#carousel_ul li:last'));
		//$('#carousel_ul').css({'left' : '0px'});
		}); 
	});

    //when user clicks the image for sliding left  
    $('.left-scroll').click(function(){  
  
        var item_width = $('#carousel_ul li').outerWidth() + 20;  
  
        /* same as for sliding right except that it's current left indent + the item width (for the sliding right it's - item_width) */  
        var left_indent = parseInt($('#carousel_ul').css('left')) - item_width;  
  
        $('#carousel_ul').animate({'left' : left_indent},{queue:false, duration:500},function(){  
  
            /* when sliding to left we are moving the last item before the first item */  
        $('#carousel_ul li:last').before($('#carousel_ul li:first'));  
   
        //$('#carousel_ul').css({'left' : '0px'});  
        });  
  
    });  



    



    $('.searchForm').submit(function(event){
        event.preventDefault();



        if (!listeningToBounds)
        {
            listeningToBounds = true;
            google.maps.event.addListenerOnce(map, 'bounds_changed', performSearch);
        }

        performSearch();

    });




});//document ends

var map;
var service;
var currentLocation;
var markersOnMap = [];
var listeningToBounds = false;

function callback(results, status){
    //after I send my request, handle the results
    console.log(results);

    for (var m in markersOnMap){
        markersOnMap[m].setMap(null);
    }

    for(var i = 0; i < results.length; i++){

        var photos = results.photos;

        var marker = new google.maps.Marker({
            position: results[i].geometry.location,
            map: map,
            title: results.name,
            icon: photos[i].getUrl({'maxWidth': 35, 'maxHeight': 35})
            //icon:results[i].icon
        });
        markersOnMap.push(marker);
    }


}




function performSearch(){

    var searchFieldValue = $('.searchForm').find("input[name='food']").val();
    //what I am looking for and asking the google api
    var request = {
        bounds: map.getBounds(),
        types: ['cafe','restaurant','bakery','food'],
        keyword: searchFieldValue
        //picture: get the picture value
    };

    service.nearbySearch(request, callback);
}






function initialize(){
    
    if (!currentLocation){ //if no currentLocation, then do this...
            $('#map').hide();
            $('.loading').show();
            //currentLocation = new google.maps.LatLng(-34.397, 150.644);
    }

    //how the map should look
    var mapOptions = {
        zoom: 10,
        center: currentLocation
    };

    //map object
    map = new google.maps.Map(document.getElementById('map'),
    mapOptions);

    //map marker
    var marker = new google.maps.Marker({
    position: currentLocation,
    map: map
    });

    service = new google.maps.places.PlacesService(map);
}






function getLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(gotlocation, initialize);
    }
    else{
        alert('error');
        initialize();
    }
}
    
    



function gotlocation(pos){
  
  var crd = pos.coords;

  console.log('Your current position is:');
  console.log('Latitude : ' + crd.latitude);
  console.log('Longitude: ' + crd.longitude);
  console.log('More or less ' + crd.accuracy + ' meters.');

  currentLocation = new google.maps.LatLng(crd.latitude, crd.longitude);

  initialize();

  /*map.setCenter(currentLocation);
  

    //map marker
    var marker = new google.maps.Marker({
    position: currentLocation,
    map: map
    });*/
}





/*
var getFoodResults = function(){

    var request = {
        //properties go here (what you want)
        radius: 500,
        types: "food|cafe|restaurant",
        sensor: true,
        name: "harbour"
    };




    var result = $.ajax({
        url: "https://maps.googleapis.com/maps/api/place/nearbysearch",
        data: request,
        key: "AIzaSyAJtuQJKLEM3XhuDjlQwdWp72Oz1QILSG8",
        dataType: "JSONP",
        cache:false,
        success:function(){
            console.log(arguments);
        }

    });

};


*/




