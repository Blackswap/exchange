import { useEffect, useState } from 'react'
import BigNumber from 'bignumber'
import { useMulticallContract } from './useContract'
import ERC20_INTERFACE from '../constants/abis/erc20'
import priceContracts from '../constants/tokenPriceContracts'

type ApiResponse = {
  prices: {
    [key: string]: string
  }
  update_at: string
}

/**
 * Due to Cors the api was forked and a proxy was created
 * @see https://github.com/pancakeswap/gatsby-pancake-api/commit/e811b67a43ccc41edd4a0fa1ee704b2f510aa0ba
 */
const api = 'https://api.pancakeswap.com/api/v1/price'

const useGetPriceData = () => {
  const [data, setData] = useState<number>(0)

  const multicallContract = useMulticallContract();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (multicallContract) {
          const { baseTokenAdress, busdAddress, lpAddress } = priceContracts;

          const calls = [
            [baseTokenAdress, ERC20_INTERFACE.encodeFunctionData("balanceOf", [lpAddress])],
            [busdAddress, ERC20_INTERFACE.encodeFunctionData("balanceOf", [lpAddress])],
          ];

          const [resultsBlockNumber, result] = await multicallContract.aggregate(calls);
          const [tokenAmount, busdAmount] = result.map(r => ERC20_INTERFACE.decodeFunctionResult("balanceOf", r));
          const token = new BigNumber(tokenAmount);
          const busd = new BigNumber(busdAmount);
          const tokenPrice = busd.div(token).toNumber();

          setData(tokenPrice)
        }
      } catch (error) {
        console.error('Unable to fetch price data:', error)
      }
    }

    fetchData()
  }, [multicallContract])

  return data
}

export default useGetPriceData
