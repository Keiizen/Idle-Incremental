
const BUILDINGS_DATA = {
    points_1: {
        name: "Power",

        get isUnlocked() { return true },
        get autoUnlocked() { return hasUpgrade('sm',4) },
        get noSpend() { return hasUpgrade('sm',8) },

        get res() { return player.points },
        set res(v) { player.points = v },

        cost(x=this.level) { 
            let start = E(10)
            let inc = E(1.5)
            let pow = E(1)
            if (x.gte(100)) pow = pow.add(.125)

            return getPointUpgradeCost(x, start, inc, pow)
        },
        get bulk() { 
            let bulk = E(0)
            let start = 10
            let inc = 1.5
            let pow = 1
            if (player.mass.gte(Decimal.pow(10,start))) bulk = player.mass.max(1).log10().div(start).max(1).log(inc).max(0).root(pow).add(1).floor()
            return bulk
        },

        get_cost: x => format(x) + " Points",

        get beMultiplicative() { return false },

        effect(x) {
            let power = E(1)
            power = power.mul(BUILDINGS.eff('points_2'))

            let effect = power.mul(x)
           

            return {power, effect}
        },

        get bonus() {
            let x = E(0)
           
            return x
        },

        get_power: x => "+"+format(x.power),
        get_effect: x => "+"+format(x.effect)+" to point gain",
    },
    points_2: {
        name: "Charger",
        get isUnlocked() {return hasUpgrade('points',2)},
        get AutoUnlocked() {return hasUpgrade('sm',4)},
        get noSpend() {return hasUpgrade('sm',8)},
        get res() {return player.points},
        set res(v) {player.points = v},
        cost(x=this.level) {
            let start = E(100)
            let inc = E(4)
            let pow = E(1)
            return getPointUpgradeCost(x, start, inc, pow)
        },
        get bulk() {
            let bulk = E(0)
            let start = 100
            let inc = 4
            let pow = 1
            if (player.points.gte(Decimal.pow(10,start))) bulk = player.points.max(1).log10().div(start).max(1).log(inc).max(0).root(pow).add(1).floor()

            return bulk
        },
        get_cost: x => format(x) + " Points",
        get beMultiplicative() {return false},
        effect(x) {
            let step = E(2)
            step = step.pow(BUILDINGS.eff('points_3'))

            let ret = step.mul(x).add(1)

            return {power: step, effect: ret}
        },
        get bonus() {
            let x = E(0)

            return x
        },
        get_power: x => "+"+formatMult(x.power),
        get_effect: x => "+"+formatMult(x.effect) + " to Power's effect"
    },
    points_3: {
        name: "Obelisk",
        get isUnlocked() {return hasUpgrade('sm',5)},
        get autoUnlocked() {return hasUpgrade('nm',2)},
        get noSpend() {return hasUpgrade('nm',5)},
        get res() {return player.points},
        set res(v) {player.points=v},
        cost(x=this.level) {
            let start = 1e33
            let inc = 172.53
            let pow = 1
            return getPointUpgradeCost(x, start, inc, pow)
        },
        get bulk() {
            let bulk
            let start = 1e339
            let inc = 172.53
            let pow = 1
            if (player.mass.gte(Decimal.pow(10,start))) bulk = player.mass.max(1).log10().div(start).max(1).log(inc).max(0).root(pow).add(1).floor()
            return bulk
        },
        get_cost: x => format(x) + " Points",
        get beMultiplicative() {return false},
        effect(x) {
            let step = E(1.25)

            let ret = step.mul(x).add(1)
            return {power: step, effect: ret}
        },
        get bonus() {
            let x = E(0)

            return x
        },
        get_power: x => "^"+format(x.power),
        get_effect: x => "Charger's effect is raised by " + format(x.effect)
    }
   
		
       
}

const BUILDINGS_ORDER = [
    'points_3', 'points_2', 'points_1'
]

Object.keys(BUILDINGS_DATA).forEach(i => {
    let b = BUILDINGS_DATA[i]

    Object.defineProperty(b, "level", {
        get() { return player.build[i].amt },
        set(value) { player.build[i].amt = value },
    })
});

const BUILDINGS = {
    //Calculation
    tick() {
		for (var [i, b] of Object.entries(BUILDINGS_DATA)) {
			if (b.isUnlocked && b.autoUnlocked && player.build[i].auto) this.buy(i, true)
		}
	},
    temp() {
		let bt = tmp.build

		for (var i of BUILDINGS_ORDER) {
            let b = BUILDINGS_DATA[i]

			if (b.isUnlocked || b.forceEffect) {
                let bonus = b.bonus
                let total = b.beMultiplicative ? b.level.add(1).mul(bonus.add(1)).sub(1) : b.level.add(bonus)

                bt[i] = {
                    bulk: b.bulk,
                    total: total,
                    bonus: bonus,
                    effect: b.effect(total),
                }
            } else {
                bt[i] = {
                    bulk: E(0),
                    total: E(0),
                    bonus: E(0),
                    effect: {},
                }
            }
		}
	},

    //Reset
    reset(i) { player.build[i].amt = E(0) },

    //Buying
	buy(i, max=false) {
        let b = BUILDINGS_DATA[i], cost = b.cost()

        if (b.res.lt(cost) || !(b.allowPurchase ?? true)) return

        if (max) {
            let bulk = b.bulk
            if (bulk.lte(b.level)) return
            b.level = bulk

            cost = b.cost(bulk.sub(1))
        } else {
            b.level = b.level.add(1)
        }

       

		if (!b.noSpend && b.res.gt(cost)) {
			b.res = b.res.sub(cost).max(0) // without .max(0) causes NaN because of negative amount
		}
	},

    //Effect
	eff(i, key="effect", def = E(1)) {
		return tmp.build[i].effect[key] ?? def
	},

    //DOM
	setup() {
		for (var [i, b] of Object.entries(BUILDINGS_DATA)) {
            let el = new Element("building_"+i)

			if (el.el) el.setHTML(`<div class="table_center upgrade" style="width: 100%; margin-bottom: 5px;">
				<div style="width: 300px">
					<div class="resources">
						<img src="images/buildings/${b.icon||"mark"}.png">
						<span style="margin-left: 5px; text-align: left;"><span id="building_scale_${i}"></span>${b.name} [<span id="building_lvl_${i}"></span>]</span>
					</div>
				</div>
				<button class="btn" id="building_btn_${i}" onclick="BUILDINGS.buy('${i}')" style="width: 300px"><span id="building_cost_${i}"></span></button>
                <button class="btn" onclick="BUILDINGS.buy('${i}', true)" style="width: 120px">Buy Max</button>
				<button class="btn" id="building_auto_${i}" onclick="player.build.${i}.auto = !player.build.${i}.auto" style="width: 80px"></button>
				<div style="margin-left: 5px; text-align: left; width: 400px">
					Power: <span id="building_pow_${i}"></span><br>
					Effect: <span id="building_eff_${i}"></span>
				</div>
			</div>`)
		}
	},
	update(i) {
		let b = BUILDINGS_DATA[i], bt = tmp.build[i], unl = b.isUnlocked

        tmp.el["building_"+i].setDisplay(unl)

        if (!unl) return;
		
        tmp.el["building_lvl_"+i].setHTML(b.level.format(0) + (bt.bonus.gt(0) ? (b.beMultiplicative ? " × " : " + ") + bt.bonus.format(0) : "")) //  + " = " + bt.total.format(0)
        /*tmp.el["building_scale_"+i].setHTML(b.scale ? getScalingName(b.scale) : "")*/

        let cost = b.cost(), allow = b.allowPurchase ?? true

        tmp.el["building_btn_"+i].setClasses({ btn: true, locked: b.res.lt(cost) || !allow })
        tmp.el["building_cost_"+i].setHTML(allow ? "Cost: "+b.get_cost(cost) : "Locked" + (b.denyPurchaseText??""))

        tmp.el["building_auto_"+i].setDisplay(b.autoUnlocked)
        tmp.el["building_auto_"+i].setHTML(player.build[i].auto ? "ON" : "OFF")

        let eff = bt.effect

        tmp.el["building_pow_"+i].setHTML(b.get_power(eff))
        tmp.el["building_eff_"+i].setHTML(b.get_effect(eff))
	},
}

// Config (custom cost, etc.)
function getPointUpgradeCost(lvl, start, inc, pow) {
    return Decimal.pow(Decimal.mul(start, Decimal.pow(inc, lvl)), pow)
}
function checkBuildings() {
    let b

   
    if (player.pointUpg) for (let x = 1; x <= 3; x++) {
        b = player.build['points_'+x]

        if (b.amt.lte(0) && player.pointUpg[x] && Decimal.gt(player.pointUpg[x],0)) {
            b.amt = E(player.pointUpg[x])
            player.pointUpg[x] = undefined;
        }

        b.auto = b.auto || player.autoPointUpg[x]

        player.autoPointUpg[x] = false
    }


}