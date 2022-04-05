// A component where a worker can enable an employer to penalize a guarantee
import React, { useState } from 'react'
import { Form, Input, Grid, Button, List, Label } from 'semantic-ui-react'
import { useSubstrateState } from './substrate-lib'
import QRCode from 'qrcode.react'
import { web3FromSource } from '@polkadot/extension-dapp'
import { sign, getDataToSignByWorker } from './helpers.mjs'
import { hexToU8a, u8aToHex } from '@polkadot/util'


export default function Main(props) {
  const [textHash, letterId, refereeAddress,
    workerAddress, amount, refereeSignOverPrivateData, refereeSignOverReceipt] = props.letter.split(",")
  const letterIdValue = parseInt(letterId, 10)
  const amountValue = parseInt(amount, 10)
  const { currentAccount } = useSubstrateState()
  const [status, setStatus] = useState(null)
  const [formState, setFormState] = useState({ letterInfo: '', employerPublicKeyHex: '' })

  const onChange = (_, data) =>
    setFormState(prev => ({ ...prev, [data.state]: data.value }))

  const { letterInfo, employerPublicKeyHex: employerPublicKeyHex } = formState

  const { keyring } = useSubstrateState()
  const accounts = keyring.getPairs()

  const availableAccounts = []
  accounts.map(account => {
    return availableAccounts.push({
      key: account.meta.name,
      text: account.meta.name,
      value: account.address,
    })
  })

  const getLetterInfo = async () => {
    const [worker,] = await getFromAcct()

    let letterInsurance = getDataToSignByWorker(letterIdValue, hexToU8a(refereeAddress),
      hexToU8a(workerAddress), amountValue, hexToU8a(refereeSignOverReceipt), hexToU8a(employerPublicKeyHex))

    const workerSignOverInsurance = u8aToHex(sign(worker, letterInsurance))
    //
    const result = [textHash, letterIdValue, refereeAddress,
      workerAddress, amountValue, refereeSignOverPrivateData, refereeSignOverReceipt, workerSignOverInsurance]
    return result.join(",")
  }

  const getFromAcct = async () => {
    const {
      address,
      meta: { source, isInjected },
    } = currentAccount

    if (!isInjected) {
      return [currentAccount]
    }

    // currentAccount is injected from polkadot-JS extension, need to return the addr and signer object.
    // ref: https://polkadot.js.org/docs/extension/cookbook#sign-and-send-a-transaction
    const injector = await web3FromSource(source)
    return [address, { signer: injector.signer }]
  }

  const showQR = async () => {
    const data = await getLetterInfo()
    setStatus(true)
    setFormState({ ...formState, letterInfo: data })
  }

  const qrPart = status ? <Form.Field>
    <QRCode value={letterInfo} size="160" />
  </Form.Field> : ""




  return (
    <Grid.Column width={8}>
      <Form>
        <List divided selection>
          <List.Item>
            <Label horizontal>Id</Label>
            {textHash}
          </List.Item>
          <List.Item>
            <Label horizontal>Text</Label>
            {props.text}
          </List.Item>
        </List>
        <Form.Field>
          <Input
            fluid
            label="To employer"
            type="text"
            placeholder="public key"
            value={employerPublicKeyHex}
            state="employerPublicKeyHex"
            onChange={onChange}
          />
        </Form.Field>
        <Form.Field style={{ textAlign: 'center' }}>
          <Button
            setStatus={setStatus}
            onClick={() => {
              showQR()
            }}
          >Sign</Button>
        </Form.Field>

        {qrPart}

        <div style={{ overflowWrap: 'break-word' }}>{status}</div>
      </Form>
    </Grid.Column>
  )
}
