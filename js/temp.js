var tmp = {
    
}

function resetTemp() {
    let d = new Date()
    keep = [tmp.el, tmp.prevSave]
    tmp = {
        

        cx: 0,
        cy: 0,

        mobile: false,

        start: false,

       
        tab: 0,
        stab: [],
       
        pass: 0,
        notify: [],
        popup: [],
        saving: 0,
       

       

       
       

        prevSave: "",
       
    }

   
    
    tmp.el = keep[0]
    tmp.prevSave = keep[1]
    tmp.notify = {}


}
function updateSolarMatterTemp() {
    if (!tmp.sm) tmp.sm = {}
    tmp.sm.gain = FORMS.sm.gain()
    tmp.sm.can = tmp.sm.gain.gte(1)
}
function updateNullMatterTemp() {
    if (!tmp.nm) tmp.nm = {}
    tmp.nm.gain = FORMS.nm.gain()
    tmp.nm.can = tmp.nm.gain.gte(1)   
}


function updatePointTemp() {
    tmp.pointGain = FORMS.pointGain()
}
function updateGamespeedTemp() {
    tmp.gs = FORMS.gameSpeed() 
}
function updateTemp() {
    tmp.offlineActive = player.offline.time > 1
    tmp.offlineMult = tmp.offlineActive?player.offline.time+1:1
    updateGamespeedTemp()
    updatePointTemp()
    updateSolarMatterTemp()
    updateNullMatterTemp()
   
}
