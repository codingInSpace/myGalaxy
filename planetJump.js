
function planetJump(){
	//Aktiveras n�r man klickar p� en annan planet.
	if(activePlanet != previousObject) {
		if(timer == 0){
			//Timern b�rjar p� pi och g�r ner till 0.
			timer = Math.PI;
			//Spara den f�rra planetens position och rotation.
			posx = galaxyGroup.position.x;
			posz = galaxyGroup.position.y;
			roty = galaxyGroup.rotation.z + rotationGroup.rotation.z;
			
				console.log("posx: " + posx + ", posz " + posz);

			camzoom = camera.position.z;
			console.log("Paborjar hopp");
		}
		//Skapa en mjuk �verg�ng mellan nya och gamla positionen mha cosinus.
		galaxyGroup.position.x = posx*(1-Math.cos(timer))/2 - activePlanet.position.x*(1+Math.cos(timer))/2;
		galaxyGroup.position.y = posz*(1-Math.cos(timer))/2 - activePlanet.position.y*(1+Math.cos(timer))/2;
		rotationGroup.rotation.z = roty*(1-Math.cos(timer))/2 - activePlanet.rotation.z*(1+Math.cos(timer))/2;
		//OBS: raden under �r en id� f�r att klara av sista punkten under planetf�rflyttning,
		//	dvs att automatisk skala zoomniv�n efter planetens radie. F�r att den ska g� att implementera m�ste
		//	det g� att komma �t en planets radie p� ett bra s�tt. /Albin
		//camera.position.z = camzoom + (1-Math.cos(timer))*(1/2)*activePlanet.;

		//Hastigheten med vilken f�rflyttningen sker.
		timer -= 0.02;
			
		if(timer < 0){
			timer = 0;
			//N�r f�rflyttningen �r klar s�tts previousObject (det klickade objektet) till objektet som nu �r i fokus.
			previousObject = activePlanet;
			//Denna loop ska se till att rotationen inte nollst�lls direkt efter ett hopp.
			for(var i = 0; i < clickableObjects.length; i++)
				if(Math.abs(clickableObjects[i].rotation.z) > Math.PI*2) {
					clickableObjects[i].rotation.z = clickableObjects[i].rotation.z - Math.PI*2;
					console.log("Planet-rotation nollstalld under hopp");
				}
			console.log("Fardig med hopp");
		}
	} else {
		//Detta sker n�r det inte �r ett hopp p� g.
		galaxyGroup.position.x = -activePlanet.position.x;
		galaxyGroup.position.y = -activePlanet.position.y;
		//Motverkar planeten i fokus's rotation s� att den st�r stilla.
		rotationGroup.rotation.z = -activePlanet.rotation.z;

		//Denna loop nollst�ller planetens rotation vid ett helt varv.
		for(var i = 0; i < clickableObjects.length; i++)
			if(Math.abs(clickableObjects[i].rotation.z) > Math.PI*2) {
				clickableObjects[i].rotation.z = 0;
				console.log("Planet-rotation nollstalld utanfor hopp");
			}
	}
}

function jumpToSun(){
	//Aktiveras n�r man vill g� tillbaka till att ha solen centrerad.
	if(sunSphere != previousObject) {
		if(timer == 0){
			//Timern b�rjar p� pi och g�r ner till 0.
			timer = Math.PI;
			//Spara den f�rra planetens position och rotation.
			posx = galaxyGroup.position.x;
			posz = galaxyGroup.position.y;
			roty = galaxyGroup.rotation.z + rotationGroup.rotation.z;
			
				console.log("posx: " + posx + ", posz " + posz);

			camzoom = camera.position.z;
			console.log("Paborjar hopp");
		}
		//Skapa en mjuk �verg�ng mellan nya och gamla positionen mha cosinus.
		galaxyGroup.position.x = posx*(1-Math.cos(timer))/2 - sunSphere.position.x*(1+Math.cos(timer))/2;
		galaxyGroup.position.y = posz*(1-Math.cos(timer))/2 - sunSphere.position.y*(1+Math.cos(timer))/2;
		//OBS: raden under �r en id� f�r att klara av sista punkten under planetf�rflyttning,
		//	dvs att automatisk skala zoomniv�n efter planetens radie. F�r att den ska g� att implementera m�ste
		//	det g� att komma �t en planets radie p� ett bra s�tt. /Albin
		//camera.position.z = camzoom + (1-Math.cos(timer))*(1/2)*activePlanet.;

		//Hastigheten med vilken f�rflyttningen sker.
		timer -= 0.02;
			
		if(timer < 0){
			timer = 0;
			//N�r f�rflyttningen �r klar s�tts previousObject (det klickade objektet) till objektet som nu �r i fokus.
			previousObject = sunSphere;
			//Denna loop ska se till att rotationen inte nollst�lls direkt efter ett hopp.
			for(var i = 0; i < clickableObjects.length; i++)
				if(Math.abs(clickableObjects[i].rotation.z) > Math.PI*2) {
					clickableObjects[i].rotation.z = clickableObjects[i].rotation.z - Math.PI*2;
					console.log("Planet-rotation nollstalld under hopp");
				}
			console.log("Fardig med hopp");
		}
	} else {
		//Detta sker n�r det inte �r ett hopp p� g.
		galaxyGroup.position.x = 0;
		galaxyGroup.position.y = 0;

		//Denna loop nollst�ller planetens rotation vid ett helt varv.
		for(var i = 0; i < clickableObjects.length; i++)
			if(Math.abs(clickableObjects[i].rotation.z) > Math.PI*2) {
				clickableObjects[i].rotation.z = 0;
				console.log("Planet-rotation nollstalld utanfor hopp");
			}
	}
	
}