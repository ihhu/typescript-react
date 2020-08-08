import React,{Component} from "../Pages/Index/node_modules/react";
import Common from "../Pages/Index/node_modules/@Components/Common.js.js";

class B extends Component{
    constructor(){
        super()
    }
    render(){
        return (
            <div>
                <Common/>
                <h2>this is b view</h2>
            </div>
        )
    }
}

export default B;