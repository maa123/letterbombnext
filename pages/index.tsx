import { Container, Select, Button, Tooltip, makeStyles, Backdrop, CircularProgress, Typography, Box, Grid } from '@material-ui/core'
import React, { useState } from 'react'
import InputMacAddress from '../components/Input/InputMacAddress'
import Layout from '../components/Layout'
import { MacAddress } from '../interfaces'
import { BlobDownload } from '../utils/File'
import LetterBomb from '../utils/LetterBomb'

const templates = ["J", "U", "E", "K"]
const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  root: {
    textAlign: "center"
  }
}))
const IndexPage = () => {
  const classes = useStyles()
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
  const [progressText, updateProgressText] = useState('生成の準備をしています...')
  const [open, setOpen] = React.useState(false)
  const [errMessage, updateErrMessage] = React.useState("")
  const handleSelect = (e: React.ChangeEvent<{ value: unknown }>) => {
    e.preventDefault()
    updateSelectVal(`${e.target.value}`)
  }
  const generateLetter = async () => {
    const blob = await LetterBomb(macAddress, selectVal, updateProgressText)
    setOpen(false)
        if(blob != null){
          BlobDownload(blob)
        }else{
          updateErrMessage("エラーが発生しました")
        }
  }
  const handleGenerateButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setOpen(true)
    updateErrMessage("")
    generateLetter()
  }
  return (
  <Layout title="Letterbomb.js | Next.js">
    <Container maxWidth="lg">
    <Grid container justify="center" className={classes.root}>
    <Grid item>
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
    <Typography color="error" variant="h4">
      { errMessage }
    </Typography>
    </Grid>
    </Grid>
    </Container>
    <Backdrop className={classes.backdrop} open={open}>
      <Box>
        <Box textAlign="center">
        <CircularProgress color="inherit" />
        </Box>
        <Box m="auto" ml="1em">
        <p>{ progressText }</p>
        </Box>
        </Box>
    </Backdrop>
  </Layout>
)}

export default IndexPage
