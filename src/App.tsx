import { MetamaskProvider } from './metamask/context'
import HelloMetamask from './components/HelloMetamask'
import { app } from './firebase'

console.log(app)

export default function App() {
  return (
    <MetamaskProvider>
      <HelloMetamask />
    </MetamaskProvider>
  )
}
