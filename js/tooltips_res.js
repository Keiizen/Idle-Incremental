const TOOLTIP_RES = {
    /*points: {
        full: "Points",
        desc() {
            let h = `You have acquired <b>${format(player.Points)}</b> Points.`

           

           

            return h
        },
    },
    rp: {
        full: "Rage Power",
        desc() {
            let h = `<i>
            Reach over <b>${format(1e15,0)}</b> points to reset previous features for Rage Powers.
            </i>`

            return h
        },
    },*/
   
}

function updateTooltipResHTML(start=false) {
    for (let id in TOOLTIP_RES) {
        if (!start && hover_tooltip.id !== id+'_tooltip') continue;

        let tr_data = TOOLTIP_RES[id]
        let tr = document.getElementById(id+'_tooltip')

        if (tr) tr.setAttriubute("tooltip-html",`<h3>[ ${tr_data.full} ]</h3>`+(tr_data.desc?"<br class='line'>"+tr_data.desc():""))
    }
}