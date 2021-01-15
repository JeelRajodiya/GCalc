// 1.0
// build 24

import React from 'react';
import { IonApp } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import "./App.scss";
import {Plugins} from "@capacitor/core";

import * as baseComponents from "./components/base";
import MenuBar from "./components/menu";
import DialPad from "./components/dialpad"
import Display from "./components/display"
//@ts-ignore
import Calc from "./calc.tsx";

// Calc instance.
var calc = new Calc();

// capacitor core plugins
const {StatusBar,SplashScreen} = Plugins;
//splashscreen hiding for fast load;
SplashScreen.hide();

// enabling stutasbar overlay web view
interface StatusBarOverlaysWebviewOptions{
    overlay:boolean;}
let data:StatusBarOverlaysWebviewOptions;
data =  {overlay:true};
StatusBar.setOverlaysWebView(data);

const log = console.log;

interface CalcState{
    displayVal:string;
    subDisplayVal:string;
    displayData:string[];
    dialPadSpecialsBtns:string[][];
    isINV:boolean;
    clearBtn:string;
    RADbtn:string;
}


class Calculator extends React.Component<{},CalcState>{
    private dialPadSpecialsBtns:string[][];
    private dialPadSpecialsBtnsINV:string[][];

    constructor(props:any){
        super(props);
        this.dialPadSpecialsBtns = [
        ["INV","RAD","sin","cos","tan"],
        ["%"  ,"ln" ,"log", "√" ,"^"  ],
        ["π"  ,"e"  ,"("  ,")"  ,"!"  ]];

        this.dialPadSpecialsBtnsINV = [
        ["INV","RAD","sin⁻¹","cos⁻¹","tan⁻¹"],
        ["%"  ,"eⁿ" ,"10ⁿ", "x²" ,"^"  ],
        ["π"  ,"e"  ,"("  ,")"  ,"!"  ]]

        this.state = {
            displayVal:"",
            subDisplayVal:"",
            displayData:[],
            isINV:false,
            clearBtn:"←",
            RADbtn:"DEG",
            dialPadSpecialsBtns:this.dialPadSpecialsBtns
            }

        this.ChangeVal = this.ChangeVal.bind(this);
        this.handleINVclick = this.handleINVclick.bind(this);
        this.handleOnAnswer = this.handleOnAnswer.bind(this);
        this.handleRADclick = this.handleRADclick.bind(this);
    }
    handleRADclick(){
        if (this.state.RADbtn === "RAD"){
          this.setState({RADbtn:"DEG"});
          calc.isRAD = false;
          this.dialPadSpecialsBtns[0][1] = this.state.RADbtn;
          this.dialPadSpecialsBtnsINV[0][1] = this.state.RADbtn;
          let dialPadSpecialsBtns = this.state.isINV ? this.dialPadSpecialsBtnsINV : this.dialPadSpecialsBtns;
          this.setState(
            {dialPadSpecialsBtns:dialPadSpecialsBtns});
        }
        else{
          this.setState({RADbtn:"RAD"});
          calc.isRAD = true;
          this.dialPadSpecialsBtns[0][1] = this.state.RADbtn;
          this.dialPadSpecialsBtnsINV[0][1] = this.state.RADbtn;
          let dialPadSpecialsBtns = this.state.isINV ? this.dialPadSpecialsBtnsINV : this.dialPadSpecialsBtns;

          this.setState(
            {dialPadSpecialsBtns:dialPadSpecialsBtns});
        }
    }
    handleINVclick(){

        if (this.state.isINV){

            this.setState({
                isINV:false,
                dialPadSpecialsBtns:this.dialPadSpecialsBtns
            });
        }
        else{
            this.setState({
                isINV:true,
                dialPadSpecialsBtns:this.dialPadSpecialsBtnsINV
            });
        }
    }
    handleOnAnswer(){
        if (this.state.clearBtn==="←"){
            this.setState({clearBtn:"C"})
        }
        else{
         this.setState({clearBtn:"←"})
        }
    }
    ChangeVal(e:any){
        let input = e.target.getAttribute("value");

        if (input === "INV"){
            this.handleINVclick();
            return null;
            }
          else if (input === "RAD" || input === "DEG"){
            this.handleRADclick();

            return null;
          }

        let [displayData,displayVal,subDisplayVal] = calc.resolve(this.state.displayData,input);

        if (displayVal !== "" && subDisplayVal === "" && input === "=" && this.state.clearBtn !=="C" ){
            this.handleOnAnswer();
        }
        else if (input === "C"){
            this.handleOnAnswer();
        }
        else if (this.state.clearBtn === "C" && input !== "="){
            this.handleOnAnswer();
        }
        this.setState({
            displayVal:displayVal,
            displayData:displayData,
            subDisplayVal:subDisplayVal
        })

    }
    render():any{
        return (
            <div id="calculator-root">
            <MenuBar RADbtnVal = {[this.state.RADbtn,this.handleRADclick]}/>
            <Display
                displayVal={this.state.displayVal}
                subDisplayVal={this.state.subDisplayVal}/>
            <DialPad
                dialPadSpecialsBtns={this.state.dialPadSpecialsBtns}
                changeVal={this.ChangeVal}
                clearBtn={this.state.clearBtn}/>
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
