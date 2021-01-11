
import React from "react";
import * as baseComponents from "./base";

var Tools = baseComponents.Tools;
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
    changeVal:any;
    btns:string[][];
}
class DialPadSpecials extends React.Component<DialPadNumsSpecialsProps>{
    
    render(){
        
        let bgActive = "rgba(160,160,160,0.3)"
        let result = Tools.genBtnGrid(this.props.btns,this.props,bgActive);
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
    dialPadSpecialsBtns:string[][];
}
export default class DialPad extends React.Component<DialPadProps>{
    
    render(){
        return(
            <div id="dial-pad" >
            <DialPadSpecials changeVal={this.props.changeVal} btns={this.props.dialPadSpecialsBtns}/>
            <DialPadSigns changeVal={this.props.changeVal}/>
            <DialPadNums changeVal={this.props.changeVal}/>
            
            </div>
            )
    }
}
