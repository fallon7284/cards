import React from 'react'
import gameType from './gameType'

export default class selectGameDropdown extends React.Component{
    constructor(){
        super()
        this.state = {
            selection: ''
        }
    }

    handleChange = (e) => {
        this.props.initializeGame(gameType[e.target.value])
    }



    render(){
        return (
            <select onChange={this.handleChange}>
                <option value="texasHoldem">Texas Holdem</option>
                <option value="omaha">Omaha</option>
                <option value="fiveCard">Five Card Draw</option>
            </select>
        )
    }

}