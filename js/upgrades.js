const UPGS = {
   
    main: {
        temp() {
            for (let x = 1; x <= this.cols; x++) {
                for (let y = 1; y <= this[x].lens; y++) {
                    let u = this[x][y]
                    if (u.effDesc) tmp.upgs.main[x][y] = { effect: u.effect(), effDesc: u.effDesc() }
                }
            }
        },
        ids: [null,'stellar', 'sm',],
        cols: 2,
        over(x,y) { player.main_upg_msg = [x,y] },
        reset() { player.main_upg_msg = [0,0] },
        1: {
            title: "Stellar Upgrades",
            res: "points",
            getRes() {return player.points},
            unl() { return true },
            can(x) { return player.points.gte(this[x].cost) && !player.mainUpg.stellar.includes(x) },
            buy(x) {
                if (this.can(x)) {
                    player.points = player.points.sub(this[x].cost)
                    player.mainUpg.stellar.push(x)
                }
            },
            auto_unl() { return hasUpgrade('sm', 6)},
            lens: 2,
            1: {
                unl() {return true},
                desc: 'points boosts itself (log5(x)+1)',
                cost: E(250),
                effect() {
                    let ret = player.points.log(5).add(1)
                    //ret = ret.softcap(1e33, 0.75,0)
                    return ret
                },
                effDesc(x=this.effect()) {
                    return formatMult(x)+" points"
                }
            },
            2: {
                unl() {return true},
                desc: '^1.2 gamespeed',
                cost: E(1e6),
                effect() {
                    let ret = 1.2
                    return ret
                },
                effDesc(x=this.effect) {
                    return "^1.2 gamespeed"
                }
            }
        },
        2: {
            title: "Solar Upgrades",
            res: "Solar Matter",
            getRes() { return player.sm.points },
            unl() { return player.sm.unl },
            can(x) { return player.sm.points.gte(this[x].cost) && !player.mainUpg.sm.includes(x) },
            buy(x) {
                if (this.can(x)) {
                    player.sm.points = player.sm.points.sub(this[x].cost)
                    player.mainUpg.sm.push(x)
                }
            },
            auto_unl() { return player.sm.points.gte(1e30) },
            lens: 1,
        },
            1: {
                unl() { return player.sm.points.gte(1) },
                desc: "points is boosted by x10",
                cost: E(1),
                effect() {
                    let ret = E(10)
                    return ret
                },
                effDesc(x=this.effect()) {
                    return formatMult(x) + " points"
                }
            },
         }       
        }
function hasUpgrade(id,x) { return player.mainUpg[id].includes(x) }
function upgEffect(id,x,def=E(1)) { return tmp.upgs.main[id][x]?tmp.upgs.main[id][x].effect:def }
function resetMainUpgs(id,keep=[]) {
    let k = []
    let id2 = UPGS.main.ids[id]
    for (let x = 0; x < player.mainUpg[id2].length; x++) if (keep.includes(player.mainUpg[id2][x])) k.push(player.mainUpg[id2][x])
    player.mainUpg[id2] = k
}