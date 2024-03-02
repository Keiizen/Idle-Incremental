const RESOURCES_DIS = {
    points: {
        unl: () => true,
        icon: "empty",

        desc: (gs)=>format(player.points)+"<br>"+formatGain(player.points, tmp.pointGain.mul(gs)),
    },
    rp: {
        unl: () => true,
        icon: "empty",
        class: "red",

        desc: (gs)=>format(player.rp.points)+"<br>"+"(+"+format(tmp.rp.gain,0)+")",
    
        resetBtn() { FORMS.rp.reset() },
    },

   
}

function reset_res_btn(id) { RESOURCES_DIS[id].resetBtn() }

function setupResourcesHTML() {
    let h1 = ""

    for (i in RESOURCES_DIS) {
        let rd = RESOURCES_DIS[i]

        h1 += `
        <div id="${i}_res_div">
            <div ${i in TOOLTIP_RES ? `id="${i}_tooltip" class="tooltip ${rd.class||""}" tooltip-pos="left" tooltip-align="left" tooltip-text-align="left"` : `class="${rd.class||""}"`}>
                <span style="margin-right: 5px; text-align: right;" id="${i}_res_desc">X</span>
                <div><img src="images/${rd.icon||"empty"}.png" ${rd.resetBtn ? `onclick="reset_res_btn('${i}')" style="cursor: pointer;"` : ""}></div>
            </div>
        </div>
        `

       
    }
    
    document.getElementById("resources_table").innerHTML = h1
}

function updateResourcesHTML() {
    let gs = tmp.gs
   

    for (i in RESOURCES_DIS) {
        let rd = RESOURCES_DIS[i]
        let unl =  rd.unl()

        document.getElementById(i+"_res_div").style.display = unl ? "block" : "none"

        if (unl) {
            document.getElementById(+"_res_desc").innerHTML = rd.desc(gs)
        }
    }
}