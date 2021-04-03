import React, { useState } from 'react'
import { Box, Container, makeStyles, TextField } from '@material-ui/core'
import { MacAddress } from '../../interfaces'
import { CheckAddress, ConvertStringToAddress } from '../../utils/MacAddress'
import InputPartMacAddress from './InputPartMacAddress'

type Props = {
    enterValidMacAddress?: (macAddress: MacAddress) => void
}

const useStyles = makeStyles(theme => ({
    root: {
        padding: '1rem',
        display: 'flex',
        alignItems: 'center'
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    check: {
        color: "#4caf50"
    }
}))

const InputMacAddress = ({enterValidMacAddress = () => {}}: Props) => {
    const inputMacAddress: MacAddress = [-1, -1, -1, -1, -1, -1]
    const classes = useStyles()
    const [checked, setChecked] = useState(false)
    const refs: React.RefObject<HTMLElement>[] = []
    for(let i = 0; i < 6; i++) {
        refs.push(React.createRef<HTMLElement>())
    }
    const onChangeInput = (PartAddress: string, pos: number, valid: boolean = false) => {
        if(valid){
            inputMacAddress[pos] = ConvertStringToAddress(PartAddress)
            if(CheckAddress(inputMacAddress)){
                setChecked(true)
                enterValidMacAddress(inputMacAddress)
            }else{
                if(pos < 5){
                    (refs[pos+1].current?.children[0] as HTMLInputElement).focus()
                }
            }
        }else{
            setChecked(false)
        }
    }
    
    return (
        <Container className={classes.root}>
                <Box>
                    <InputPartMacAddress pos={0} ref={refs[0]} onChangeCallback={onChangeInput} />-
                    <InputPartMacAddress pos={1} ref={refs[1]} onChangeCallback={onChangeInput} />-
                    <InputPartMacAddress pos={2} ref={refs[2]} onChangeCallback={onChangeInput} />-
                    <InputPartMacAddress pos={3} ref={refs[3]} onChangeCallback={onChangeInput} />-
                    <InputPartMacAddress pos={4} ref={refs[4]} onChangeCallback={onChangeInput} />-
                    <InputPartMacAddress pos={5} ref={refs[5]} onChangeCallback={onChangeInput} />
                    {checked && <span className={classes.check}>✔</span>}
                </Box>
        </Container>
    )
}

export default InputMacAddress