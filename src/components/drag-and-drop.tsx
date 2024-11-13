import React, { ReactNode } from "react";
import { Draggable, 
        DraggableProps, 
        Droppable, 
        DroppableProps, 
        DroppableProvided, 
        DroppableProvidedProps } from "react-beautiful-dnd";

type DropProps = Omit<DroppableProps,'children'> & {children: ReactNode}

export const Drop = ({children, ...props}:DropProps) => {
    return <Droppable {...props}>
        {
            (provided => {
                if(React.isValidElement(children)){
                    return React.cloneElement(children,{
                        ...provided.droppableProps,
                        // 使用 @ts-ignore 忽略类型错误
                    // @ts-ignore
                        ref: provided.innerRef,
                        provided
                    })
                }
                return <div/>
            })
        }

    </Droppable>
}

type DropChildProps = 
    Partial<{provided: DroppableProvided} & DroppableProvidedProps>
    & React.HTMLAttributes<HTMLDivElement>

export const DropChild = React.forwardRef<HTMLDivElement,DropChildProps>(
    ({children,...props} ,ref) => <div ref={ref} {...props}>
        {children}
        {props.provided?.placeholder}
    </div>
)

type DragProps = Omit<DraggableProps,'children'> & {children: ReactNode}
export const Drag = ({children, ...props}:DragProps) => {
    return <Draggable {...props}>
        {
            provided => {   
                if(React.isValidElement(children)){
                    return React.cloneElement(children,{
                        ...provided.draggableProps,
                        ...provided.dragHandleProps,
                        // 使用 @ts-ignore 忽略类型错误
                    // @ts-ignore
                        ref: provided.innerRef 

                    })
                }
                return <div/>
            }
        }
    </Draggable>
}