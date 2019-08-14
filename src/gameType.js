module.exports = {
    texasHoldem: {
        name: 'texasHoldem',
        playersAllowed: 10,
        holeCards: 2,
        rounds: [['dealHoleCards', 'bet'], ['dealFlop', 'bet'], ['dealOne', 'bet'],['dealOne', 'bet'],['decide']]
    },
    omaha: {
        name: 'omaha',
        playersAllowed: 9,
        holeCards: 4,
        rounds: [
            ['dealHoleCards', 'bet'],
            ['dealFlop', 'bet'], 
            ['dealOne', 'bet'],
            ['dealOne', 'bet'],
            ['decide']
        ]
    },
    fiveCard: {
        name: 'fiveCard',
        playersAllowed: 6,
        holeCards: 5,
        rounds: [['dealHoleCards', 'bet'],['exchange', 'bet']]
    }
}