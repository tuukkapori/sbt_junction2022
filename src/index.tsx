import * as ReactDOMClient from 'react-dom/client'

import App from './App'
console.log("LGTM")
const rootElement = document.getElementById('root')
const root = ReactDOMClient.createRoot(rootElement)

root.render(<App />)
