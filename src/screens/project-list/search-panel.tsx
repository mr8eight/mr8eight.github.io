// @ts-ignore
// /** @jsx jsx */
// import {jsx} from '@emotion/react'
import React from 'react';
import { Form, Input, Select } from 'antd';
import { useEffect } from 'react';
import { Project } from './list';
import { UserSelect } from 'components/user-select';



export interface User{
    id:number;
    name:string;
    email:string;
    title:string;
    organization:string;
    token:string
} 
interface SearchPanelProps{
    users: User[],
    param: Partial<Pick<Project, 'name' | 'personId'>>,
    setParam:(param:SearchPanelProps['param']) => void
}
export const SearchPanel = ({users,param,setParam}:SearchPanelProps) => {

    //   // 使用 useEffect 监听 param 的变化
    //   useEffect(() => {
    //     console.log('Param changed:', param);
    //     // 这里可以添加其他副作用，例如请求数据
    // }, [param]); // 依赖数组包含 param，当 param 改变时，会执行 useEffect
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
                onChange={evt => 
                    setParam({
                        ...param,
                        name: evt.target.value,
                    })
                }
            />
            
        </Form.Item>
        <Form.Item>
            <UserSelect  
                defaultOptionName={'负责人'}
                value={param.personId} 
                onChange={(value) => 
                    setParam({
                    ...param,
                    personId: value,
                    })
                }/>
        </Form.Item>
    </Form> 
    );
}