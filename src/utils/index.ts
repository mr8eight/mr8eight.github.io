import { useEffect ,useRef,useState} from "react"

export const isFalsy = (value:any) => value === 0 ? false:!value
export const isVoid = (value:unknown) => value === undefined || value === null || value === ''

export const cleanObject = (object?: { [key: string]: unknown }) => {
    // Object.assign({}, object)
    if (!object) {
      return {};
    }
    const result = { ...object };
    Object.keys(result).forEach((key) => {
      const value = result[key];
      if (isVoid(value)) {
        delete result[key];
      }
    });
    return result;
  };

export const useMount = (callback:()=>void) => {
    useEffect(()=>{
        callback()
    },[callback])
};

export const useDebounce = <V>(value:V ,delay?:number) => {

    const [debouncedValue,setDebouncedValue] = useState(value)

    useEffect(()=>{
        const timeout = setTimeout(()=>setDebouncedValue(value),delay)
        return ()=>clearTimeout(timeout)
    },[value,delay])

    // console.log(debouncedParam)
    return debouncedValue
}

export const useArray = <T>(initialArray:T[])=>{
    const[value ,setValue] = useState(initialArray)
    return {
        value,
        setValue,
        add : (item:T) =>{setValue([...value,item])},
        clear: () =>{setValue([])},
        removeIndex: (index:number) => {
            const copy = [...value];
            copy.splice(index,1);
            setValue(copy);
        }
    }

}

export const useDocumentTitle = (title : string, keepOnUnmount = true) => {
    const oldTitle = useRef(document.title).current ;

    useEffect(()=>{
        document.title = title
    },[title])

    useEffect(()=>{
        return () => {
            if(!keepOnUnmount){
                document.title = oldTitle
            }
        }
    },[keepOnUnmount,oldTitle]);
}

export const resetRoute = () => (window.location.href = window.location.origin);

export const subset = <
  O extends { [key in string]: unknown },
  K extends keyof O
>(
  obj: O,
  keys: K[]
) => {
  const filteredEntries = Object.entries(obj).filter(([key]) =>
    keys.includes(key as K)
  );
  return Object.fromEntries(filteredEntries) as Pick<O, K>;
};


export const useMountedRef = () => {
    const mountedRef = useRef(false);

    useEffect(()=>{
        mountedRef.current = true
        return ()=>{
            mountedRef.current = false
        }
    })
    return mountedRef
}