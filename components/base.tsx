import React from "react";

interface CalcBtnProps {
    text:string;
    col:string;
    row:string;
    changeVal:any;
    activeColor:string;
    
}

interface CalcBtnState{
    bgcolor:string;
}

class CalcBtn extends React.Component<CalcBtnProps,CalcBtnState>{
    
    constructor(props:any){
        super(props);
        this.touchStartHandler = this.touchStartHandler.bind(this);
        this.touchEndHandler = this.touchEndHandler.bind(this);
        this.state = {bgcolor:"inherit"}
        
    }
    touchStartHandler(){
        if (this){            
            this.setState({bgcolor:this.props.activeColor})

        }
    }

    touchEndHandler(){
    setTimeout(()=>{
    this.setState({bgcolor:"inherit"})
            },200)
    }
    render(){
            
        return (
            <button className="calc-btn" 
            onTouchStart={(e) => {
                this.props.changeVal(e);
                this.touchStartHandler();
            }}
            onTouchEnd={this.touchEndHandler}
            style={{gridRow:this.props.row,
                gridColumn:this.props.col,
                backgroundColor:this.state.bgcolor
            }}
            //@ts-ignore
            value={this.props.text}
                >
            
            
            {this.props.text}
            </button>
            
            );
    }
}



class Tools{
    static genBtnGrid(data:string[][],props:any,activeColor:string){
        
        let result = [];
        let row = 1;
        let col = 1;
         
        for (let item of data){
            for (let item2 of item){
                if (item2 === ""){col++; continue};
                result.push(<CalcBtn text={item2}
                 row={row.toString()}
                 col={col.toString()}
                 changeVal={props.changeVal}
                 activeColor = {activeColor as string}
                 key={item2}
                
                />);
                col++
            }
            row++
            col = 1;
        }
        return result;
    }
}

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

export {CalcBtn,Tools,DisplayMain,DisplaySub}