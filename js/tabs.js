const TABS = {
    choose(id) {
            let tab = id+"_tab"
            if (tab != player.curtab) {
                player.curtab = tab
                for (let x = 0; x <= 1; x++) player.options.hidenav[x] = true
            }
    },
    tabTable: {0: {Name: "main_tab"}, 1: {Name: "upgrades_tab"}}
}




function updateTabs() {
    for (i in TABS.tabTable) {
        let tab = TABS.tabTable[i]
        tmp.el[tab.Name].setDisplay(tab.Name == player.curtab)
    }
    
    tmp.el.openTabTerminal.setHTML(player.options.hidenav[0] ? "Open Terminal" : "Close Terminal")
}
