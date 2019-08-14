import React from 'react';
import logo from './logo.svg';
import './App.css';
import Game from './game'
import NewPlayerForm from './NewPlayerForm'
import SelectGameDropdown from './SelectGameDropdown'
const gameTypes = require('./gameType')
const Player = require('./player')
const deck = require('./deck')


export default class App extends React.Component{
  constructor(){
    super()
    this.state = {
      game: null,
      players: [new Player('Brendan', 500), new Player('Mike', 10000)]
    }
  }
  

  componentDidMount(){
    this.initializeGame()
  }

  componentWillUpdate(nextProps, nextState){
    if (nextState.game !== this.state.game){
      const players = nextState.game.players
      this.setState({players})
    }
  }

  initializeGame = (selection) => {
    const game = new Game(selection || gameTypes['texasHoldem'])
    game.shuffle(game.deck)
    this.setState({game})
  }

  newHand = () => {
    this.setState({game: {...this.state.game, deck: this.state.game.shuffle(this.state.game.newDeck())}})
    // .game.deck = this.state.game.shuffle(this.state.game.newDeck())
    console.log(`${this.state.game.pots[0].winner.name} was the winner and he should fold`)
    this.state.game.pots[0].winner.fold()
    this.state.game.deal(this.state.players, this.state.game.newDeck())
  }

  seatPlayer = (player) => {
    for (let i = -1; i < this.state.game.players.length; ++i){
      if (this.state.game.players.length < this.state.game.gameType.playersAllowed){
        player.seat = this.state.game.players.length
        this.setState({game: {...this.state.game, players: [...this.state.game.players, player]}})
        return {success: true, message: `Player ${player.name} seated in seat ${i + 1} with ${player.stack} chips.`}
      }
    }
    this.setState({players: [...this.state.game.players]})
    return {success: false, message: `Player not seated`}
  }
  

  render(){
    return (
      <div className="App">
      <div>{this.state.game && this.state.game.gameType.name}</div>
      {this.state.game && this.state.game.players.map((p, i) => {
        return (
          <div key={i} style={{backgroundColor: 'green', color: 'white'}}>{`${p.name} is seated with ${p.stack} chips.`}</div>
        )
      })}
        <header className="App-header">
        <NewPlayerForm submit={this.seatPlayer}/>
        <SelectGameDropdown initializeGame={this.initializeGame} submit={this.setState.bind(this)} state={this.state}/>
        <button onClick={this.state.game && (() => {
          this.state.game.shuffle(this.state.game.deck)
          this.state.game.deal(this.state.game.players, this.state.game.deck)
          this.forceUpdate()
        })}>Deal</button>
          {this.state.game && this.state.game.players.map((p, i) => {
            return <div key={i}>
              <div>{p && p.name}</div>
              <div className={p && p.stack > 0 ? '' : 'red'}>{p && p.stack}</div>
              {p && p.hand.map(card => {
                const cardKey = `${card[0]}${card[1]}`
                return (
                  <img style={{height: '30vh', width: '18%'}}key={card.join('')} src={deck[cardKey]} alt={cardKey}/>
                  )
                })}
                {(p.hand.length > 0) && (!this.state.game.pots[0].winner) &&
                <button 
                  onClick={() => {
                  p.fold()
                  this.state.game.pots[0].foldPlayer(p.seat)
                  this.forceUpdate()
                  }}>Fold</button>}
            </div>
          })}
          {this.state.game && (this.state.game.pots.length) && this.state.game.pots[0].winner ? 
          <div>
            {this.state.game.pots[0].winner.name} is the winner.
            <button onClick={() => {
              // this.state.game.shuffle()
              // this.state.game.deal()
              this.newHand()
            }}>New Hand</button>
          </div>
          :
          (this.state.game && (this.state.game.pots.length > 0) ? 
            (this.state.game.pots[0].players.length === 1 ?
              <div>{this.state.game.pots[0].players[0].name} is the winner</div>
            : <div>The pot:
            <div>{
              this.state.game.pots[0].players
                .filter(p => p.hand.length)
                .map(p => p.name)
                .join(', ')} are playing for {this.state.game.pots[0].total} dollars.
            </div>
          </div>
            )
            : <div></div>
          )}
        </header>
      </div>
    );
  }
}


