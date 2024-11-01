// @ts-ignore
// /** @jsx jsx */
// import {jsx} from '@emotion/react'
import React from 'react';
import { Form, Input, Select } from 'antd';
import { useEffect } from 'react';



export interface User{
    id:string;
    name:string;
    email:string;
    title:string;
    organization:string;
    token:string
}
interface SearchPanelProps{
    users: User[],
    param:{
        name:string;
        personId:string
    },
    setParam:(param:SearchPanelProps['param']) => void
}
export const SearchPanel = ({users,param,setParam}:SearchPanelProps) => {

    //   // 使用 useEffect 监听 param 的变化
    //   useEffect(() => {
    //     console.log('Param changed:', param);
    //     // 这里可以添加其他副作用，例如请求数据
    // // }, [param]); // 依赖数组包含 param，当 param 改变时，会执行 useEffect
    // useEffect(() => {
    //     console.log(users); // 确保这里能打印出用户数据
    // }, [users]);
    

    return (
        <Form style={{marginBottom:'2rem'}} layout={'inline'}>
        <Form.Item>
            <Input
            placeholder={'项目名'}
                type="text"
                value={param.name}
                onChange={evt => {
                    setParam({
                        ...param,
                        name: evt.target.value
                    });
                }}
            />
            
        </Form.Item>
        <Form.Item>
            <Select value={param.personId} onChange={(value) => {
                    console.log("Selected personId:", value); // 添加日志检查
                    setParam({
                    ...param,
                    personId:value
                    })}}>
                        <Select.Option value={''}>负责人</Select.Option>
                        {users.map((user) => (
                            <Select.Option key={user.id} value={user.id}>{user.name}</Select.Option>
                            ))
                        }
                    </Select>
        </Form.Item>
    </Form> 
    )
}