import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { ButtonMenu, ButtonMenuItem } from '@blackswap/uikit'
import {useTranslation} from "react-i18next";
import {  appName } from '../../config/app'


const StyledNav = styled.div`
  margin-bottom: 40px;
`

const Nav = ({ activeIndex = 0 }: { activeIndex?: number }) => {
  const { t } = useTranslation()

  return (
      <StyledNav>
        <ButtonMenu activeIndex={activeIndex} size="sm" variant="subtle">
          <ButtonMenuItem id="swap-nav-link" to="/swap" as={Link}>
            {t('card.nav.swap','Swap')}
          </ButtonMenuItem>
          <ButtonMenuItem id="pool-nav-link" to="/pool" as={Link}>
            {t('card.nav.liquidity','Liquidity')}

          </ButtonMenuItem>
          <ButtonMenuItem
              id="pool-nav-link"
              as="a"
              href={`https://www.binance.org/en/bridge?utm_source=${appName}`}
              target="_blank"
              rel="noreferrer noopener"
          >
            {t('card.nav.bridge','Bridge')}
          </ButtonMenuItem>
        </ButtonMenu>
      </StyledNav>
  )
}

export default Nav
