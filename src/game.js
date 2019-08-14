class Pot{
    constructor(players = [], total = 0){
        this.players = players
        this.total = total 
        this.closed = false
        this.winner = null
        this.discard = []
        this.foldPlayer = this.foldPlayer.bind(this)
    }
    foldPlayer(i){
        this.players = this.players.filter(p => p.seat !== i)
        if (this.players.length === 1){
            this.winner = this.players[0]
        }
        console.log(i)
    }
}

class Game{
    constructor(game){
        this.gameType = game
        this.players = []
        this.deck = this.newDeck()
        this.round = 0
        this.deal = this.deal.bind(this)
        this.shuffle = this.shuffle.bind(this)
        this.newDeck = this.newDeck.bind(this)
        this.pots = []
    }

    newDeck(){
        const deck = []
        const suits = ['C', 'S', 'H', 'D']
        const vals = ['2','3','4','5','6','7','8','9','10','11','12','13','14']
        for (let i = 0; i < 13; i++){
            for (let j = 0; j < 4; j++)
            deck.push([suits[j], vals[i]])
        }
        return deck
    }

    shuffle(deck){
        let nextDeck
        let numShuffles = 25 + Math.floor(Math.random() * 4)
        for(let i = 0; i < numShuffles; i++){
            const mid = Math.floor(Math.random() * 8 + 21)
            nextDeck = []
            const half1 = deck.slice(mid)
            const half2 = deck.slice(0, mid)
            let j = i
            while (half1.length || half2.length){
                j++
                if ((j % 9 === 0) && half2.length){
                    nextDeck.push(half2.pop())
                }
                if (half2.length){
                    nextDeck.push(half2.pop())
                }
                if (half1.length){
                    nextDeck.push(half1.pop())
                }
            }
            deck = nextDeck
        }
        this.deck = deck
    }

    deal(players, deck, dealNum = 0){
        this.pots.unshift(new Pot(players))
        players = players.filter(a => a)
        const numCards = this.gameType.holeCards
        for (let i = 0; i < players.length * numCards; i++){
            players[i % players.length].hand.push(deck.shift())
        }
    }
    
    bet(players, currentBet){

    }
}



module.exports = Game