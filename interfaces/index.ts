// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import { User } from 'path/to/interfaces';

export type User = {
  id: number
  name: string
}

//入力時空の場合-1を利用
export type MacAddress =  [number, number, number, number, number, number]

export type HalfMacAddress = [number, number, number]

export type MacAddressCheckList = HalfMacAddress[]