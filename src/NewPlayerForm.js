import React from 'react'
import Player from './player'

export default class NewPlayerForm extends React.Component{
    constructor(){
        super()
        this.state = {
            name: '',
            chips: ''
        }
        
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.submit(new Player(this.state.name, this.state.chips))
        this.setState({name: '', chips: ''})
    }

    render(){
        return (
            <div>
                <form>
                    <input name="name" onChange={this.handleChange} value={this.state.name}/>
                    <input name="chips" onChange={this.handleChange} value={this.state.chips}/>
                    <button onClick={this.handleSubmit}/>
                </form>
            </div>
        )
    }
}