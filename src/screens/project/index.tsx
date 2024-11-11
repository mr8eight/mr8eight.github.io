import React from "react";
import { Link, Route, Routes, Navigate, useLocation } from "react-router-dom";
import { KanbanScreen } from "screens/kanban";
import { EpicScreen } from "screens/epic";
import styled from "@emotion/styled";
import { ScreenContainer } from "components/lib";
import { Menu } from "antd";

const useRouteType = () => {
    const units = useLocation().pathname.split('/')
    return units[units.length - 1]
}

export const ProjectScreen = () => {
    return (
        <Container>
            <Aside>
                <Menu mode={"inline"}>
                    <Menu.Item key={'kanban'} selectedKeys={[useRouteType()]}>
                        <Link to={'kanban'}>看板</Link>
                    </Menu.Item>
                    <Menu.Item key={'epic'}>
                    <Link to={'epic'}>任务组</Link>
                    </Menu.Item>
                </Menu>
            </Aside>
            <Main>
                <Routes>
                    <Route path={'kanban'} element={<KanbanScreen />} />
                    <Route path={'epic'} element={<EpicScreen />} />
                    <Route path="*" element={<Navigate to={window.location.pathname + '/kanban'} replace={true}/>} /> {/* 处理未匹配的路由 */}
                </Routes>
            </Main> 
        </Container>
    );
};

const Aside = styled.div`
    background-color: rgb(244,245,247);
    display: flex;
`

const Main = styled.div`
    box-shadow: -5px 0 -5px -5px rgba(0,0,0,0.1);
    display: flex; 
    overflow: hidden;
`

const Container = styled.div`
    display: grid;
    grid-template-columns: 16rem 1fr;
    width: 100%;
`