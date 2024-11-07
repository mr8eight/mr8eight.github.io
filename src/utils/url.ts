import { useMemo } from 'react'
import {URLSearchParamsInit, useSearchParams} from 'react-router-dom'
import { cleanObject } from 'utils'

export const useUrlQueryParam = <K extends string>(keys:K[]) => {
    const[searchParams,setSearchParam] = useSearchParams()
    return [
        useMemo(
            ()=>keys.reduce((prev,key) => {
                return {...prev, [key]:searchParams.get(key) || ''}
            },{} as {[key in K]:string}), 
             
            [searchParams] 
        ),
        (params:Partial<{[key in K]:unknown}>) => {
            const o = cleanObject({...Object.fromEntries(searchParams),...params}) as URLSearchParamsInit
            return setSearchParam(o)
        }
        ]as const
}

// 添加一个空的 export 语句来将文件视为模块
export {}; // 添加这一行