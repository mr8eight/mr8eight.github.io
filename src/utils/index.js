import { useEffect ,useState} from "react"

export const isFalsy = (value) => value === 0 ? false:!value

export const cleanObject = (object) => {
    const result = {...object}
    Object.keys(result).forEach(key=>{
        const value = object[key]
        if(isFalsy(value)){
            delete result[key]
        }
    })
    return result;
};

export const useMount = (callback) => {
    useEffect(()=>{
        callback()
    },[])
};

export const useDebounce = (value,delay) => {

    const [debouncedValue,setDebouncedValue] = useState(value)

    useEffect(()=>{
        const timeout = setTimeout(()=>setDebouncedValue(debouncedValue),delay)
        return ()=>clearTimeout(timeout)
    },[value,delay])
    
}