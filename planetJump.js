var cameraPosX, cameraPosY, cameraPosZ, controlsRotSpeed, zoomLevel, moonPosX, moonPosY, maxRadius;

//Bigger number, further away from object
var planetZoom = 1.6;
var moonZoom = 0.5;
var galaxyZoom = 650;
jumpInAction = false;
smallJump = false;

function planetBools(){
	if(jumpMoonOk){
		smallJump = true;		
	} else {
		smallJump = false;
	}

	if(!jumpInAction) {
		if(activePlanet){
			jumpPlanetOk = true;
			jumpMoonOk = false;
			jumpSolarOk = false;
		}
	}
}

function moonBools(){
	if(jumpPlanetOk){
		smallJump = true;
	} else {
		smallJump = false;
	}
	if(!jumpInAction)
		if(activeMoon){
			jumpPlanetOk = false; 
			jumpMoonOk = true; 
			jumpSolarOk = false;
		}
}
function solarBools(){
	if(jumpSolarOk)
		resetSolarView = true; 
	if(!jumpInAction){
		jumpPlanetOk = false; 
		jumpMoonOk = false; 
		jumpSolarOk = true;
	}
}



function planetJump(){	
	//Aktiveras n�r man klickar p� en annan planet.
	if(activePlanet != previousObject) {
		if(timer == 0){
			//Timern b�rjar p� pi och g�r ner till 0.
			timer = Math.PI;
			jumpInAction = true;
			//Spara den f�rra planetens position och rotation.
			posx = galaxyGroup.position.x;
			posz = galaxyGroup.position.y;
			roty = galaxyGroup.rotation.z + rotationGroup.rotation.z;
			
			//Spara kamerans f�rra position
			cameraPosX = camera.position.x;
			cameraPosY = camera.position.y;
			cameraPosZ = camera.position.z;
			//Spara kamerans rotations-hastighet
			controlsRotSpeed = controls.rotateSpeed;
			//Ber�kna zoom-niv� beroende p� planetens radie och storlek
			for (var i = 0; i < planetOrbitRadiuses.length; ++i) {
					if (planetOrbitRadiuses[i][0] == activePlanet)
						zoomLevel = activePlanet.scale.x*planetZoom/(planetOrbitRadiuses[i][1]/60);
			}
			//M�jligg�r �ndring av transparens
			planetOrbitMaterial.transparent = true;

			console.log("Paborjar hopp");
		}
		//Skapa en mjuk �verg�ng mellan nya och gamla positionen mha cosinus.
		galaxyGroup.position.x = posx*(1-Math.cos(timer))/2 - activePlanet.position.x*(1+Math.cos(timer))/2;
		galaxyGroup.position.y = posz*(1-Math.cos(timer))/2 - activePlanet.position.y*(1+Math.cos(timer))/2;
		rotationGroup.rotation.z = roty*(1-Math.cos(timer))/2 - activePlanet.rotation.z*(1+Math.cos(timer))/2;
		//Zooma kameran till r�tt niv� beroende p� planetens storlek, med en mjuk �verg�ng.
		camera.position.x = cameraPosX*(1+Math.cos(Math.PI - timer))/2 - (activePlanet.position.x*(1+Math.cos(timer))/2)*zoomLevel;
		camera.position.y = cameraPosY*(1+Math.cos(Math.PI - timer))/2 - (activePlanet.position.y*(1+Math.cos(timer))/2)*zoomLevel;
		camera.position.z = cameraPosZ*(1+Math.cos(Math.PI - timer))/2 - (activePlanet.position.z*(1+Math.cos(timer))/2)*zoomLevel;
		
		if(!smallJump){
			//Dimma ut omloppsbanor och hover-sf�rer
			planetOrbitMaterial.opacity = Math.cos(Math.PI/2 - timer/2);
			planetHoverMaterial.opacity = Math.cos(Math.PI/2 - timer/2)*hoverOpacity;
			moonOrbitMaterial.opacity = Math.cos(Math.PI/2 - timer/2)*hoverOpacity;
		} else {
			moonHoverMaterial.opacity = Math.cos(timer/2)*hoverOpacity;
		}

		controls.rotateSpeed = 0;
		//Hastigheten med vilken f�rflyttningen sker.
		timer -= 0.02;
			
		if(timer < 0){
			timer = 0;
			jumpInAction = false;
			//N�r f�rflyttningen �r klar s�tts previousObject (det klickade objektet) till objektet som nu �r i fokus.
			previousObject = activePlanet;
			//Denna loop ska se till att rotationen inte nollst�lls direkt efter ett hopp.
			for(var i = 0; i < clickableObjects.length; i++)
				if(Math.abs(clickableObjects[i].rotation.z) > Math.PI*2)
					clickableObjects[i].rotation.z = clickableObjects[i].rotation.z - Math.PI*2;
				
			console.log("Fardig med hopp");
			controls.rotateSpeed = controlsRotSpeed;
		}
	} else {
		//Detta sker n�r det inte �r ett hopp p� g.
		galaxyGroup.position.x = -activePlanet.position.x;
		galaxyGroup.position.y = -activePlanet.position.y;
		//Motverkar planeten i fokus's rotation s� att den st�r stilla.
		rotationGroup.rotation.z = -activePlanet.rotation.z;

		//Denna loop nollst�ller planetens rotation vid ett helt varv.
		for(var i = 0; i < clickableObjects.length; i++)
			if(Math.abs(clickableObjects[i].rotation.z) > Math.PI*2)
				clickableObjects[i].rotation.z = 0;
	}
}

function moonJump(){
	//Aktiveras n�r man klickar p� en annan planet.
	if(activeMoon != previousObject) {
		if(timer == 0){
			//Timern b�rjar p� pi och g�r ner till 0.
			timer = Math.PI;
			jumpInAction = true;
			//Spara den f�rra planetens position och rotation.
			posx = galaxyGroup.position.x;
			posz = galaxyGroup.position.y;
			roty = galaxyGroup.rotation.z + rotationGroup.rotation.z;
			
			//Spara kamerans f�rra position
			cameraPosX = camera.position.x;
			cameraPosY = camera.position.y;
			cameraPosZ = camera.position.z;
			//Spara kamerans rotations-hastighet
			controlsRotSpeed = controls.rotateSpeed;
			//Ber�kna zoom-niv� beroende p� planetens radie och storlek
			for(i = 0; i < planetOrbitRadiuses.length; i++)
				if(planetOrbitRadiuses[i][0] == activeMoon.parent.parent)
					var radiusFactor = 1/(planetOrbitRadiuses[i][1]/50);
				// console.log(radiusFactor);
			zoomLevel = activeMoon.scale.x*moonZoom*radiusFactor;

			//M�jligg�r �ndring av transparens
			planetOrbitMaterial.transparent = true;

			console.log("Paborjar hopp");
		}
		//Skapa en mjuk �verg�ng mellan nya och gamla positionen mha cosinus.
		moonPosX = activeMoon.position.x+activePlanet.position.x;
		moonPosY = activeMoon.position.y+activePlanet.position.y;
		
		galaxyGroup.position.x = posx*(1-Math.cos(timer))/2 - moonPosX*(1+Math.cos(timer))/2;
		galaxyGroup.position.y = posz*(1-Math.cos(timer))/2 - moonPosY*(1+Math.cos(timer))/2;
		rotationGroup.rotation.z = roty*(1-Math.cos(timer))/2 - activeMoon.rotation.z*(1+Math.cos(timer))/2;
		//Zooma kameran till r�tt niv� beroende p� planetens storlek, med en mjuk �verg�ng.
		camera.position.x = cameraPosX*(1+Math.cos(Math.PI - timer))/2 - (moonPosX*(1+Math.cos(timer))/2)*zoomLevel;
		camera.position.y = cameraPosY*(1+Math.cos(Math.PI - timer))/2 - (moonPosY*(1+Math.cos(timer))/2)*zoomLevel;
		camera.position.z = cameraPosZ*(1+Math.cos(Math.PI - timer))/2 - ((activeMoon.position.z+activePlanet.position.z)*(1+Math.cos(timer))/2)*zoomLevel;
		
		if(!smallJump){
			//Dimma ut omloppsbanor och hover-sf�rer
			planetOrbitMaterial.opacity = Math.cos(Math.PI/2 - timer/2);
			planetHoverMaterial.opacity = Math.cos(Math.PI/2 - timer/2)*hoverOpacity;
			moonOrbitMaterial.opacity = Math.cos(Math.PI/2 - timer/2)*hoverOpacity;
		}
		moonHoverMaterial.opacity = Math.cos(Math.PI/2 - timer/2)*hoverOpacity;

		controls.rotateSpeed = 0;
		//Hastigheten med vilken f�rflyttningen sker.
		timer -= 0.02;
			
		if(timer < 0){
			timer = 0;
			jumpInAction = false;
			//N�r f�rflyttningen �r klar s�tts previousObject (det klickade objektet) till objektet som nu �r i fokus.
			previousObject = activeMoon;
			//Denna loop ska se till att rotationen inte nollst�lls direkt efter ett hopp.
			for(var i = 0; i < clickableObjects.length; i++)
				if(Math.abs(clickableObjects[i].rotation.z) > Math.PI*2)
					clickableObjects[i].rotation.z = clickableObjects[i].rotation.z - Math.PI*2;
				
			console.log("Fardig med hopp");
			controls.rotateSpeed = controlsRotSpeed;
		}
	} else {
		
		moonPosX = activeMoon.position.x+activePlanet.position.x;
		moonPosY = activeMoon.position.y+activePlanet.position.y;
		
		//Detta sker n�r det inte �r ett hopp p� g.
		galaxyGroup.position.x = -moonPosX;
		galaxyGroup.position.y = -moonPosY;
		//Motverkar planeten i fokus's rotation s� att den st�r stilla.
		rotationGroup.rotation.z = -activeMoon.rotation.z;

		//Denna loop nollst�ller planetens rotation vid ett helt varv.
		for(var i = 0; i < clickableObjects.length; i++)
			if(Math.abs(clickableObjects[i].rotation.z) > Math.PI*2)
				clickableObjects[i].rotation.z = 0;
	}
}

//Aktiveras n�r man vill g� tillbaka till att ha solen centrerad.
function jumpToSun(){
	if(sunSphere != previousObject || resetSolarView) {
		if(timer == 0){
			//Timern b�rjar p� pi och g�r ner till 0.
			timer = Math.PI;
			jumpInAction = true;
			//Spara den f�rra planetens position och rotation.
			posx = galaxyGroup.position.x;
			posz = galaxyGroup.position.y;
			roty = galaxyGroup.rotation.z + rotationGroup.rotation.z;
			
			cameraPosX = camera.position.x;
			cameraPosY = camera.position.y;
			cameraPosZ = camera.position.z;
			controlsRotSpeed = controls.rotateSpeed;
			
			// console.log(hoverOpacity);

			console.log("Paborjar hopp");
		}
		maxRadius = 0;
		for(i = 0; i < planetOrbitRadiuses.length; i++)
			if(planetOrbitRadiuses[i][1] > maxRadius)
				maxRadius = planetOrbitRadiuses[i][1];
		zoomLevel = galaxyZoom + maxRadius*maxRadius*0.02 + maxRadius*Math.sin(maxRadius/300*Math.PI);
		
		//Skapa en mjuk �verg�ng mellan nya och gamla positionen mha cosinus.
		galaxyGroup.position.x = posx*(1-Math.cos(timer))/2 - sunSphere.position.x*(1+Math.cos(timer))/2;
		galaxyGroup.position.y = posz*(1-Math.cos(timer))/2 - sunSphere.position.y*(1+Math.cos(timer))/2;
		//Zooma kameran till r�tt niv� beroende p� planetens storlek, med en mjuk �verg�ng.
		camera.position.x = cameraPosX*(1+Math.cos(Math.PI - timer))/2;
		camera.position.y = cameraPosY*(1+Math.cos(Math.PI - timer))/2;
		camera.position.z = cameraPosZ*(1+Math.cos(Math.PI - timer))/2 - zoomLevel*(1+Math.cos(timer))/2;

		if(!resetSolarView) {
			//Dimma tillbaka omloppsbanor och hover-sf�rer
			planetOrbitMaterial.opacity = Math.cos(timer/2);
			planetHoverMaterial.opacity = Math.cos(timer/2)*hoverOpacity;
			moonOrbitMaterial.opacity = Math.cos(timer/2)*hoverOpacity;
		}

		controls.rotateSpeed = 0;
		//Hastigheten med vilken f�rflyttningen sker.
		timer -= 0.02;
			
		if(timer < 0){
			timer = 0;
			jumpInAction = false;
			resetSolarView = false;
			//N�r f�rflyttningen �r klar s�tts previousObject (det klickade objektet) till objektet som nu �r i fokus.
			previousObject = sunSphere;
			//Denna loop ska se till att rotationen inte nollst�lls direkt efter ett hopp.
			for(var i = 0; i < clickableObjects.length; i++)
				if(Math.abs(clickableObjects[i].rotation.z) > Math.PI*2)
					clickableObjects[i].rotation.z = clickableObjects[i].rotation.z - Math.PI*2;
					
			//M�jligg�r �ndring av transparens
			planetOrbitMaterial.transparent = false;
			
			console.log("Fardig med hopp");
			controls.rotateSpeed = controlsRotSpeed;
		}
	} else {
		//Detta sker n�r det inte �r ett hopp p� g.
		galaxyGroup.position.x = 0;
		galaxyGroup.position.y = 0;

		//Denna loop nollst�ller planetens rotation vid ett helt varv.
		for(var i = 0; i < clickableObjects.length; i++)
			if(Math.abs(clickableObjects[i].rotation.z) > Math.PI*2)
				clickableObjects[i].rotation.z = 0;
	}
	
}