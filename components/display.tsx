import React from "react";

interface DisplayMainProps{
value:string;
}
class DisplayMain extends React.Component<DisplayMainProps>{
        
    render(){
        return (
            //@ts-ignore
            <input id="display-main" name="search" value={this.props.value} readOnly={true}>
            
            </input>
            )
    }
}

interface DisplaySubProps{
value:string;
}
class DisplaySub extends React.Component<DisplaySubProps>{
        
    render(){
        return (
            //@ts-ignore
            <input id="display-sub" name="search" value={this.props.value} readOnly={true}>
            
            </input>
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

export default Display;