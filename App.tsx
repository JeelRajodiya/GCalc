// 1.0
// build 21

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

//baseComponents
var Tools = baseComponents.Tools;

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
    isRAD:boolean;
    clearBtn:string;
}


class Calculator extends React.Component<{},CalcState>{
    constructor(props:any){
        super(props);

        this.state = {
            displayVal:"",
            subDisplayVal:"",
            displayData:[],
            isINV:false,
            isRAD:true,
            clearBtn:"←",

            dialPadSpecialsBtns:[
            ["INV","RAD","sin","cos","tan"],
            ["%"  ,"ln" ,"log", "√" ,"^"  ],
            ["π"  ,"e"  ,"("  ,")"  ,"!"  ]]
            }

        this.ChangeVal = this.ChangeVal.bind(this);
        this.handleINVclick = this.handleINVclick.bind(this);
        this.handleOnAnswer = this.handleOnAnswer.bind(this);
    }

    handleINVclick(){
        if (this.state.isINV){

            this.setState({
                isINV:false,
                dialPadSpecialsBtns:[
                ["INV","RAD","sin","cos","tan"],
                ["%"  ,"ln" ,"log", "√" ,"^"  ],
                ["π"  ,"e"  ,"("  ,")"  ,"!"  ]]
            });
        }
        else{
            this.setState({
                isINV:true,
                dialPadSpecialsBtns:[
                ["INV","RAD","sin⁻¹","cos⁻¹","tan⁻¹"],
                ["%"  ,"eⁿ" ,"10ⁿ", "xⁿ" ,"^"  ],
                ["π"  ,"e"  ,"("  ,")"  ,"!"  ]]
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
        else if (input === "="){
            this.handleOnAnswer();
        }
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


