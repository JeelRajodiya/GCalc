import React from "react";


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

class RadBtn extends React.Component{
    
    render(){
        return(
            <span id="rad-btn">RAD</span>
            )
    }
}

export default class MenuBar extends React.Component{
 render(){
    return (
        <div id="menu-bar">
        <RadBtn/>
        <TitleBar/>
        <MenuBtn/>
        </div>
        )
 }

}


