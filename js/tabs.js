const TABS = {
    choose(id) {
        for (i in TABS.tabTable) {
            let tab = TABS.tabTable[i]
            if (tab.Name != player.curtab) {
                player.curtab = id+'_tab'
            }
        }
    },
    tabTable: {0: {Name: "main_tab"}, 1: {Name: "upgrades_tab"}}
}

function openTabTerminal() {
    player.options.navhide[0] = !player.options.navhide[0]
}


function updateTabs() {
    for (i in TABS.tabTable) {
        let tab = TABS.tabTable[i]
        tmp.el[tab.name+"_tab"].setDisplay(tab.Name == player.curtab)
    }
    
    tmp.el.tab_terminal.setHTML(player.options.navhide[0] ? "v" : "^")
    tmp.el.hideres.setHTML(player.options.navhide[1] ? "v" : "^")
}
