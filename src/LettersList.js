// A component to visualize recommendation letter list for a worker
import { List } from 'semantic-ui-react'
import LetterInfo from './LetterInfo'
import React from 'react'

export default function Main(props) {
  return (
    <List divided relaxed>
      {props.letters.map((letter, index) => (
        <List.Item><List.Content><List.Description as='a'><LetterInfo key={index} letter={letter} ipfs={props.ipfs} /></List.Description></List.Content></List.Item>
      ))}
    </List>)
}
