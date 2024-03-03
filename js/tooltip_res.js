const TOOLTIP_RES = {
    points: {
        full: "Points",
        desc() {
            let h = `You have <b>${format(player.points)}</b>.`

           

           

            return h
        },
    },
    sm: {
        full: "Solar Matter",
        desc() {
            let h = `<i>
            Reach <b>${format(1e15)}</b> Points to reset previous features for Solar Matter.
            </i>`

            return h
        },
    },
    gamespeed: {
        full: "Game Speed",
        desc() {
            let h = `<i>Multiplies the speed (gain) of which you gain resources</i>`

            return h
        }
    }

}

function updateTooltipResHTML(start=false) {
    for (let id in TOOLTIP_RES) {
        if (!start && hover_tooltip.id !== id+'_tooltip') continue;

        let tr_data = TOOLTIP_RES[id]
        let tr = tmp.el[id+'_tooltip']

        if (tr) tr.setTooltip(`<h3>[ ${tr_data.full} ]</h3>`+(tr_data.desc?"<br class='line'>"+tr_data.desc():""))
    }
}