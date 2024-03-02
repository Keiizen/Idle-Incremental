function setupHTML() {
	
	
	
	
	//document.getElementById("test").textContent = "No!"
	

	/*tmp.el = {}
	let all = document.getElementsByTagName("*")
	for (let i=0;i<all.length;i++) {
		let x = all[i]
		tmp.el[x.id] = new Element(x)
	}*/

	setupResourcesHTML()
    
}




function updateHTML() {
	//document.documentElement.style.setProperty('--font', player.options.font)
	//document.documentElement.style.setProperty('--cx', tmp.cx)
	//document.documentElement.style.setProperty('--cy', tmp.cy)

	tmp.mobile = window.innerWidth < 1200

	if (!game.loaded) {
		document.getElementById("losding").style.display = "block"
		document.getElementById("app").style.display = "none"
	} else {
		document.getElementById("loading").style.display = "none"
		document.getElementById("app").style.display = "block"
	}
	

	

	updateResourcesHTML()
}