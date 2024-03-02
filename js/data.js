function E(x){return new Decimal(x)};

const EINF = Decimal.dInf
const FPS = 20

function uni(x) { return E(1.5e56).mul(x) }
function mlt(x) { return uni("ee9").pow(x) }

Decimal.prototype.modular=Decimal.prototype.mod=function (other){
    other=E(other);
    if (other.eq(0)) return E(0);
    if (this.sign*other.sign==-1) return this.abs().mod(other.abs()).neg();
    if (this.sign==-1) return this.abs().mod(other.abs());
    return this.sub(this.div(other).floor().mul(other));
};

Decimal.prototype.format = function (acc=4, max=12) { return format(this.clone(), acc, max) }

Decimal.prototype.formatGain = function (gain, mass=false) { return formatGain(this.clone(), gain, mass) }

/*function calc(dt) {
    let gs = tmp.gs.mul(dt)


    if (tmp.pass<=0) {
        player.points = player.points.add(tmp.pointGain.mul(gs))
       
    }

    tmp.pass = Math.max(0,tmp.pass-1)

    player.time += dt

   
    
}*/

function getPlayerData() {
    let s = {
       stellarity: E(0),
        rp: {
            points: E(0),
            unl: false,
        },
        options: {
            font: 'Arial',
            notation: 'standard',
            massDis: 0,

            nav_hide: []
        },
        confirms: {},
        offline: {
            active: true,
            current: Date.now(),
            time: 0,
        },
        time: 0,
    }

   
        
    return s
}

function wipe(reload=false) {
    if (reload) {
        wipe()
        save()
        location.reload()
    }
    else player = getPlayerData()
}

function loadPlayer(load) {
    const DATA = getPlayerData()
    player = deepNaN(load, DATA)
    player = deepUndefinedAndDecimal(player, DATA)
    convertStringToDecimal()
  
}

function clonePlayer(obj,data) {
    let unique = {}

    for (let k in obj) {
        if (data[k] == null || data[k] == undefined) continue
        unique[k] = Object.getPrototypeOf(data[k]).constructor.name == "Decimal"
        ? E(obj[k])
        : typeof obj[k] == 'object'
        ? clonePlayer(obj[k],data[k])
        : obj[k]
    }

    return unique
}

function deepNaN(obj, data) {
    for (let k in obj) {
        if (typeof obj[k] == 'string') {
            if (data[k] == null || data[k] == undefined ? false : Object.getPrototypeOf(data[k]).constructor.name == "Decimal") if (isNaN(E(obj[k]).mag)) obj[k] = data[k]
        } else {
            if (typeof obj[k] != 'object' && isNaN(obj[k])) obj[k] = data[k]
            if (typeof obj[k] == 'object' && data[k] && obj[k] != null) obj[k] = deepNaN(obj[k], data[k])
        }
    }
    return obj
}

function deepUndefinedAndDecimal(obj, data) {
    if (obj == null) return data
    for (let k in data) {
        if (obj[k] === null) continue
        if (obj[k] === undefined) obj[k] = data[k]
        else {
            if (Object.getPrototypeOf(data[k]).constructor.name == "Decimal") obj[k] = E(obj[k])
            else if (typeof obj[k] == 'object') deepUndefinedAndDecimal(obj[k], data[k])
        }
    }
    return obj
}

function convertStringToDecimal() {
    
}

//function cannotSave() { return tmp.supernova.reached && player.supernova.times.lt(1) && !quUnl() || tmp.inf_reached && !hasInfUpgrade(16) }

function save(){
    let str = btoa(JSON.stringify(player))
    if (findNaN(str, true)) return
    if (localStorage.getItem("testSave") == '') wipe()
    localStorage.setItem("testSave",str)
    tmp.prevSave = localStorage.getItem("testSave")
   // if (tmp.saving < 1) {addNotify("Game Saved", 3); tmp.saving++}
}

function load(x){
    if(typeof x == "string" & x != ''){
        loadPlayer(JSON.parse(atob(x)))
    } else {
        wipe()
    }
}



var game = {
    loaded: false
}

function loadGame(start=true, gotNaN=false) {
    if (!gotNaN) tmp.prevSave = localStorage.getItem("testSave")
    wipe()
    load(tmp.prevSave)
    
    if (start) {
        setupHTML()
    
       

        setInterval(save,15000)
        for (let x = 0; x < 5; x++) updateTemp()

        updateHTML()

        /*let t = (Date.now() - player.offline.current)/1000
        if (player.offline.active && t > 60) simulateTime(t)*/

        
       
       
       
        
       
       detInterval(loop, 1000/FPS)
       
        setInterval(checkNaN,1000)
       
        setTimeout(()=>{
            game.loaded = true
        },4000)
        

       
}}

function checkNaN() {
    let naned = findNaN(player)

    if (naned) {
        console.log(naned)

        addNotify("Game Data got NaNed because of "+naned.bold())

        resetTemp()
        tmp.start = true
        loadGame(false, true)
        for (let x = 0; x < 5; x++) updateTemp()
    }
}

function isNaNed(val) {
    return typeof val == "number" ? isNaN(val) : Object.getPrototypeOf(val).constructor.name == "Decimal" ? isNaN(val.mag) : false
}

function findNaN(obj, str=false, data=getPlayerData(), node='player') {
    if (str ? typeof obj == "string" : false) obj = JSON.parse(atob(obj))
    for (let k in obj) {
        if (typeof obj[k] == "number") if (isNaNed(obj[k])) return node+'.'+k
        if (str) {
            if (typeof obj[k] == "string") if (data[k] == null || data[k] == undefined ? false : Object.getPrototypeOf(data[k]).constructor.name == "Decimal") if (isNaN(E(obj[k]).mag)) return node+'.'+k
        } else {
            if (obj[k] == null || obj[k] == undefined ? false : Object.getPrototypeOf(obj[k]).constructor.name == "Decimal") if (isNaN(E(obj[k]).mag)) return node+'.'+k
        }
        if (typeof obj[k] == "object") {
            let node2 = findNaN(obj[k], str, data[k], (node?node+'.':'')+k)
            if (node2) return node2
        }
    }
    return false
}

Decimal.prototype.addTP = function (val) {
    var e = this.clone()
    return Decimal.tetrate(10, e.slog(10).add(val))
}
/*function simulateTime(sec) {
    let ticks = sec * FPS
    let bonusDiff = 0
    let player_before = clonePlayer(player,getPlayerData());
    if (ticks > 1000) {
        bonusDiff = (ticks - 1000) / FPS / 1000
        ticks = 1000
    }
    for (let i=0; i<ticks; i++) {
        updateTemp()
        calc(1/FPS+bonusDiff)
    }

    let h = `You were gone offline for <b>${formatTime(sec)}</b>.<br>`

    let s = {
        points: player.points.max(1).div(player_before.points.max(1)).log10(),
    }

    let s2 = {
        points: player.points.max(1).log10().max(1).div(player_before.points.max(1).log10().max(1)).log10(),
       
    }

    // console.log(s2)

    if (s2.points.gte(10)) h += `<br>Your points' exponent<sup>2</sup> is increased by <b>${s2.points.format(2)}</b>.`
    else if (s.points.gte(10)) h += `<br>Your points increased by <b>${s.points.format(2)}</b>.`

    createPopup(h,'offline')
}*/