import {useEffect, useState} from "react";
import {Card, CardHeader, CardTitle, CardDescription} from "@/components/ui/card";

interface Todo {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}

function App() {
    const [todos, setTodos] = useState<Todo[]>([])

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/todos")
            .then((response) => response.json())
            .then((todos) => setTodos(todos));
    }, []);

    return (
        <>
            <h1 className="text-4xl font-extrabold text-center">
                Todos-PWA
            </h1>
            <ul className="space-y-4 mt-4 max-w-2xl mx-auto">
                {todos.map((todo) => {
                    return (
                        <li key={todo.id}>
                            <Card>
                                <CardHeader>
                                    <CardTitle>{todo.title}</CardTitle>
                                    <CardDescription>
                                        {todo.completed ? "Completed" : "Not Completed"}
                                    </CardDescription>
                                </CardHeader>
                            </Card>
                        </li>
                    )
                })}
            </ul>
        </>
    )
}

export default App
