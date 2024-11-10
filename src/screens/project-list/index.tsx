import React from 'react';
import { cleanObject, useDebounce, useDocumentTitle, useMount } from "../../utils"
import { List, Project } from "./list"
import { SearchPanel, User } from "./search-panel"
import { useEffect,useState } from "react"
import styled from '@emotion/styled';
import { Button, Row, Typography } from 'antd';
import { useProjects } from 'utils/project';
import { useUsers } from 'utils/user';
import { useUrlQueryParam } from 'utils/url';
import {useProjectModal, useProjectsSearchParams} from './util'
import { ButtonNoPadding } from 'components/lib';

export const ProjectListScreen = () => {

    useDocumentTitle('项目列表',false)
    const [param,setParam] = useProjectsSearchParams()
    const{isLoading,error,data:list, retry} = useProjects(useDebounce(param,200))
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
            {error ? <Typography.Text type={"danger"}>{error.message}</Typography.Text>:null}
            <List 
                refresh={retry} 
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
`

