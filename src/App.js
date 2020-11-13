import React from 'react';
import './App.scss';
import InputCalc from "./components/inputCalc/inputCalc"

import Buttons from "./components/buttons/buttons.js"
import { act } from 'react-dom/test-utils';

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.btnAll = [
      {id:19},
      {nameBtn:"+/-",targetOfButton: "isChange", id:18},
      {nameBtn:"←", targetOfButton: "isDel", id:16},
      {nameBtn:"*", targetOfButton: "isOperation", id:13},
      {nameBtn:9, targetOfButton: "isDigit", id:10},
      {nameBtn:8, targetOfButton: "isDigit", id:9},
      {nameBtn:7, targetOfButton: "isDigit", id:8},
      {nameBtn:"/", targetOfButton: "isOperation", id:14},
      {nameBtn:6, targetOfButton: "isDigit", id:7},
      {nameBtn:5, targetOfButton: "isDigit", id:6},
      {nameBtn:4, targetOfButton: "isDigit", id:5},
      {nameBtn:"+", targetOfButton: "isOperation", id:12},
      {nameBtn:3, targetOfButton: "isDigit", id:4},
      {nameBtn:2, targetOfButton: "isDigit", id:3},
      {nameBtn:1, targetOfButton: "isDigit", id:2},
      {nameBtn:"-", targetOfButton: "isOperation", id:11},
      {nameBtn:0, targetOfButton: "isDigit", id:1},
      {nameBtn:"=", targetOfButton: "isRavno", id:17},
      {nameBtn:"clear", targetOfButton: "isClear", id:15},
      {nameBtn:".", targetOfButton: "isDigit", id:20},
    ]
    this.maxId = 21
    this.state = {
      text: "",
      firstPart: "",
      secondPart: null,
      action: null,
      isPrevRavno: false
    }
  }

  onInputDigits = (id) => {
    const el = this.btnAll.find(item => item.id === id)
    const temp = `${this.state.text}${el.nameBtn}`.replace(/\./,"#").replace(/\./g,"").replace(/#/,".")
    console.log(temp)
    if(/\./.test(temp)) {
      this.setState({
        text: temp
      })
    } else {
      this.setState({
        text: +temp
      }) 
    }
  }
  onChangeValue = (value) => {
    console.log(value, " value")
    console.log(/\./.test(value), " test")
    if(/\./.test(value)) {
      this.setState({
        text: value
      })
    } else {
      this.setState({
        text: +value
      }) 
    }
  }

  mathOperation = (id) => {
    const action = this.state.action
    if(this.state.text.length !== 0) {

      const btn = this.btnAll.find(el => el.id === id)
      let res;
      switch(btn.nameBtn) {
        case "*" :
          this.setState({action: "multi"}) 
          break;
        case "/" : 
          this.setState({action: "div"}) 
          break;
        case "+" : 
          this.setState({action: "plus"}) 
          break;
        case "-" : 
          this.setState({action: "minus"}) 
          break    
      }
      if(this.state.firstPart && !this.state.isPrevRavno) {
        switch(action) {
          case "multi": 
            res = +this.state.firstPart * +this.state.text 
            break;
          case "div": 
            res = +this.state.firstPart / +this.state.text 
            break;
          case "plus": 
            res = +this.state.firstPart + +this.state.text 
            break;
          case "minus": 
            res = +this.state.firstPart - +this.state.text 
            break;
        } 
      } else {
        if(this.state.text === ".") {res = 0} else {
          res = +this.state.text
        }
      }

      
      this.setState({
        firstPart: res,
        text: "",
        secondPart: null,
        isPrevRavno: false
      })
  }
    
  }
  onCountRavno = async () =>  {
    const {action,text,firstPart,secondPart} = this.state;
    if(firstPart !== "") {
      const sum = (a,b) => a+b
      const mult = (a,b) => a*b
      const del = (a,b) => a/b
      const min = (a,b) => a-b
      const countRes = async (secondPart, func) => {
        if(typeof secondPart == "object") {
          await this.setState({
            secondPart: +this.state.text,
          }) 
          await console.log(this.state.secondPart, " SECOND ")
          await this.setState({
            text: +(func(+this.state.firstPart,+this.state.secondPart).toFixed(10))
          })
        } else {
          this.setState({text: +(func(+this.state.text,+this.state.secondPart).toFixed(10))})
        }
      } 
      switch(action) {
        case "multi": 
          countRes(secondPart,mult)
          break
        case "div": 
          countRes(secondPart,del)
          break
        case "plus": 
          countRes(secondPart,sum)
          break
        case "minus": 
          countRes(secondPart,min)
          break  
      }

      // switch(action) {
      //   case "multi":
      //     if(typeof secondPart == "object") {
      //       await this.setState({
      //         secondPart: this.state.text,
      //       }) 
      //       await this.setState({
      //         text: +((this.state.firstPart * this.state.secondPart).toFixed(6))
      //       })
      //     } else {
      //       this.setState({text: this.state.text * this.state.secondPart})
      //     }
      //     break
      //   case "div":
      //     if(typeof secondPart == "object") {
      //       await this.setState({
      //         secondPart: this.state.text,
      //       }) 
      //       await this.setState({
      //         text: +this.state.firstPart / +this.state.secondPart
      //       })
      //     } else {
      //       this.setState({text: +this.state.text / +this.state.secondPart})
      //     }
      //     break
      //   case "plus":
      //     if(typeof secondPart == "object") {
      //       await this.setState({
      //         secondPart: this.state.text,
      //       }) 
      //       await this.setState({
      //         text: +this.state.firstPart + +this.state.secondPart
      //       })
      //     } else {
      //       this.setState({text: +this.state.text + +this.state.secondPart})
      //     }
      //     break
      //   case "minus":
      //     if(typeof secondPart == "object") {
      //       await this.setState({
      //         secondPart: this.state.text,
      //       }) 
      //       await this.setState({
      //         text: +this.state.firstPart - +this.state.secondPart
      //       })
      //     } else {
      //       this.setState({text: +this.state.text - +this.state.secondPart})
      //     }
      //     break 
      // }
      this.setState({isPrevRavno:true})
    }
  }
  onClearInput = () => {
    this.setState({
      text: "",
      firstPart: "",
      secondPart: null,
      action: null,    
    })
  }
  onDelLastSymbol = () => {
    const delSym = (text, num) => {
      if(text.length && text.length > num) {
        const temp = text.substr(0,text.length-1)
        this.setState({
          text: +temp
        })
      } else {
        this.setState({
          text: ""
        })
      }
    }
    let {text} = this.state
    text = String(text)
    if(text && +text >=0) {
      delSym(text,1)
    } else if(text && +text < 0) {
      delSym(text,2)
    }  
  }
  onChangeZnak = () => {
    this.setState(({text}) => ({
      text: -+text
    }))
  }

  render() {
    const {text} = this.state
    const btnsAll = this.btnAll
    return (
      <div className="App">
        <InputCalc valueInput={text}  onChangeValue={this.onChangeValue} firstPart={this.state.isPrevRavno ? null : this.state.firstPart}/>
        <Buttons 
          btnsAll={btnsAll} 

          onInputDigits={this.onInputDigits} 
          onMathOperation={this.mathOperation} 
          onCountRavno={this.onCountRavno}
          onClearInput={this.onClearInput}
          onDelLastSymbol={this.onDelLastSymbol}
          onChangeZnak={this.onChangeZnak}
          />
      </div>
    );
  }
}
