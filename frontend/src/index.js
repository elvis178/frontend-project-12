import ReactDOM from 'react-dom/client'
import { io } from 'socket.io-client'
import init from './init.jsx'
import './index.css'

const socket = io()

const app = async () => {
  const root = ReactDOM.createRoot(document.getElementById('root'))
  root.render(await init(socket))
}

app()
