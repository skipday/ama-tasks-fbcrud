import { AddNew } from './AddNew'
import { Todo } from './Todo'
import { useEffect, useState } from 'react'

import { collection, query, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'
import { UserAuth } from '../context/AuthContext'

export const Todos = () => {
    const [todos, setTodos] = useState([])
    const [checkedTodos, setCheckedTodos] = useState([])
    const { user } = UserAuth()

    type todoArr = {
        text?: string,
        id?: string,
        checked?: boolean,
        time?: number
    }

    const sortTodos = (arr: any) => {
        return arr.sort((a: any,b: any) => a.time - b.time)
    }

    useEffect(() => {
        const q = query(collection(db, "users", user.uid, "todos"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            let todosArr: Array<todoArr> = []
            let checkedTodosArr: Array<todoArr> = []
            querySnapshot.forEach(doc => {
                if(!doc.data().checked) { todosArr.push({...doc.data(), id: doc.id}); sortTodos(todosArr) }
                else { checkedTodosArr.push({...doc.data(), id: doc.id}) }
            })
            setTodos(todosArr as any)
            setCheckedTodos(checkedTodosArr as any)
        })
        return () => unsubscribe()
    },[])

    return (
    <div className="w-full h-full flex flex-col justify-end relative">
        <div className="overflow-y-scroll">
            <div className="flex flex-col">
                {checkedTodos.map((todo) => (
                    <Todo key={todo['id']} todo={todo} />
                ))}
            </div>
            <div className="flex flex-col">
                {todos.map((todo) => (
                    <Todo key={todo['id']} todo={todo} />
                ))}
            </div>
        </div>
        <div className="relative flex py-5 items-center">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="flex-shrink mx-4 text-gray-200">Tasks</span>
            <div className="flex-grow border-t border-gray-200"></div>
        </div>
        <div className="w-full p-4">
            <AddNew />
        </div>
    </div>
    )
}