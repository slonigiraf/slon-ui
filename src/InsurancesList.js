// A component to visualize recommendation letter list to an employer
import { List } from 'semantic-ui-react'
import InsuranceInfo from './InsuranceInfo'
import React from 'react'

export default function Main(props) {
  return (
    <List divided relaxed>
    {props.insurances.map((insurance, index) => (
        <List.Item><List.Content><List.Description as='a'><InsuranceInfo key={index} insurance={insurance} ipfs={props.ipfs} /></List.Description></List.Content></List.Item>
    ))}
    </List>)
}
