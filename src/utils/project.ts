import { cleanObject } from "utils";
import { useAsync } from "./use-async";
import { useEffect } from "react";
import { Project } from "screens/project-list/list";
import { useHttp } from "./http";

export const useProjects = (param?:Partial<Project>) => {
    const client = useHttp()
    const{run,...result} = useAsync<Project[]>()

    useEffect(() => {
        run(client('projects',{data:cleanObject(param || {})}))
    },[param]);

    return result
}
