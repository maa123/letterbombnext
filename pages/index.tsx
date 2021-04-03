import { Container, Select, Button, Tooltip } from '@material-ui/core'
import React, { useState } from 'react'
import InputMacAddress from '../components/Input/InputMacAddress'
import Layout from '../components/Layout'
import { MacAddress } from '../interfaces'

const templates = ["J", "U", "E", "K"]

const IndexPage = () => {
  let macAddress: MacAddress = [-1, -1, -1, -1, -1, -1]
  const [addressValid, updateAddressValid] = useState(false)
  const updateMacAddress = (mac: MacAddress, valid: boolean) => {
    if(valid){
      macAddress = mac
      updateButtonTooltip('')
    }else{
      updateButtonTooltip('正しいMacアドレスを入力してください')
    }
    updateAddressValid(valid)
  }
  const [buttonTooltip, updateButtonTooltip] = useState('正しいMacアドレスを入力してください')
  const [selectVal, updateSelectVal] = useState(templates[0])
  const handleSelect = (e: React.ChangeEvent<{ value: unknown }>) => {
    e.preventDefault()
    updateSelectVal(`${e.target.value}`)
  }
  const handleGenerateButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
  }
  return (
  <Layout title="Letterbomb.js | Next.js">
    <Container maxWidth="lg">
    <h1>LetterBomb Offline</h1>
    <p>LetterBombをブラウザ内で生成します</p>
    <h4>Mac Address</h4>
    <p>(Wii本体設定→インターネット→本体情報で確認可能です)</p>
    <p>
      <InputMacAddress enterMacAddress={updateMacAddress} />
    </p>
    <p>バージョン</p>
    <p>
      <Select native onChange={handleSelect} value={selectVal}>
        {templates.map(reg => (
          <option key={`${reg}`} value={reg}>{`4.3${reg}`}</option>
        ))}
      </Select>
    </p>
    <p>
      <Tooltip title={buttonTooltip} placement="top">
        <span>
          <Button variant="contained" color="primary" onClick={handleGenerateButton} disabled={!addressValid}>LetterBombを生成</Button>
        </span>
      </Tooltip>
    </p>
    </Container>
  </Layout>
)}

export default IndexPage
