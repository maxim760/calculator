import React from 'react';
import "./button.scss"
export default class Button extends React.Component {

    render () {
        const {nameBtn, targetOfButton,id, onInputDigits, onMathOperation, onCountRavno,onClearInput,onDelLastSymbol,onChangeZnak} = this.props
        const nameClass = (nameBtn ?? "no") === "no" ? "btnCalc--empty" : "btnCalc";
        let onCLickAction;
        switch(targetOfButton) {
            case "isDigit" :
                 onCLickAction =  () => onInputDigits(id)
                 break;
            case "isOperation" :
                 onCLickAction =  () => onMathOperation(id)
                 break;
            case "isClear" :
                 onCLickAction = onClearInput
                 break;
            case "isDel" :
                 onCLickAction = onDelLastSymbol
                 break;
            case "isChange" :
                 onCLickAction = onChangeZnak
                 break;
            case "isRavno" :
                 onCLickAction =  onCountRavno
                 break;
            default:
                 onCLickAction = null
                 break;
        }
        return (
          <div className="btnWrap" key={id}>
              <button 
                className={nameClass} 
                type="button"
                onClick={onCLickAction}>{nameBtn}</button>
          </div>
        )
    }
}