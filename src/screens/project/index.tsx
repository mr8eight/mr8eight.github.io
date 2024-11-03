import React from "react";
import { Link, Route, Routes, Navigate } from "react-router-dom";
import { KanbanScreen } from "screens/kanban";
import { EpicScreen } from "screens/epic";

export const ProjectScreen = () => {
    return (
        <div>
            <h1>Project Screen</h1>
            <nav>
                <Link to={'kanban'}>看板</Link>
                <Link to={'epic'}>任务组</Link>
            </nav>
            <Routes>
                <Route path={'kanban'} element={<KanbanScreen />} />
                <Route path={'epic'} element={<EpicScreen />} />
                <Route path="*" element={<Navigate to={'kanban'} />} /> {/* 处理未匹配的路由 */}
            </Routes>
        </div>
    );
};
