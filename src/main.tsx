import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./service-worker.js')
        .then((registration) => {
            console.log('ServiceWorker registration successful with scope: ', registration.scope)
        })
        .catch((err) => {
            console.log('ServiceWorker registration failed: ', err)
        })
}

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>,
)
