import React from "react";
import "./menu.scss";


class TitleBar extends React.Component{

    render(){
        return(
            <span id="title-bar">

            </span>)
    }
}

class MenuBtn extends React.Component{

    render(){
        return(
            <span id="menu-btn">
            Menu
            </span>)
    }
}

interface RadBtnProps{
  value:any[];
}
class RadBtn extends React.Component<RadBtnProps>{

    render(){
        return(
            <span id="rad-btn" onClick = {this.props.value[1]}>{this.props.value[0]}</span>
            )
    }
}

interface MenuBarProps{
  RADbtnVal:any[];
}
export default class MenuBar extends React.Component<MenuBarProps>{

 render(){
    return (
        <div id="menu-bar">
        <RadBtn value={this.props.RADbtnVal}/>
        <TitleBar/>
        <MenuBtn/>
        </div>
        )
 }

}
