import { useSetUrlSearchParam } from "utils/url"
import { useTasksSearchParams } from "./util"
import { Row } from "components/lib"
import React from "react"
import { Button, Input } from "antd"
import { UserSelect } from "components/user-select"
import { TAskTypesSelector } from "components/task-type-selector"

export const SearchPanel = () => {
    const searchParams = useTasksSearchParams()
    const setSearchParams = useSetUrlSearchParam()
    const reset = () => {
        setSearchParams({
            typeId: undefined,
            processorId: undefined,
            tagId: undefined,
            name : undefined,
        })
    }

    return <Row marginBottom={4} gap={true}>
        <Input style={{width: '20rem'}} placeholder={'任务名'} value={searchParams.name}
            onChange={evt => setSearchParams({name:evt.target.value})}/>
        <UserSelect defaultOptionName={'经办人'} value={searchParams.processorId}
            onChange={value => setSearchParams({processorId:value})}/>
        <TAskTypesSelector defaultOptionName={'类型'} value={searchParams.typeId}
            onChange={value=>setSearchParams({typeId:value})}/>
        <Button onClick={reset}>清除筛选器</Button>
    </Row>
}