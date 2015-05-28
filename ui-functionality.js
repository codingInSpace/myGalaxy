$(function() {
	$( ".planet_radius_slider" ).slider({
		min: 30,
		max: 600,
		value: 80,
		step: 1,
		slide: function(event, ui) {
			// activePlanet.position.x = ui.value;  påverkar inte

			// Find planet's torus replace
			for (var i = 0; i < planetPaths.length; ++i) {
				if (planetPaths[i][0] == activePlanet) {
					if(planetPaths[i][1]) {
						sunSphere.remove(planetPaths[i][1]);
						var newPath = addOrbitPath(ui.value);
						sunSphere.add(newPath);
						planetPaths[i][1] = newPath;
						planetOrbitRadiuses[i][1] = ui.value;
					} else {
						console.log("error: path not found");
					}
				}
			}
		}
	});
});

$(function() {
	$( ".planet_size_slider" ).slider({
		min: 1,
		max: 5,
		value: 1,
		step: 0.01,
		slide: function(event, ui) {
			activePlanet.scale.x = ui.value;
			activePlanet.scale.y = ui.value;
			activePlanet.scale.z = ui.value;

			// update planet size array
			for (var i = 0; i < planetSizes.length; ++i) {
				if(planetSizes[i][0] == activePlanet) {
					planetSizes[i][1] = ui.value;
				}
			}
		}

		// change: function( event, ui ) {
		// 	// update planet size array
		// 	for (var i = 0; i < planetSizes.length; ++i) {
		// 		planetSizes[i][1] = ui.value;
		// 	}
		// }
	});
});

$(function() {
	$( ".planet_rotation_slider" ).slider({
		min: 0.001,
		max: 0.05,
		value: 0.001,
		step: 0.001,
		change: function(event, ui) {
			for (var i = 0; i < planetSpeeds.length; ++i) {
				if (planetSpeeds[i][0] == activePlanet) {	//where first element is active planet
					if(planetSpeeds[i][1] != ui.value) {
						planetSpeeds[i][2] = planetSpeeds[i][1];
					}
					
					planetSpeeds[i][1] = ui.value;		//change second element to slider value
					planetSpeeds[i][3] = time;
				}
			}

			// updatePlanet();
		}
	});
});

$(document).ready(function(){
	$('.meteor-check').iCheck({
		checkboxClass: 'icheckbox_square-yellow',
		increaseArea: '20%' // optional
	});
	$('.meteor-check').on('ifChecked', function(event){
		for (var i = 0; i < meteorbelts.length; ++i) {
			if (meteorbelts[i][0] == activePlanet) {
				mesh = meteorbelts[i][0];	//Extraxt clicked-mesh from array
				visibility(mesh.children[3],true); //Show clicked background
			}
		}
	});
	$('.meteor-check').on('ifUnchecked', function(event){
		for (var i = 0; i < meteorbelts.length; ++i) {
			if (meteorbelts[i][0] == activePlanet) {
				mesh = meteorbelts[i][0];	//Extraxt clicked-mesh from array
				visibility(mesh.children[3],false); //Show clicked background
			}
		}
	});
});


$(function() {
	$( "#moon-radius-slider" ).slider({
		min: 20,
		max: 40,
		value: 20,
		step: 1,
		slide: function(event, ui) {
			for (var i = 0; i < moonPaths.length; ++i) {
				if (moonPaths[i][0] == activeMoon) {
					moonOrbitRadiuses[i][1] = ui.value; 
					activeMoon.parent.remove(moonPaths[i][1]); 

					var newPath = addMoonOrbitPath(ui.value);
					activeMoon.parent.add(newPath);
					moonPaths[i][1] = newPath;
				}
			}
		}
	});
});

$(function() {
	$( "#moon-rotation-slider" ).slider({
		min: 0.001,
		max: 0.01,
		value: 0.001,
		step: 0.001,
		slide: function(event, ui) {
			for (var i = 0; i < moonSpeeds.length; ++i) {
				if (moonSpeeds[i][0] == activeMoon) {	//where first element is active planet
					moonSpeeds[i][1] = ui.value;		//change second element to slider value
				}
			}
		}
	});
});

$(document).ready(function() {     
    $('.earth-tex-img').click(function() {
        updatePlanetTexture('earthmap.jpg');
    });    
});

$(document).ready(function() {     
    $('.alien-tex-img').click(function() {
        updatePlanetTexture('alien.jpg');
        console.log("alien clicked");
    });    
});

$(document).ready(function() {     
    $('.cloudy-tex-img').click(function() {
        updatePlanetTexture('cloudy.jpg');
    });    
});

$(document).ready(function() {     
    $('.desolate-tex-img').click(function() {
        updatePlanetTexture('desolate.png');
    });    
});

$(document).ready(function() {     
    $('.klendathu-tex-img').click(function() {
        updatePlanetTexture('klendathu.png');
    });    
});

$(document).ready(function() {     
    $('.sandy-tex-img').click(function() {
        updatePlanetTexture('sandy.jpg');
    });    
});

$(document).ready(function() {     
    $('.scarl-tex-img').click(function() {
        updatePlanetTexture('scarl.png');
    });    
});

$(document).ready(function() {     
    $('.steel-tex-img').click(function() {
        updatePlanetTexture('steeltexture.jpg');
    });    
});

$(function() {
$( "#accordion" ).accordion({
  collapsible: true,
  active: false,
  animate:'linear',
  animate:300
});
});

$(function() {
$( "#texture-accordion" ).accordion({
  collapsible: true,
  active: false,
  animate:'linear',
  animate:300
});
});

$(document).ready(function() {     
    $('#add-planet-button').click(function() {
        selectPlanetsOk = false;

        //reset slider values to inital values
        $( ".planet_radius_slider" ).slider( "option", "value", 80 );
		$( ".planet_size_slider" ).slider( "option", "value", 1 );
		$('.planet_rotation_slider').slider( "option", "value", 0.001 );

        menusOnCreatePlanet();
        addPlanet(0, 0, "", "earthmap.jpg", 80, 1, 0.001, false);
    });    
});


$(document).ready(function() {     
    $('#music-button').click(function() {
       if(!musicOn){
       	    song1.play();
       		document.getElementById("play-pause-icon").className = "fa fa-pause fa-fw fa-2x";
       		musicOn = true;
       }else{
       	    song1.pause();
       		document.getElementById("play-pause-icon").className = "fa fa-play fa-fw fa-2x";
       		musicOn = false;
       }
    });    
});

$(document).ready(function() {     
    $('#sound-button').click(function() {
        if(!soundOn){
        		soundOn = true;
        		document.getElementById("sound-check-icon").className = "fa fa-volume-up fa-fw fa-2x";
        }else{
        		soundOn = false;
        		document.getElementById("sound-check-icon").className = "fa fa-volume-off fa-fw fa-2x";
        }
    });    
});


$(document).ready(function() {     
    $('#add-moon-button').click(function() {
        // selectPlanetsOk = false;   går inte än
        addMoon();
        buttonsOnAddMoon();
    });    
});

$(document).ready(function() {     
    $('#save_planet_button').click(function() {
    	var name = $('#planet-name-field').val();

    	for (var i = 0; i < planetNames.length; ++i) {
    		if (planetNames[i][0] == activePlanet) {
    			planetNames[i][1] = name;
    		}
    	}

        selectPlanetsOk = true;
		menusOnSave();
		menusOnPlanetActive();
		updatePlanetInDB();
    });    
});

$(document).ready(function() {     
    $('#edit-planet-button').click(function() {
        selectPlanetsOk = false;

        var radius;
		for (var i = 0; i < planetPaths.length; ++i) {
			if (planetPaths[i][0] == activePlanet) {
				radius = planetOrbitRadiuses[i][1]; 
			}
		}

        var size;
        for (var i = 0; i < planetSizes.length; i++) {
        	if(planetSizes[i][0] == activePlanet) {
        		size = planetSizes[i][1];
        	}
        }

		var rotation;
		for (var i = 0; i < planetSpeeds.length; i++) {
			if(planetSpeeds[i][0] == activePlanet) {
				rotation = planetSpeeds[i][1];
			}
		}

        //update slider values
        $( ".planet_radius_slider" ).slider( "option", "value", radius );
		$( ".planet_size_slider" ).slider( "option", "value", size );
		$('.planet_rotation_slider').slider( "option", "value", rotation );

        menusOnEditPlanet();
    });    
});

$(document).ready(function() {     
    $('.delete-planet-button').click(function() {
    	deletePlanetFromDB();	//before deletePlanet() which sets activePlanet to null
        deletePlanet();
        selectPlanetsOk = true;
        
        if(jumpPlanetOk && jumpMoonOk) {     //viewing planet/moon
        	solarBools();
	        buttonsOnViewSystem();
    	} else {
        	menusOnDeletePlanetSystemView();
    	}

    	

    });    
});

$(document).ready(function() {     
    $('#jump-planet-button').click(function() {
    	if(!jumpInAction) {
			planetBools();
		    buttonsOnViewPlanet();
		}
    });    
});

$(document).ready(function() {     
    $('#jump-moon-button').click(function() {
    	if(!jumpInAction) {
	    	moonBools();
	        buttonsOnViewMoon();
	    }
    });    
});

$(document).ready(function() {     
    $('#jump-system-button').click(function() {
    	if(!jumpInAction) {
	    	solarBools();
	        buttonsOnViewSystem();
	    }
    });    
});

$(document).ready(function() {     
    $('#build-planet-button').click(function() {
    	selectPlanetsOk = false;
        menusOnBuildPlanet();
    });    
});

$(document).ready(function() {     
    $('.edit-done-button').click(function() {
        selectPlanetsOk = true;
        menusOnEditDone();
        updatePlanetInDB();
    });    
});

$(function() {
	$( "#edit-planet-tabs" ).tabs();
});

$(document).ready(function() {     
	$("#jump-system-button").mouseup(function(){
	    $(this).blur();
	})

	$("#jump-moon-button").mouseup(function(){
	    $(this).blur();
	})

	$("#jump-planet-button").mouseup(function(){
	    $(this).blur();
	})

	$("#add-planet-button").mouseup(function(){
	    $(this).blur();
	})

	$("#edit-planet-button").mouseup(function(){
	    $(this).blur();
	})

	$("#add-moon-button").mouseup(function(){
	    $(this).blur();
	})

	$(".edit-done-button").mouseup(function(){
	    $(this).blur();
	})

	$("#build-planet-button").mouseup(function(){
	    $(this).blur();
	})

	$("#music-button").mouseup(function(){
	    $(this).blur();
	})

	$("#sound-button").mouseup(function(){
	    $(this).blur();
	})
});
