import React from 'react'
import Button from '../components/Button'
import Card, { CardFooter, CardPadding } from '../components/Card'
import Chip from '../components/Chip'
import walletStore from '../stores/walletStore'

export default function Home() {
  const connected = walletStore((s) => s.address).length > 0

  return (
    <Card>
      <CardPadding>
        <Chip />
        <h1 className="text-3xl mt-6 font-expanded uppercase">
          Halo
          <br />
          Detected
        </h1>
        <p className="text-dark-gray text-sm mt-4 mb-4">
          This device hasn’t been registered. Tap link below to link device.
        </p>
        <h3 className="font-normal mt-4 mb-1 text-light-gray text-xs">Primary public key</h3>
        <p className="break-word font-bold text-smb">0xb2E0F4dee26CcCf1f3A267Ad185f212Dd3e7a6b1</p>
      </CardPadding>
      <CardFooter>
        <CardPadding>
          <Button fullWidth disabled={!connected}>
            Link Halo
          </Button>

          <p className="text-center text-xs text-light-gray uppercase mt-4">Connect wallet to link Halo</p>
        </CardPadding>
      </CardFooter>
    </Card>
  )
}