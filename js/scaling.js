Decimal.prototype.scale = function(type) {
    return SCALING.scale(type)
}

const SCALING = {
    scale(type) {
        return this.scalings[type]
    },
    scalings: {
        
    }
    
}