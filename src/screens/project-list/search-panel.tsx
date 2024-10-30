import React, { useEffect } from 'react';


export interface User{
    id:string;
    name:string;
    email:string;
    title:string;
    organization:string
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
    // }, [param]); // 依赖数组包含 param，当 param 改变时，会执行 useEffect

    return <form >
        <div>
            <input
                type="text"
                value={param.name}
                onChange={evt => {
                    console.log('evt:',evt); // 打印事件对象
                    setParam({
                        ...param,
                        name: evt.target.value
                    });
                }}
            />
            <select value={param.personId} onChange={evt => setParam({
                ...param,
                personId:evt.target.value
                })}>
                    <option value={''}>负责人</option>
                    {
                        users.map(user => <option key={user.id} value={user.id}>{user.name}</option>)
                    }
                </select>
        </div>
    </form> 
}