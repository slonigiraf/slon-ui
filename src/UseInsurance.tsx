// A component to send a reimbursement transaction to a blockchain to penalize a gurantee for a wrong recommendation letter
import React, { useState, useEffect } from 'react'
import { Form, Grid, List, Label } from 'semantic-ui-react'
import { useSubstrateState } from './substrate-lib'
import { web3FromSource } from '@polkadot/extension-dapp'
import { TxButton } from './substrate-lib/components'
import { u8aToHex } from '@polkadot/util'

export default function Main(props) {
  const [cid, letterId, refereeHex,
    workerHex, amount, , refereeSignatureOverReceiptHex, workerSignatureHex] = props.insurance.split(",")

  const { currentAccount } = useSubstrateState()
  const { keyring } = useSubstrateState()

  const [status, setStatus] = useState(null)
  const [employerHex, setEmployerHex] = useState('')

  const accounts = keyring.getPairs()

  const availableAccounts = []
  accounts.map(account => {
    return availableAccounts.push({
      key: account.meta.name,
      text: account.meta.name,
      value: account.address,
    })
  })

  const markUsedInsurance = cid => {
    const updatedSet = localStorage.used ? new Set(JSON.parse(localStorage.used)) : new Set()
    updatedSet.add(cid)
    localStorage.used = JSON.stringify(Array.from(updatedSet))
  }

  useEffect(() => {
    async function fetchData() {
      const [employer,] = await getFromAcct()
      setEmployerHex(u8aToHex(employer.publicKey))
    }
    fetchData()
  }, [])

  const processTransactionResult = result => {
    markUsedInsurance(cid)
    setStatus(result)
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

  const txButton = <Form>
    <Form.Field style={{ textAlign: 'center' }}>
      <TxButton
        label="Get a reimbursement"
        type="SIGNED-TX"
        setStatus={processTransactionResult}
        attrs={{
          palletRpc: 'letters',
          callable: 'reimburse',
          inputParams: [letterId,
            refereeHex,
            workerHex,
            employerHex,
            amount,
            refereeSignatureOverReceiptHex,
            workerSignatureHex],
          paramFields: [true, true, true, true, true, true, true],
        }}
      />
    </Form.Field>
    <div style={{ overflowWrap: 'break-word' }}>{status}</div>
  </Form>

  const usedInfo = <List.Item>
    <Label horizontal>Was invalidated</Label>
  </List.Item>

  return (
    <Grid.Column width={8}>
      <List divided selection>
        {props.wasUsed && usedInfo}
        <List.Item>
          <Label horizontal>Text</Label>
          {props.text}
        </List.Item>
        <List.Item>
          <Label as='a' tag>{workerHex}</Label>
        </List.Item>
      </List>
      {!props.wasUsed && txButton}
    </Grid.Column>
  )
}
