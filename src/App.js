// Example UI created for https://github.com/w3f/Grants-Program/blob/master/applications/slonigiraf.md
// Basic skelleton of App was copied from https://github.com/substrate-developer-hub/substrate-front-end-template
import React, { createRef, useState, useEffect } from 'react'
import {
  Container,
  Dimmer,
  Loader,
  Grid,
  Sticky,
  Message,
  Tab,
} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

import { SubstrateContextProvider, useSubstrateState } from './substrate-lib'
import { DeveloperConsole } from './substrate-lib/components'

import AccountSelector from './AccountSelector'
import Balances from './Balances'
import Transfer from './Transfer'
import CreateLetter from './CreateLetter'
import WorkerSaveLetter from './WorkerSaveLetter'
import EmployerSaveLetter from './EmployerSaveLetter'
import { create } from 'ipfs-core'

function Main() {
  const { apiState, apiError, keyringState } = useSubstrateState()
  const [ipfs, setIpfs] = useState(null)
  const [tabIndex, setTabIndex] = useState(0)
  // Initilize an IPFS instance
  useEffect(() => {
    async function fetchData() {
      let node = ipfs
      if (!ipfs) {
        console.log('Creating IPFS node...')
        node = await create({
          repo: String(Math.random() + Date.now()),
          init: { alogorithm: 'ed25519' }
        })
        setIpfs(node)
      }
    }
    fetchData()
  }, [ipfs])

  const loader = text => (
    <Dimmer active>
      <Loader size="small">{text}</Loader>
    </Dimmer>
  )

  const message = errObj => (
    <Grid centered columns={2} padded>
      <Grid.Column>
        <Message
          negative
          compact
          floating
          header="Error Connecting to Substrate"
          content={`Connection to websocket '${errObj.target.url}' failed.`}
        />
      </Grid.Column>
    </Grid>
  )

  if (apiState === 'ERROR') return message(apiError)
  else if (apiState !== 'READY') return loader('Connecting to Substrate')

  if (keyringState !== 'READY') {
    return loader(
      "Loading accounts (please review any extension's authorization)"
    )
  }

  const contextRef = createRef()

  // Selection of user role
  const panes = [
    {
      menuItem: 'Referee',
      render: () => <Tab.Pane><CreateLetter ipfs={ipfs} /></Tab.Pane>,
    },
    {
      menuItem: 'Worker',
      render: () => <Tab.Pane><WorkerSaveLetter ipfs={ipfs} /></Tab.Pane>,
    },
    {
      menuItem: 'Employer',
      render: () => <Tab.Pane><EmployerSaveLetter ipfs={ipfs} /></Tab.Pane>,
    },
  ]
  const handleChange = (e, data) => setTabIndex(data.activeIndex)
  const RoleSelector = () => (
    <Tab panes={panes} defaultActiveIndex={tabIndex} onTabChange={handleChange}/>
  )

  return (
    <div ref={contextRef}>
      <Sticky context={contextRef}>
        <AccountSelector />
      </Sticky>
      <Container>
        <Grid stackable columns="equal">
          <Grid.Row><h1>Recommendation letters</h1></Grid.Row>
          <Grid.Row>
            <RoleSelector />
          </Grid.Row>
          <Grid.Row stretched>
            <Balances />
          </Grid.Row>
          <Grid.Row>
            <Transfer />
          </Grid.Row>
        </Grid>
      </Container>
      <DeveloperConsole />
    </div>
  )
}

export default function App() {
  return (
    <SubstrateContextProvider>
      <Main />
    </SubstrateContextProvider>
  )
}
