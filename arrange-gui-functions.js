function menusOnLogin() {
	// Hide login/create menus
    $('#login').hide("fast");
    $('#register').hide("fast");

    // Show user menu with username
    $('#user_menu').show("fast");
    $(".user_info").text(user.getUsername());
    $("#sound-button-container").css({"bottom": "120px" });  //move out
}

function menusOnLogout() {
    // Hide user menu and show login/create menus
    $('#user_menu').hide("fast");
    $('#login').show("fast");
    $('#register').show("fast");

    $("#sound-button-container").css({"bottom": "80px" });
}

function menusOnCreatePlanet() {
	$('#add-planet-button').hide();
    $('#planet-info-container').hide();
    $('.edit-created-planet-container').show("fast");
    $('#jump-planet-button').show();
    $("#jump-planet-moon-container").css({"right": "240px" });  //move out 

}

function menusOnSave() {
    $('#add-planet-button').show();
    $('.edit-created-planet-container').hide("fast");
    $('#jump-planet-button').show();
    $("#jump-planet-moon-container").css({"right": "120px" });  //move in
}

// When planet selected and editable
function menusOnPlanetActive() {
    $('#edit-planet-button').show();
}

// When edit-planet button is pressed
function menusOnEditPlanet() {
    $('#add-planet-button').hide();
    $('#edit-planet-button').hide();
    $('#planet-info-container').hide();
    $('#edit-planet-tabs').show();
    $("#jump-planet-moon-container").hide();
    //$("#jump-planet-moon-container").css({"right": "240px" });  //move out
}

function menusOnBuildPlanet() {
    $('#build-planet-button').hide();
    $('#add-planet-button').hide();
    $('#edit-planet-button').hide();
    $('#planet-info-container').hide();
    $('#accordion-container').show();
    $("#jump-planet-moon-container").css({"right": "240px" });  //move out
    $("#jump-system-container").hide();
}

function menusOnEditDone() {
    $('#edit-planet-tabs').hide();
    $('#accordion-container').hide();
    $("#jump-system-container").show();
    $("#jump-planet-moon-container").css({"right": "120px" });  //move in

    if(!jumpPlanetOk && !jumpMoonOk) {     //not viewing planet/moon
        $("#jump-planet-moon-container").show();
        $('#edit-planet-button').show();
        $('#add-planet-button').show();
    } else {
        $('#build-planet-button').show();   //viewing planet/moon

    }
}

// Toggle on any hidden standard buttons when planet is clicked
function showButtonsForActivePlanet() {
    if( !$('#edit-planet-button').is(":visible") ){
        $('#edit-planet-button').show(); 
    }

    $('#jump-planet-button').show();

    if( !$('#jump-planet-moon-container').is(":visible") ){
        $('#jump-planet-moon-container').show();
        $('#jump-moon-button').hide();  //hide until moon active
    }

}

function showPlanetInfoBox(planetName, ownerName) {
    $('#planet-info-container').show("fast");

    if(!planetName)
        $('#planet-info-name').text("Nameless");
    else
        $('#planet-info-name').text(planetName);

    $('#planet-info-owner').text("By " + ownerName);
}

function menusOnDeletePlanetSystemView() {
    $('#edit-planet-tabs').hide();
    $('#accordion-container').hide();
    $('#planet-info-container').hide();
    $("#jump-planet-moon-container").css({"right": "120px" });  //move in
    $("#jump-planet-moon-container").hide();
    $('#add-planet-button').show();
}

function menusOnDeselect() {
    $('#edit-planet-tabs').hide();
    $('#accordion-container').hide();
    $("#jump-planet-moon-container").css({"right": "120px" });  //move in
    $('#planet-info-container').hide();
    $('#jump-planet-button').hide();
    $('#planet-info-container').hide();

    if(!jumpPlanetOk && !jumpMoonOk) {     //not viewing planet/moon
        $('#edit-planet-button').hide();
        $('#add-planet-button').show();
    } else {
        $('#build-planet-button').show();   //viewing planet/moon

    }
}

function buttonsOnAddMoon() {
    $('#jump-moon-button').show();
}

// When zoomed in on planet
function buttonsOnViewPlanet() {
    if(soundOn)
        document.getElementById('multiaudio6').play();

    $('#add-planet-button').hide();
    $('#jump-planet-button').hide();
    $('#planet-info-container').hide();
    $('#build-planet-button').show();
    $('#edit-planet-button').hide();
    $('#edit-planet-tabs').hide();
    $('#accordion-container').hide();

    if(thereAreMoons)
        $('#jump-moon-button').show();
}

// When zoomed in on moon
function buttonsOnViewMoon() {
    if(soundOn)
        document.getElementById('multiaudio6').play();

    $('#add-planet-button').hide();
    $('#jump-moon-button').hide();
    $('#planet-info-container').hide();
    $("#jump-planet-moon-container").css({"right": "120px" });  //move in
    $('#build-planet-button').show();
    $('#edit-planet-button').hide();
    $('#edit-planet-tabs').hide();
    $('#accordion-container').hide();
}

// When viewing system
function buttonsOnViewSystem() {
    if(soundOn)
        document.getElementById('multiaudio7').play();

    $('#build-planet-button').hide();
    $('#add-planet-button').show();
    $("#jump-planet-moon-container").css({"right": "120px" });  //move in
    $('#accordion-container').hide();

    // console.log("viewing system");

    if(thereArePlanets && activePlanet) {
        $('#jump-planet-button').show();
        $('#edit-planet-button').show();
    }

    if(thereAreMoons)
        $('#jump-moon-button').show();
}

function buttonsForLoggedInUser() {
    $('#add-planet-button').css({"color": "rgb(245, 229, 215)",
                                  "opacity": "1.0"});
    $('#edit-planet-button').css({"color": "rgb(245, 229, 215)",
                                      "opacity": "1.0"});
    $('#build-planet-button').css({"color": "rgb(245, 229, 215)",
                                  "opacity": "1.0"});
}

function buttonsForNonLoggedInUser() {
    $('#add-planet-button').css({"color": "rgb(60, 60, 60)",
                                  "opacity": "0.7"});
    $('#edit-planet-button').css({"color": "rgb(60, 60, 60)",
                                  "opacity": "0.7"});
    $('#build-planet-button').css({"color": "rgb(60, 60, 60)",
                                  "opacity": "0.7"});
}
