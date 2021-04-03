import * as JSZip from 'jszip'
import { MacAddress } from '../interfaces';
import {} from './Binary'

const sha1HMAC = async(key: ArrayBuffer, msg: ArrayBuffer): Promise<ArrayBuffer> => {
    const k = await window.crypto.subtle.importKey('raw', new Uint8Array(key), {
        name: 'HMAC',
        hash: {
            name: 'SHA-1'
        }
    }, false, ['sign']);
    return await window.crypto.subtle.sign('HMAC', k, new Uint8Array(msg))
}

const LetterBomb = async (macAddress: MacAddress, templateCode: string = "J", progressCallback:(msg: string)=>void = () => {}): Promise<Blob|null> => {
    try{
        const dy = new Date(Number(new Date()) - 86400000);
        const ts = Math.floor((dy.getTime() - (new Date("2000-01-01T00:00:00+0000")).getTime()) / 1000);
        progressCallback("必要なファイルを取得しています...")
        const bin: ArrayBuffer = await (await fetch(`/template${templateCode}.bin`)).arrayBuffer()
        const hackmii: ArrayBuffer = await (await fetch(`/hackmii.zip`)).arrayBuffer()
        const binv = new DataView(bin)
        progressCallback("メインファイルを生成しています...")
        const key = await window.crypto.subtle.digest('SHA-1', macAddress.concat([0x75, 0x79, 0x79]).toArrayBuffer())
        binv.writeArrayBuffer(key.slice(0, 8), 0x08, 0x10)
        binv.singleFill(0, 0xb0, 0xc4)
        binv.writeArray(ts.packArray(), 0x7c, 0x80)
        binv.writeArrayBuffer(ts.zeroFill(10).toArrayBuffer(), 0x80, 0x8a)
        progressCallback("署名を生成しています...")
        const sig = await sha1HMAC(key.slice(8), binv.buffer)
        binv.writeArrayBuffer(sig, 0xb0, 0xc4)
        const date = {
            year: dy.getUTCFullYear(),
            month: dy.getUTCMonth().zeroFill(2),
            date: dy.getUTCDate().zeroFill(2),
            hour: dy.getUTCHours().zeroFill(2),
            minute: dy.getUTCMinutes().zeroFill(2)
        };
        progressCallback('ZIPファイルを生成しています...')
        const zip = await JSZip.loadAsync(hackmii)
        zip.file(`private/wii/title/HAEA/${key.slice(0, 4).to16String().toUpperCase()}/${key.slice(4, 8).to16String().toUpperCase()}/${date.year}/${date.month}/${date.date}/${date.hour}/${date.minute}/HABA_#1/txt/${`00000000${ts.toString(16)}`.slice(-8).toUpperCase()}.000`, binv.buffer);
        const blob: Blob = await zip.generateAsync<'blob'>({
            type: 'blob'
        });
        return blob
    }catch(err){
        console.error(err)
        return null
    }
}

export default LetterBomb