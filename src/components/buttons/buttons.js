import React from 'react';
import "./buttons.scss"
import Button from '../button/button';
// начинаяю манять
// !!!!!
export default class Buttons extends React.Component {
    render (){
        const {btnsAll, onInputDigits, onMathOperation, onCountRavno,onClearInput, onDelLastSymbol, onChangeZnak} = this.props
        const elements = btnsAll.map(btn => {
            const {nameBtn, targetOfButton,id} = btn
            return (
                    <Button
                        nameBtn={nameBtn} 
                        targetOfButton={targetOfButton}
                        key={id}
                        id={id} 
                        onInputDigits={onInputDigits}
                        onMathOperation={onMathOperation}
                        onCountRavno={onCountRavno}
                        onClearInput={onClearInput}
                        onDelLastSymbol={onDelLastSymbol}
                        onChangeZnak={onChangeZnak}
                         />
                
            )
            
        })
        return (
            <div className="wrapBtns">
                {elements}
            </div>
        )

    }
}