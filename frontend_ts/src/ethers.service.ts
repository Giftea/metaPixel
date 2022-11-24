import { Wallet, ethers, utils } from 'ethers'

import { TypedDataDomain } from '@ethersproject/abstract-signer'
import { omit } from './helpers'

export const ethersProvider = new ethers.providers.JsonRpcProvider(
  process.env.MUMBAI_RPC_URL
)

export const getSigner = () => {
  return new Wallet(process.env.PK as string, ethersProvider)
}

export const getAddressFromSigner = () => {
  return getSigner().address
}

export const signedTypeData = (
  domain: TypedDataDomain,
  types: Record<string, any>,
  value: Record<string, any>
) => {
  const signer = getSigner()
  // remove the __typedname from the signature!
  return signer._signTypedData(
    omit(domain, '__typename'),
    omit(types, '__typename'),
    omit(value, '__typename')
  )
}

export const splitSignature = (signature: string) => {
  return utils.splitSignature(signature)
}

export const sendTx = (
  transaction: ethers.utils.Deferrable<ethers.providers.TransactionRequest>
) => {
  const signer = getSigner()
  return signer.sendTransaction(transaction)
}

export const signText = (text: string) => {
  return getSigner().signMessage(text)
}
