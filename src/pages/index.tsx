import { useRecoilValue } from 'recoil'
import { useMoralis } from 'react-moralis'
import { walletAtom } from 'recoil/atoms'

const Homepage = () => {
  const wallet = useRecoilValue(walletAtom)

  const { isAuthenticated, authenticate, logout } = useMoralis()
  return (
    <>
      {isAuthenticated ? (
        <button onClick={() => logout()}>logout</button>
      ) : (
        <button onClick={() => authenticate()}>login</button>
      )}
      <div>{wallet}</div>
    </>
  )
}

export default Homepage
