import { useEffect } from 'react'
import { NextSeo } from 'next-seo'
import { useMoralis } from 'react-moralis'
import { useSetRecoilState } from 'recoil'
import { walletAtom } from 'recoil/atoms'
import { defaultWallet } from '../../recoil/atoms/wallet'

const description =
  'MekaMiners starts as a play-to-earn strategic PVP/PVE blockchain passive farm game with NFT Robot characters, body parts, and item ownership. Merging the inspiration of games such PvU and Farmville with Tribal Wars and Lords Mobile we expect to build an amazing gameplay with very short time investment needs and good profitability.'
const title = 'MekaMiners'

interface LayoutProps {
  children: JSX.Element
}

export const Layout = ({ children }: LayoutProps) => {
  const { web3, user } = useMoralis()
  const setWalletAddress = useSetRecoilState(walletAtom)

  useEffect(() => {
    setWalletAddress(
      web3.givenProvider?.selectedAddress || user?.get('ethAddress') || defaultWallet
    )
  }, [web3, setWalletAddress, user])

  return (
    <>
      <NextSeo
        title={title}
        description={description}
        canonical="https://app.mekaminers.com"
        openGraph={{
          type: 'website',
          locale: 'en-us',
          url: 'https://app.mekaminers.com',
          title,
          description
        }}
        nofollow
        twitter={{
          site: '@MekaMiners',
          cardType: 'summary_large_image'
        }}
      />
      {children}
    </>
  )
}
