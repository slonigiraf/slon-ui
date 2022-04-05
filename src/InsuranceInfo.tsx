// A component to visualize recommendation letter info to an employer
import { Grid, Button, Modal } from 'semantic-ui-react'
import React, { useState, useEffect } from 'react'
import UseInsurance from './UseInsurance'
import { getIPFSDataFromContentID } from './helpers.mjs'

export default function Main(props) {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [textHash, , , , , , ,] = props.insurance.split(",")
  const updatedSet = localStorage.used ? new Set(JSON.parse(localStorage.used)) : new Set()

  const [text, setText] = useState(textHash)

  const wasUsed = updatedSet.has(textHash) ? "Canceled: " : ""

  useEffect(() => {
    async function fetchData() {
      if (props.ipfs !==null && text === textHash) {
        try {
          const content = await getIPFSDataFromContentID(props.ipfs, textHash)
          setText(content)
        }
        catch (e) {
          setText(textHash + " (loading...)")
          console.log(e)
        }
      }
    }
    fetchData()
  }, [props.ipfs, textHash, text])

  return (
    <Grid.Row>
      <Button
        basic
        compact
        size="mini"
        color="blue"
        onClick={() => setModalIsOpen(true)}
      >{wasUsed + text}</Button>
      <Modal
        size={"tiny"}
        dimmer={"inverted"}
        onClose={() => setModalIsOpen(false)}
        onOpen={() => setModalIsOpen(true)}
        open={modalIsOpen}
      >
        <Modal.Header>Penalize referee</Modal.Header>
        <Modal.Content>
          <UseInsurance text={text} insurance={props.insurance} wasUsed={updatedSet.has(textHash)}/>
        </Modal.Content>
        <Modal.Actions>
          <Button color='black' onClick={() => setModalIsOpen(false)}>
            Close
          </Button>
        </Modal.Actions>
      </Modal>
    </Grid.Row>

  )
}
