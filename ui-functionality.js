$(document).ready(function() {
	$(function() {
		$( ".planet_radius_slider" ).slider({
			min: 130,
			max: 900,
			value: 150,
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
			max: 4,
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
			min: 0.01,
			max: 0.25,
			value: 0.01,
			step: 0.01,
			change: function(event, ui) {
				for (var i = 0; i < planetSpeeds.length; ++i) {
					if (planetSpeeds[i][0] == activePlanet) {	//where first element is active planet
						if(planetSpeeds[i][1] != ui.value) {

							if(planetSpeeds[i][4] == 0){
								planetSpeeds[i][4] = planetSpeeds[i][1] * time;
							} else {
								planetSpeeds[i][4] = planetSpeeds[i][4] + (time-planetSpeeds[i][3])*planetSpeeds[i][1];
							}
							//Change third element to old rotationspeed.
							planetSpeeds[i][2] = planetSpeeds[i][1];
							//Save the point of time as the fourth element.
							planetSpeeds[i][1] = ui.value;		//change second element to slider value
							planetSpeeds[i][3] = time ;
						}
					}
				}

				// updatePlanet();
			}
		});
	});

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

		for (var i = 0; i < planetMeteorbeltStates.length; ++i) {
			if (activePlanet == planetMeteorbeltStates[i][0]) {
				planetMeteorbeltStates[i][1] = true;
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

		for (var i = 0; i < planetMeteorbeltStates.length; ++i) {
			if (activePlanet == planetMeteorbeltStates[i][0]) {
				planetMeteorbeltStates[i][1] = false;
			}
		}
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
			min: 0.1,
			max: 1,
			value: 0.1,
			step: 0.1,
			slide: function(event, ui) {
				for (var i = 0; i < moonSpeeds.length; ++i) {
					if (moonSpeeds[i][0] == activeMoon) {	//where first element is active planet

						if(moonSpeeds[i][1] != ui.value) {

							if(moonSpeeds[i][4] == 0){
								moonSpeeds[i][4] = moonSpeeds[i][1] * time;
							} else {
								moonSpeeds[i][4] = moonSpeeds[i][4] + (time-moonSpeeds[i][3])*moonSpeeds[i][1];
							}
							//Change third element to old rotationspeed.
							moonSpeeds[i][2] = moonSpeeds[i][1];
							//Save the point of time as the fourth element.
							moonSpeeds[i][1] = ui.value;		//change second element to slider value
							moonSpeeds[i][3] = time ;
						}
					}
				}
			}
		});
	});

    $('.earth-tex-img').click(function() {
        updatePlanetTexture('earthmap.jpg');
    });    

    $('.alien-tex-img').click(function() {
        updatePlanetTexture('alien.jpg');
    });    

    $('.cloudy-tex-img').click(function() {
        updatePlanetTexture('cloudy.jpg');
    });    

    $('.desolate-tex-img').click(function() {
        updatePlanetTexture('desolate.png');
    });    

    $('.klendathu-tex-img').click(function() {
        updatePlanetTexture('klendathu.png');
    });    

    $('.sandy-tex-img').click(function() {
        updatePlanetTexture('sandy.jpg');
    });    

    $('.scarl-tex-img').click(function() {
        updatePlanetTexture('scarl.png');
    });    

    $('.steel-tex-img').click(function() {
        updatePlanetTexture('steeltexture.jpg');
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

    $('#add-planet-button').click(function() {
        if(user) {
        	deselect();
	        selectPlanetsOk = false;

	        addPlanet(0, 0, "", "earthmap.jpg", 150, 1, 0.001, false, false);

	        //reset slider values to inital values
	        $( ".planet_radius_slider" ).slider( "option", "value", 150 );
			$( ".planet_size_slider" ).slider( "option", "value", 1 );
			$('.planet_rotation_slider').slider( "option", "value", 0.001 );

	        menusOnCreatePlanet();
	    }
    });    

    $('#music-button').click(function() {
       if(!musicOn){
       	    song1.play();
       		document.getElementById("play-pause-icon").className = "fa fa-pause fa-fw fa-1x";
       		musicOn = true;
       }else{
       	    song1.pause();
       		document.getElementById("play-pause-icon").className = "fa fa-play fa-fw fa-1x";
       		musicOn = false;
       }
    });    

    $('#sound-button').click(function() {
        if(!soundOn){
        		soundOn = true;
        		document.getElementById("sound-check-icon").className = "fa fa-volume-up fa-fw fa-1x";
        }else{
        		soundOn = false;
        		document.getElementById("sound-check-icon").className = "fa fa-volume-off fa-fw fa-1x";
        }
    });    

    $('#add-moon-button').click(function() {
        // selectPlanetsOk = false;   går inte än
        addMoon();
        buttonsOnAddMoon();
    });    

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

    $('#edit-planet-button').click(function() {
        
    	if(user && editAccess) {
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
			$( ".planet_rotation_slider" ).slider( "option", "value", rotation );

			//update meteor state checkbox
			for (var i = 0; i < planetMeteorbeltStates.length; ++i) {
				if (activePlanet == planetMeteorbeltStates[i][0]) {
					if(planetMeteorbeltStates[i][1]) {
						$('.meteor-check').iCheck('check');
					} else {
						$('.meteor-check').iCheck('uncheck');						
					}

				}
			};

	        menusOnEditPlanet();
	    }

	    else {
	    	console.log("user has no access to edit this planet");
	    }
    });    

    $('.delete-planet-button').click(function() {
    	deletePlanetFromDB();	//before removePlanet() which sets activePlanet to null
        removePlanet();	//removing all planets false
        selectPlanetsOk = true;
        
        if(jumpPlanetOk && jumpMoonOk) {     //viewing planet/moon
        	solarBools();
	        buttonsOnViewSystem();
    	} else {
        	menusOnDeletePlanetSystemView();
    	}
    });    

    $('#jump-planet-button').click(function() {
    	if(!jumpInAction) {
			planetBools();
		    buttonsOnViewPlanet();
		}
    });    

    $('#jump-moon-button').click(function() {
    	if(!jumpInAction) {
	    	moonBools();
	        buttonsOnViewMoon();
	    }
    });    

    $('#jump-system-button').click(function() {
    	if(!jumpInAction) {
	    	solarBools();
	        buttonsOnViewSystem();
	    }
    });    

    $('#build-planet-button').click(function() {
    	
    	if(user && editAccess) {
	    	selectPlanetsOk = false;
	        menusOnBuildPlanet();
	    }
	    
        else {
	    	console.log(user.getUsername() + " has no access to edit this planet");
	    }
    });    

    $('.edit-done-button').click(function() {
        selectPlanetsOk = true;
        menusOnEditDone();
        updatePlanetInDB();
    });    

	$(function() {
		$( "#edit-planet-tabs" ).tabs();
	});

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

	$(".room-container").slideupmenu({
		slideUpSpeed: 150, 
		slideDownSpeed: 200, 
		ease: "easeOutQuad", 
		stopQueue: true
	});  

    $('#solar-room').click(function() {
    	changeSolarSystem("Solar System");
    });  

    $('#kaiser-room').click(function() {
    	changeSolarSystem("Kaiser Crescent");
    });

    $('#sixten-room').click(function() {
    	changeSolarSystem("Sixten Sigma");
    });   

    $('#morbit-room').click(function() {
    	changeSolarSystem("Morbit Nebula");
    });   

    $('#k4-room').click(function() {
    	changeSolarSystem("K4 Cluster");
    });     
});