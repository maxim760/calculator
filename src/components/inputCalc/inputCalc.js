import React from 'react';
import "./inputCalc.scss";


export default class InputCalc extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            textValue: "",
        }
    }
    together = (e) => {
        this.props.onChangeValue(e.target.value)
        this.onCheckValue(e)
        this.controlInput(e)
    }
    controlInput = (e) => {
        this.props.onChangeValue(e.target.value.replace(/[^\d\.]/g,"").replace(/\./,"#").replace(/\./g,"").replace(/#/,"."))
    }
    onCheckValue = (e) => {
        this.setState({
            textValue: +e.target.value
        })
    }

    render () {
        const dopInput = this.props.firstPart 
        return (
            <div className="inputWrapper">
                <input
                    className="input" 
                    type="text"
                    placeholder="Вводите числа" 
                    value={this.props.valueInput}
                    onChange={this.together} />
                <p className="textMemory">{dopInput}</p>
            </div>
        )
    }
}