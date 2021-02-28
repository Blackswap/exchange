const priceContracts: {
    baseTokenAdress: string, busdAddress: string, lpAddress: string } = {
    baseTokenAdress: process.env.REACT_APP_BASE_TOKEN_ADRESS ?? '',
    busdAddress: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
    lpAddress: process.env.REACT_APP_BASE_LP_ADRESS ?? ''
}

export default priceContracts
