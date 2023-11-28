import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import Button from '../components/Button'
import Card, { CardFooter, CardPadding } from '../components/Card'
import Chip from '../components/Chip'
import deviceStore from '../stores/deviceStore'
import registerStore from '../stores/registerStore'
import walletStore from '../stores/walletStore'

function LinkButton() {
  const keys = deviceStore((s) => s.keys)
  const device = deviceStore((s) => s.device)
  const linkHalo = deviceStore((s) => s.linkHalo)
  const connected = walletStore((s) => s.address).length > 0
  const registered = deviceStore((s) => s.registered)

  if (!keys) {
    return (
      <Button fullWidth onClick={linkHalo}>
        ベリロンチップをスキャンしてね
      </Button>
    )
  } else if (device && registered) {
    return <Navigate to="/success" />

    return (
      <Button to={'/success'} fullWidth>
        View Halo
      </Button>
    )
  } else if (device && !connected && !registered) {
    return (
      <Button fullWidth disabled>
        Mint Halo
      </Button>
    )
  } else if (device && keys && !registered) {
    return (
      <Button to={'/register'} fullWidth>
        Mint Halo
      </Button>
    )
  } else {
    return (
      <Button fullWidth disabled>
        Mint Halo
      </Button>
    )
  }
}

export default function Home() {
  const init = deviceStore((s) => s.init)
  const keys = deviceStore((s) => s.keys)
  const loading = deviceStore((s) => s.loading)
  const connected = walletStore((s) => s.address).length > 0
  const registered = deviceStore((s) => s.registered)
  // const test = registerStore((s) => s.test)

  useEffect(() => {
    init()
  }, [])

  return (
    <Card loading={loading}>
      <CardPadding>
        <Chip detected={keys ? true : false} />

        {/* {connected && <button onClick={test}>Test</button>} */}

        {keys ? (
          <>
            <h1 className="text-3xl mt-6 font-expanded uppercase">
              ベリロンチップが
              <br />
              検出されました
            </h1>
            <p className="text-dark-gray text-sm mt-4 mb-4">
            このチップはまだ登録されていません。下のリンクをタップしてミントしてください。
            </p>
            <h3 className="font-normal mt-4 mb-1 text-light-gray text-xs">Device ID</h3>
            <p className="break-word font-bold text-smb">{keys?.primaryPublicKeyHash}</p>
          </>
        ) : (
          <>
            <h1 className="text-3xl mt-6 font-expanded uppercase">
              ベリロンチップが
              <br />
              検出されませんでした
            </h1>
            <p className="text-dark-gray text-sm mt-4 mb-4">
            下のボタンをタップし、スマートフォンのNFCアンテナにチップをかざし、ベリロンチップをスキャンしてね。
            </p>
          </>
        )}
      </CardPadding>
      <CardFooter>
        <CardPadding>
          {LinkButton()}
          {!connected && !registered && (
            <p className="text-center text-xs text-light-gray uppercase mt-4">ウォレットを接続してベリロンをミント</p>
          )}
        </CardPadding>
      </CardFooter>
    </Card>
  )
}
