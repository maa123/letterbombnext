import React, { useState } from 'react'
import { Input, makeStyles } from '@material-ui/core'
import { CheckPartAddressPos, ConvertStringToAddress } from '../../utils/MacAddress'

type Props = {
    pos?: number
    onChangeCallback?: (PartAddress: string, pos: number, valid?: boolean) => any
}

const useStyles = makeStyles(() => ({
    common: {
        width: "3rem",
        fontSize: "1.5rem",
        textAlign: "center",
        textTransform: "lowercase"
    }
}))

const InputPartMacAddress = React.forwardRef(({onChangeCallback = () => {}, pos = -1}: Props, ref) => {
    const classes = useStyles()
    const [value, change] = useState('')
    const [error, changeError] = useState(true)
    const onchangeinput = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        if(e.target.value.length > 2 || !/^[0-9A-Fa-f]*$/.test(e.target.value)) {
            return
        }
        if(e.target.value.length === 2) {
            const valid: boolean = CheckPartAddressPos(ConvertStringToAddress(e.target.value), pos)
            if(valid){
                changeError(false)
            }else{
                changeError(true)
            }
            onChangeCallback(e.target.value, pos, valid)
        }else{
            onChangeCallback(e.target.value, pos, false)
            changeError(true)
        }
        change(e.target.value)
        
    }
    return (
        <Input type="tel" placeholder="00" value={value} onChange={onchangeinput} inputProps={{className: classes.common}} error={error} ref={ref} />
    )
})

export default InputPartMacAddress