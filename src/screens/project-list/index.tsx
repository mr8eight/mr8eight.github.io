import React from 'react';
import { cleanObject, useDebounce, useDocumentTitle, useMount } from "../../utils"
import { List } from "./list"
import { SearchPanel } from "./search-panel"
import { useEffect,useState } from "react"
import styled from '@emotion/styled';
import { Row } from 'antd';
import { useProjects } from 'utils/project';
import { useUsers } from 'utils/user';
import {useProjectModal, useProjectsSearchParams} from './util'
import { ButtonNoPadding } from 'components/lib';
import { ErrorBox } from 'components/lib';

export const ProjectListScreen = () => {

    useDocumentTitle('项目列表',false)
    const [param,setParam] = useProjectsSearchParams()
    const {isLoading,error,data:list} = useProjects(useDebounce(param,200))
    const {data:users} = useUsers()
    const {open} = useProjectModal()
    return (
        <Container> 
            <Row style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h1>项目列表</h1>
                    <ButtonNoPadding 
                        onClick={open}
                        type={'link'}>
                            创建项目
                </ButtonNoPadding>
            </Row>

            <SearchPanel users={users || []} param={param} setParam={setParam}/>
            <ErrorBox error={error} />
            <List 
                loading={isLoading} 
                users={users || []} 
                dataSource={list || []}
                />
        </Container>
    ) 
        
}

ProjectListScreen.whyDidYouRender = false

const Container = styled.div`
    padding:3.2rem;
    width: 100vw;
    
    /* border: 5px solid black; */
`

