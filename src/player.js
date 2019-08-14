class Player{
    constructor(name, stack = 0){
        this.name = name
        this.stack = stack
        this.hand = []
        this.isAllIn = false
        this.hasChips = this.stack > 0
        this.sittingOut = false
        this.joinOrSitOut = this.joinOrSitOut.bind(this)
        this.fold = this.fold.bind(this)
        this.seat = null
    }



    joinOrSitOut(){
        this.sittingOut = !this.sittingOut
    }

    fold(){
        this.hand = []
        return {action: 'fold'}
    }

    call(bet){
        const call = {action: 'call'}
        if (this.stack <= bet){
            this.isAllIn = true
            this.hasChips = false
            this.stack = 0
            call.amount = bet - this.stack
            return call
        }  
        else {
            this.stack -= bet
            call.amount = bet
            return call
        }
    }
}

module.exports = Player