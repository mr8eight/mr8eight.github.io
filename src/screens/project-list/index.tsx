import { cleanObject, useDebounce, useMount } from "../../utils"
import { List, Project } from "./list"
import { SearchPanel, User } from "./search-panel"
import { useEffect,useState } from "react"
import qs from 'qs'

const apiUrl = process.env.REACT_APP_API_URL

export const ProjectListScreen = () => {

    const [param,setParam] = useState({
        name:'',
        personId:''
    }) 
    const debouncedParam = useDebounce(param,200)
    const [users,setUsers] = useState([])
    const [list,setList] =  useState([])

    useEffect(() => {
        fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(debouncedParam))}`)
            .then(async (response) => {
                if (response.ok) {
                    setList(await response.json())
                }
            })
            // .catch(error => console.error("Failed to fetch projects:", error))
    }, [debouncedParam])

    useMount(() => {
        fetch(`${apiUrl}/users`)
            .then(async (response) => {
                if (response.ok) {
                    setUsers(await response.json())
                }
            })
            // .catch(error => console.error("Failed to fetch users:", error))
    })

    
    return (
        <div>
            <SearchPanel users={users} param={param} setParam={setParam}/>
            <List users={users} list={list}/>
        </div>
    )
        
}