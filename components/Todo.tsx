import { useState } from 'react'
import { UserAuth } from '../context/AuthContext'
import { updateTodo, checkTodo, deleteTodo } from '../helpers/db'

type TodoProps = {
    todo: {
        text: string
        id: string,
        checked: boolean,
        time: string
    }
}

export const Todo: React.FC<TodoProps> = ({todo}) => {
    const [todoText, setTodoText] = useState(todo.text)
    const { user } = UserAuth()

    const handleTodo = (event: any) => {
        setTodoText(event.target.value);
        updateTodo(user, todo, todoText)
    }

    const handleChecked = (event: any) => {
        checkTodo(user, todo, event.target.checked)
    }

    const handleDelete = () => {
        deleteTodo(user, todo)
    }

    return (
        <div className="relative w-full h-14 flex items-center bg-inherit text-md text-gray-300">
            <div className={`realtive flex w-full pl-4 divide-x ${todo.checked ? "divide-gray-800" : "divide-gray-200"}`}>
                <svg onClick={handleDelete} className="cursor-pointer pr-2 w-8 h-6 flex-shrink-0" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="12" fill="#7E869E" fill-opacity="0.25"/>
                    <path d="M8 12H16" stroke="white" stroke-width="1.2"/>
                </svg>
                <input type="text" className={`rounded-none pl-2 ${todo.checked ? "text-gray-700 line-through" : "text-gray-200"} w-full pr-16 appearance-none bg-inherit focus:outline-none focus:underline underline-offset-2`} value={todoText} onInput={handleTodo}/>
            </div>
            <div className="absolute right-4 w-6 h-6 top-1/2 transform -translate-y-1/2">
                <input type="checkbox" value="" onChange={handleChecked} checked={todo.checked} className="cursor-pointer absolute left-0 right-0 top-0 bottom-0 appearance-none w-6 h-6 bg-none"></input>
                { (!todo.checked) ? (
                <svg className="aboslute left-0 w-6 h-6 bottom-0" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="9" cy="9" r="8" stroke="#CCD2E3" stroke-width="2"/>
                </svg>)
                :
                (                
                <svg className="aboslute left-0 w-6 h-6 bottom-0" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M9 18C13.9706 18 18 13.9706 18 9C18 4.02944 13.9706 0 9 0C4.02944 0 0 4.02944 0 9C0 13.9706 4.02944 18 9 18ZM8.76822 12.6402L13.7682 6.64018L12.2318 5.35982L7.9328 10.5186L5.70711 8.29289L4.29289 9.70711L7.29289 12.7071L8.0672 13.4814L8.76822 12.6402Z" fill="#2D2D2D"/>
                </svg>
                )
                }
            </div>
        </div>
    )
}