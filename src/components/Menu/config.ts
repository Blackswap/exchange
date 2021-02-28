import { MenuEntry } from '@blackswap/uikit'

const config: MenuEntry[] = [
  {
    label: 'Home',
    icon: 'HomeIcon',
    href: `${process.env.REACT_APP_APP_URL}`,
  },
  {
    label: 'Trade',
    icon: 'TradeIcon',
    initialOpenState: true,
    items: [
      {
        label: 'Exchange',
        href: '/swap',
      },
      {
        label: 'Liquidity',
        href: '/pool',
      },
    ],
  },
  {
    label: 'Farms',
    icon: 'FarmIcon',
    href: `${process.env.REACT_APP_APP_URL}/farms`,
  },
  {
    label: 'Pools',
    icon: 'PoolIcon',
    href: `${process.env.REACT_APP_APP_URL}/pool`,
  }
]

export default config
