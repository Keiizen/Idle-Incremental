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
        ids: [null,'stellar', 'rp',],
        cols: 2,
        over(x,y) { player.main_upg_msg = [x,y] },
        reset() { player.main_upg_msg = [0,0] },
        1: {
            title: "Stellar Upgrades",
            res: "Stellarium",
            getRes() {return player.stellarium},
            unl() { return true },
            can(x) { return player.stellarium.gte(this[x].cost) && !player.mainUpg.stellar.includes(x) },
            buy(x) {
                if (this.can(x)) {
                    player.stellarium = player.stellarium.sub(this[x].cost)
                    player.mainUpg.stellar.push(x)
                }
            },
            auto_unl() { return hasUpgrade('rp', 6)},
            lens: 2,
            1: {
                unl() {return true},
                desc: 'Stellarium boosts itself (log5(x)+1)',
                cost: E(250),
                effect() {
                    let ret = player.stellarium.log(5).add(1)
                    //ret = ret.softcap(1e33, 0.75,0)
                    return ret
                },
                effDesc(x=this.effect()) {
                    return formatMult(x)+" Stellarium"
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
            title: "Rage Upgrades",
            res: "Rage Power",
            getRes() { return player.rp.points },
            unl() { return player.rp.unl },
            can(x) { return player.rp.points.gte(this[x].cost) && !player.mainUpg.rp.includes(x) },
            buy(x) {
                if (this.can(x)) {
                    player.rp.points = player.rp.points.sub(this[x].cost)
                    player.mainUpg.rp.push(x)
                }
            },
            auto_unl() { return player.rp.points.gte(1e30) },
            lens: 1,
        },
            1: {
                unl() { return player.rp.points.gte(1) },
                desc: "Stellarium is boosted by x10",
                cost: E(1),
                effect() {
                    let ret = E(10)
                    return ret
                },
                effDesc(x=this.effect()) {
                    return formatMult(x) + " Stellarium"
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