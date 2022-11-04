import { MetamaskProvider } from './metamask/context'
import { ChakraProvider } from '@chakra-ui/react'
import HelloMetamask from './components/HelloMetamask'

export default function App() {
  return (
    <MetamaskProvider>
      <HelloMetamask />
    </MetamaskProvider>
  )
}
