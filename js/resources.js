const RESOURCES_DIS = {
    stellarity: {
        title: "[ <b><i> Stellarity </i></b> ]",
        unl: () => true,
        icon: "stars",
        class: "pink",

        desc: (gs)=>format(player.stellarity)+"<br>"+formatGain(player.stellarity, tmp.stellarityGain.mul(gs)),
    },
    rp: {
        title: "[ <b><i> Rage Powers </i></b> ]",
        unl: () => true,
        icon: "rp",
        class: "red",

        desc: (gs)=>format(player.rp.points)+"<br>"+"(+"+format(tmp.rp.gain,0)+")",
    
        resetBtn() { FORMS.rp.reset() }
    },

   
}

function reset_res_btn(id) { RESOURCES_DIS[id].resetBtn() }

function setupResourcesHTML() {
    let h1 = ""
    let nil = ""
    for (i in RESOURCES_DIS) {
        let rd = RESOURCES_DIS[i]

        h1 += `
        <div id="${i}_res_div">
            <div>${rd.title}</div>
            <span style="margin-right: 5px; text-align: right;" id="${i}_res_desc">x</span>
            <div><img src="images/${rd.icon||"empty"}.png" ${rd.resetBtn ? `onclick="reset_res_btn('${i}')" style="cursor: pointer;"` : ""}></div>
        </div>`
    }
    document.getElementById("resources_table").innerHTML = h1
}        

function updateResourcesHTML() {
    let gs = tmp.gs
    for (i in RESOURCES_DIS) {
        let rd = RESOURCES_DIS
        document.getElementById(`${i}_res_div`).style.display = rd.unl() ? "block" : "none"
        document.getElementById(`${i}_res_desc`) = rd.desc(gs)
    }
}
    