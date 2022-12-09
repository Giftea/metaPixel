import { ethers } from 'ethers'
import { getSigner } from './ethers.service'

// lens contract info can all be found on the deployed
// contract address on polygon.
export const lensHub = new ethers.Contract(
  process.env.LENS_HUB_CONTRACT as string,
  process.env.LENS_HUB_ABI as string,
  getSigner()
)

export const lensPeriphery = new ethers.Contract(
  process.env.LENS_PERIPHERY_CONTRACT as string,
  process.env.LENS_PERIPHERY_ABI as string,
  getSigner()
)
