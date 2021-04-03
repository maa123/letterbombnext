import { MacAddress, MacAddressCheckList } from '../interfaces'

export const CheckList: MacAddressCheckList = [[0,9,191],[0,22,86],[0,23,171],[0,25,29],[0,25,253],[0,26,233],[0,27,122],[0,27,234],[0,28,190],[0,29,188],[0,30,53],[0,30,169],[0,31,50],[0,31,197],[0,33,71],[0,33,189],[0,34,76],[0,34,170],[0,34,215],[0,35,49],[0,35,204],[0,36,30],[0,36,68],[0,36,243],[0,37,160],[0,38,89],[0,39,9],[4,3,214],[24,42,123],[44,16,193],[52,175,44],[64,210,138],[64,244,7],[88,47,64],[88,189,163],[92,82,30],[96,107,255],[100,181,198],[120,162,160],[124,187,138],[140,86,197],[140,205,232],[148,88,203],[152,182,233],[156,230,53],[164,56,204],[164,92,39],[164,192,225],[184,120,38],[184,138,236],[184,174,110],[204,158,0],[204,251,101],[216,107,247],[220,104,235],[224,12,127],[224,231,81],[232,78,206],[236,196,13]]

export const ConvertStringToAddress = (paddress: string): number => {
    if(paddress === '' || paddress.length !== 2){
        return -1;
    }
    return parseInt(paddress, 16)
}

const CheckPartAddress = (paddress: number): boolean => {
    return (paddress >= 0 && paddress <256)
}

export const CheckPartAddressPos = (paddress: number, pos: number = 3): boolean => {
    if(pos > 2){
        return CheckPartAddress(paddress)
    }
    return CheckList.some(v => v[pos] === paddress)
}

export const CheckAddress = (macAddress: MacAddress): boolean => {
    if(!macAddress.every(CheckPartAddress)){
        return false
    }
    return CheckList.some(v => v.every((vl, i) => vl === macAddress[i]))
}