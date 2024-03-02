const RESOURCES_DIS = {
    points: {
        name: "Points",
        unl: () => true,
        icon: "empty",

        desc: (gs)=>format(player.points)+"<br>"+formatGain(player.points, tmp.pointGain.mul(gs)),
    },
    rp: {
        name: "Rage Powers",
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
        
                <span style="margin-right: 5px; text-align: right;" id="${i}_res_desc">X</span>
                <div><img src="images/${rd.icon||"empty"}.png" ${rd.resetBtn ? `onclick="reset_res_btn('${i}')" style="cursor: pointer;"` : ""}></div>
            </div>
        
        `
        let resd = document.createElement("div")
        resd.setAttribute("class", rd.class ? rd.class : "")
        resd.innerHTML = 
        document.getElementById("resources_table").appendChild(resd)
    }
    
    
}

function updateResourcesHTML() {
    let gs = tmp.gs
   

    for (i in RESOURCES_DIS) {
        let rd = RESOURCES_DIS[i]
        let unl =  rd.unl()

        document.getElementById(i+"_res_div").style.display = unl ? "block" : "none"

        if (unl) {
            document.getElementById(i*"_res_desc").innerHTML = " [ <b><i> " + rd.name + " </i></b>] " +rd.desc(gs)
        }
    }
}