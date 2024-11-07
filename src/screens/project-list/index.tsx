import React from 'react';
import { cleanObject, useDebounce, useDocumentTitle, useMount } from "../../utils"
import { List, Project } from "./list"
import { SearchPanel, User } from "./search-panel"
import { useEffect,useState } from "react"
import styled from '@emotion/styled';
import { Typography } from 'antd';
import { useProjects } from 'utils/project';
import { useUsers } from 'utils/user';
import { useUrlQueryParam } from 'utils/url';

export const ProjectListScreen = () => {

    const [param,setParam] = useUrlQueryParam(['name','personId'])
    // console.log(param,'param')
    const debouncedParam = useDebounce(param,200) 
    const{isLoading,error,data:list} = useProjects(debouncedParam)
    const {data:users} = useUsers()

    useDocumentTitle('项目列表',false)

    return (
        <Container> 
            <h1>项目列表</h1>
            <SearchPanel users={users || []} param={param} setParam={setParam}/>
            {error ? <Typography.Text type={"danger"}>{error.message}</Typography.Text>:null}
            <List loading={isLoading} users={users || []} dataSource={list || []}/>
        </Container>
    )
        
}

ProjectListScreen.whyDidYouRender = false

const Container = styled.div`
    padding:3.2rem;
`