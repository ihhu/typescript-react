import React,{Component,useState} from "react";
import {Input, Select, DatePicker} from "antd";
import { Moment } from "moment";
import { userList,User} from "@/Utils/data";

const {Option} = Select;

enum UserId {
    tuture, mRcfps, crxk, pftom, holy

}

export interface TodoValue {
    content?:string;
    user?:UserId;
    date?:string;
};

interface TodoInputProps{
    value?:TodoValue;
    onChange?:(value:TodoValue) => void;
}

interface TodoInputState {
    content:string;
    user:UserId;
    date:string;
}
class TodoInput extends Component<TodoInputProps,TodoInputState>{
    state = {
        content:"",
        user:UserId.tuture,
        date:""
    };
    private triggerChange = (changedValue:TodoValue) => {
        const {content, user, date} = this.state;
        const {value, onChange} = this.props;
        
        if(onChange){
            onChange({content, user, date, ...value, ...changedValue})
        }
    }
    private onContentChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const { value = {} } = this.props;
        
        if(!("content" in value)){
            console.log("onContentChange init");
            this.setState({
                content:e.target.value
            })
        }

        this.triggerChange({content:e.target.value});
    }
    private onUserChange = (selectValue:UserId) => {
        const { value = {} } = this.props;
        
        if(!("user" in value)){
            console.log("onUserChange init");
            this.setState({
                user:selectValue
            })
        }

        this.triggerChange({user:selectValue});
    }
    private onDateOk = (date:Moment) => {
        const { value = {} } = this.props;
        
        if(!("date" in value)){
            console.log("onDateOk init");
            this.setState({
                date:date.format("YYYY-MM-DD HH:mm")
            })
        }

        this.triggerChange({date:date.format("YYYY-MM-DD HH:mm")});
    };
    public render(){
        const { value } = this.props;
        const { content, user } = this.state;

        return (
            <div className="todoInput">
                <Input
                    type="text"
                    placeholder = "输入待办事件内容"
                    value = {value?.content??content}
                    onChange = {this.onContentChange}
                />
                <Select
                    style = {{width:80}}
                    size = "small"
                    defaultValue = {UserId.tuture}
                    value = {value?.user??user}
                    onChange = {this.onUserChange}
                >
                    {userList.map((user:User)=> (
                        <Option value = {user.id} key = {user.id}>{user.name}</Option>
                    ))}

                </Select>
                <DatePicker
                    showTime
                    size = "small"
                    onOk = {this.onDateOk}
                    style = {{ marginLeft :"16px",marginRight:"16px"}}
                />
            </div>
        );
    }
}

function TodoInputFC({value={},onChange}:TodoInputProps){

    const [ content, setContent ] = useState("");
    const [ user, setUser ] = useState(UserId.tuture);
    const [ date, setDate ] = useState("")
    
    const triggerChange = (changeValue:TodoValue)=>{
        if(onChange){
            onChange({content, user, date, ...value, ...changeValue})
        }
    };

    const onContentChange = (e:any)=>{
        setContent(e.target.value)
        triggerChange({content:e.target.value})
    };

    const onUserChange = (selectValue: UserId) => {
        setUser(selectValue);
        triggerChange({ user: selectValue });
    };

    const onDateOk = (date: Moment) => {
        setDate(date.format("YYYY-MM-DD HH:mm"));
        triggerChange({ date: date.format("YYYY-MM-DD HH:mm") });
    };

    return (
        <div className="todoInput">
            <Input
                type="text"
                placeholder = "输入待办事件内容"
                value = {value.content||content}
                onChange = {onContentChange}
            />
            <Select
                style = {{width:80}}
                size = "small"
                defaultValue = {UserId.tuture}
                value = {user}
                onChange = {onUserChange}
            >
                {userList.map((user:User)=> (
                    <Option value = {user.id} key = {user.id}>{user.name}</Option>
                ))}

            </Select>
            <DatePicker
                showTime
                size = "small"
                onOk = {onDateOk}
                style = {{ marginLeft :"16px",marginRight:"16px"}}
            />
        </div>
    )
}

export default TodoInputFC;