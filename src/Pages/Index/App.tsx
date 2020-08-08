
import React,{useRef,useState} from "react";
import {Button, Typography, Form, Tabs } from "antd";
import {css} from "linaria";
import {styled} from "linaria/react";

import TodoInput from "@Components/Index/TodoInput";
import TodoList, { MenuKey } from "@Components/Index/TodoList";

import {todoListData} from "@/Utils/data";

import "./App.css";
import logo from "@Style/Images/logo.svg";

const { Title } = Typography;
const { TabPane } = Tabs;


const appStyle = css`background:#fff;`;
const GlobalApp = styled.div`width:100%;margin:auto;text-align:center;
    table,th,td {border: 1px solid #ccc;border-collapse: collapse;}
    th,td {padding: 5px;text-align: left;}
    .global-logo{width:200px;margin:0 auto;}
    .global-stats > table {margin: auto;margin-top: 0.5rem;margin-bottom: 1rem;}
`

function App(){
    
    const [todoList, setTodoList] = useState(todoListData);
    
    const callback = () => {};
    const onFinish = (values:any) => {
        console.log("Received values from form: ", values);
      };
    const onInputChange = (data:any)=>{
        console.log("onInputChange::",data)
    }
    const ref = useRef(null);
    const activeTodoList = todoList.filter(todo=>!todo.isCompleted);
    const completedTodoList = todoList.filter(todo=>todo.isCompleted);

    const onClick = (todoId: number, key: MenuKey) => {
        console.log(todoId,key);
        if (key === "complete") {
            const newTodoList = todoList.map(todo => {
                if (todo.id === todoId) {
                    return { ...todo, isCompleted: !todo.isCompleted };
                }
                return todo;
            });
        
            setTodoList(newTodoList);
        } else if (key === "delete") {
            const newTodoList = todoList.filter(todo => todo.id !== todoId);
            setTodoList(newTodoList);
        }
    };

    return (
        <GlobalApp>
        <div className={appStyle+" App"} ref= {ref}>
            <div className="container header">
                <img src={logo} alt=""/>
                <Title level={3}>TypeScript React 项目实践</Title>
            </div>
            <div className="container">
                <Form onFinish = {onFinish}>
                    <Form.Item name = "todo">
                        <TodoInput onChange={onInputChange}/>
                    </Form.Item>
                    <Form.Item>
                    <Button type="primary" htmlType="submit">提交</Button>
                </Form.Item>
                </Form>
            </div>
            <div className="container">
                <Tabs onChange = {callback} type="card">
                    <TabPane tab="所有" key="1">
                        <TodoList todoList = {todoList} onClick={onClick}/>
                    </TabPane>
                    <TabPane tab="进行中" key="2">
                        <TodoList todoList = {activeTodoList} onClick={onClick}/>
                    </TabPane>
                    <TabPane tab="已完成" key="3">
                        <TodoList todoList = {completedTodoList} onClick={onClick}/>
                    </TabPane>
                </Tabs>
            </div>
        </div>
        </GlobalApp>
    )
}
export default App;
