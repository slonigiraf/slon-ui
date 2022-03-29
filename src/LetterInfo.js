// A component to visualize recommendation letter data for a worker
import { Grid, Button, Modal } from 'semantic-ui-react'
import React, { useState, useEffect } from 'react'
import SignLetterUseRight from './SignLetterUseRight'
import { getIPFSDataFromContentID } from './helpers.mjs'

export default function Main(props) {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [textHash, , , , , ,] = props.letter.split(",")
  const [text, setText] = useState(textHash)

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
      >{text}</Button>
      <Modal
        size={"tiny"}
        dimmer={"inverted"}
        onClose={() => setModalIsOpen(false)}
        onOpen={() => setModalIsOpen(true)}
        open={modalIsOpen}
      >
        <Modal.Header>Sign recommendation letter</Modal.Header>
        <Modal.Content>
          <SignLetterUseRight text={text} letter={props.letter} />
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
