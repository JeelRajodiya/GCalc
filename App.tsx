// 1.0

import React from 'react';
import { IonApp } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import "./App.scss";
import {
  Plugins
} from "@capacitor/core";

import * as baseComponents from "./components/base";
//@ts-ignore
import Calc from "./calc.tsx";
var calc = new Calc();


var Tools = baseComponents.Tools;
var DisplayMain = baseComponents.DisplayMain;
var DisplaySub = baseComponents.DisplaySub;

const {StatusBar,SplashScreen} = Plugins;
SplashScreen.hide();


interface StatusBarOverlaysWebviewOptions{
    overlay:boolean;
}
let data:StatusBarOverlaysWebviewOptions;
data =  {overlay:true};
StatusBar.setOverlaysWebView(data);
const log = console.log;

interface DialPadSignsProps{
    changeVal:any
}
class DialPadSigns extends React.Component<DialPadSignsProps>{
   
    render(){
        let data:string[][]=[
                            ["÷","←"],
                            ["×", ""],
                            ["-", ""],
                            ["+","="]
                            ]
        let bgActive = "rgba(100,100,100,0.4)"
        let result = Tools.genBtnGrid(data,this.props,bgActive);
        return (<div id="dial-pad-signs">{result}</div>)

    }
}
interface DialPadNumsSpecialsProps{
    changeVal:any
}
class DialPadSpecials extends React.Component<DialPadNumsSpecialsProps>{
    
    render(){
        let data:string[][]=[
        ["INV","RAD","sin","cos","tan"],
        ["%"  ,"ln" ,"log", "√" ,"^"  ],
        ["π"  ,"e"  ,"("  ,")"  ,"!"  ]
        ]
        let bgActive = "rgba(160,160,160,0.3)"
        let result = Tools.genBtnGrid(data,this.props,bgActive);
        return (<div id="dial-pad-specials">{result}</div>)
       
    }
}

interface DialPadNumsProps{
    changeVal:any
}
interface DialPadNumsState{
    
}
class DialPadNums extends React.Component<DialPadNumsProps,DialPadNumsState>{
   
    render(){

        let data:string[][] = [
                              ["7","8","9"],
                              ["4","5","6"],
                              ["1","2","3"],
                              ["0","."    ]
                              ];
        let bgActive = "rgba(100,100,100,0.4)"
        let result = Tools.genBtnGrid(data,this.props,bgActive);
        return (<div id="dial-pad-nums">{result}</div>)
    }

}
interface DialPadProps{
    changeVal:any;
}
class DialPad extends React.Component<DialPadProps>{
    
    render(){
        return(
            <div id="dial-pad" >
            <DialPadSpecials changeVal={this.props.changeVal}/>
            <DialPadSigns changeVal={this.props.changeVal}/>
            <DialPadNums changeVal={this.props.changeVal}/>
            
            </div>
            )
    }
}

interface DisState{
    readonly:boolean;
}
interface DisProps{
    displayVal:string;
    subDisplayVal:string;
}
class Display extends React.Component<DisProps,DisState>{
    
    constructor(props:any){
    super(props);

    this.state = {
        readonly:true,
        };
    
    }

    
    render():any{
        return(
            <div id="display">
            <DisplayMain value={this.props.displayVal}/>
            <DisplaySub value={this.props.subDisplayVal}/>
            </div>
            )
    }
}




interface CalcState{
    displayVal:string;
    subDisplayVal:string;
    displayData:string[];
}


class Calculator extends React.Component<{},CalcState>{
    constructor(props:any){
        super(props);
        this.state = {
            displayVal:"",
            subDisplayVal:"",
            displayData:[]
        }
        this.ChangeVal = this.ChangeVal.bind(this);
    }
    ChangeVal(e:any){
        let input = e.target.getAttribute("value");
        this.state.displayData.push(input);
        let [displayData,displayVal,subDisplayVal] = Calc.resolve(this.state.displayData);
        this.setState({
            displayVal:displayVal,
            displayData:displayData,
            subDisplayVal:subDisplayVal
        })
        
    }
    render():any{
        return (
            <div id="calculator-root">
            <MenuBar/>
            <Display displayVal={this.state.displayVal} subDisplayVal={this.state.subDisplayVal}/>
            <DialPad  changeVal={this.ChangeVal}/>
            </div>
            );
    }
}
function App():any {

  return (
    <IonApp>
      <IonReactRouter>
      <Calculator/>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;


