function setupHTML() {
	
	
	setupResourcesHTML()
	
	//document.getElementById("test").textContent = "No!"
	

	tmp.el = {}
	let all = document.getElementsByTagName("*")
	for (let i=0;i<all.length;i++) {
		let x = all[i]
		tmp.el[x.id] = new Element(x)
	}

    
}




function updateHTML() {
	//document.documentElement.style.setProperty('--font', player.options.font)
	//document.documentElement.style.setProperty('--cx', tmp.cx)
	//document.documentElement.style.setProperty('--cy', tmp.cy)

	tmp.mobile = window.innerWidth < 1200

	let displayMainTab = true
	

    tmp.el.app.setDisplay(tmp.start && displayMainTab)
	

	updateResourcesHTML()
	if (hover_tooltip) updateTooltipResHTML()
}