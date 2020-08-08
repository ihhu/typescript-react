import React,{useState} from "../Pages/Index/node_modules/react";

export default function Button(){
    const [buttonText,setButtonText] = useState("Click me, please");

    function onBtnClick(){
        return setButtonText("Thanks,been clicked!")
    }

    return <button onClick={onBtnClick}>{buttonText}</button>
}