import {useCallback, useEffect, useState} from "react";
import {Card, CardHeader, CardTitle, CardDescription} from "@/components/ui/card";
import {Button} from "@/components/ui/button.tsx";

interface Todo {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}

export interface IBeforeInstallPromptEvent extends Event {
    readonly platforms: Array<string>;
    readonly userChoice: Promise<{
        outcome: 'accepted' | 'dismissed',
        platform: string
    }>;

    prompt(): Promise<void>;
}

function App() {
    const [todos, setTodos] = useState<Todo[]>([])
    const [deferredPrompt, setDeferredPrompt] = useState<IBeforeInstallPromptEvent | null>(null)

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/todos")
            .then((response) => response.json())
            .then((todos) => setTodos(todos));
    }, []);

    useEffect(() => {
        const handler = (e: Event) => {
            e.preventDefault()
            setDeferredPrompt(e as IBeforeInstallPromptEvent)
        }

        window.addEventListener("beforeinstallprompt", handler)
        return () => window.removeEventListener("beforeinstallprompt", handler)
    }, [])

    const handleInstall = useCallback(() => {
        if (!deferredPrompt) return
        void deferredPrompt.prompt()
        deferredPrompt.userChoice.then(console.log)
    }, [deferredPrompt])

    return (
        <>
            <h1 className="text-4xl font-extrabold text-center">
                Todos-PWA
            </h1>
            <Button className="mt-4 mx-auto max-w-2xl block" onClick={handleInstall}>Install</Button>
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
