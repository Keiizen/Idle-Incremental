const RESOURCES_DIS = {
    stellarity: {
        unl: () => true,
        icon: "stars",
        class: "magenta",

        desc: (gs)=>format(player.stellarity)+"<br>"+formatGain(player.stellarity, tmp.stellarityGain.mul(gs)),
    },
    rp: {
        title: "[ <b><i> Rage Powers </i></b> ]",
        unl: () => player.rp.unl || player.stellarity.gte(2.5e11),
        icon: "rp",
        class: "red",

        desc: (gs)=>format(player.rp.points)+"<br>"+"(+"+format(tmp.rp.gain)+")",
    
        resetBtn() { FORMS.rp.reset() }
    },
}

function reset_res_btn(id) { RESOURCES_DIS[id].resetBtn() }
function setupResourcesHTML() {
    let nil = ""
    let h1 = ""
    for (i in RESOURCES_DIS) {
        let rd = RESOURCES_DIS[i]

        h1 += `
        <div id="${i}_res_div">
            <div class=${rd.class||""}>
                <span style="margin-right: 5px; text-align: right;" id="${i}_res_desc"> x</span>
                <div><img src="images/${rd.icon||"empty"}.png" ${rd.resetBtn ? `onclick="reset_res_btn('${i}')" style="cursor: pointer;"` : ""}></div>
            </div>
        </div>`
    }
    document.getElementById("resources_table").innerHTML = h1
}        

function updateResourcesHTML() {
    let gs = tmp.gs
    for (i in RESOURCES_DIS) {
        let rd = RESOURCES_DIS[i]
        let unl = rd.unl()
        
        document.getElementById(`${i}_res_div`).style.display = unl ? "block" : "none"

        document.getElementById(`${i}_res_desc`).innerHTML = rd.desc(gs)
    }
}
    