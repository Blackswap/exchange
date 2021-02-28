import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Input, Text } from '@blackswap/uikit'
import { useUserDeadline } from 'state/user/hooks'
import {useTranslation} from "react-i18next";
import QuestionHelper from '../QuestionHelper'

const StyledTransactionDeadlineSetting = styled.div`
  margin-bottom: 16px;
`

const Label = styled.div`
  align-items: center;
  display: flex;
  margin-bottom: 8px;
`

const Field = styled.div`
  align-items: center;
  display: inline-flex;

  & > ${Input} {
    max-width: 100px;
  }

  & > ${Text} {
    font-size: 14px;
    margin-left: 8px;
  }
`

const TransactionDeadlineSetting = () => {
  const [deadline, setDeadline] = useUserDeadline()
  const [value, setValue] = useState(deadline / 60) // deadline in minutes
  const { t } = useTranslation()
  const [error, setError] = useState<string | null>()

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { value: inputValue } = evt.target
    setValue(parseInt(inputValue, 10))
  }

  // Updates local storage if value is valid
  useEffect(() => {
    try {
      const rawValue = value * 60
      if (!Number.isNaN(rawValue) && rawValue > 0) {
        setDeadline(rawValue)
        setError(null)
      } else {
        setError(t('transaction.enter_valid_deadline', 'Enter a valid deadline.'))
      }
    } catch {
      setError(t('transaction.enter_valid_deadline', 'Enter a valid deadline.'))
    }
  }, [value, setError, setDeadline, t])

  return (
    <StyledTransactionDeadlineSetting>
      <Label>
        <Text style={{ fontWeight: 600 }}>
          { t('transaction.deadline', 'Transaction deadline') }
        </Text>
        <QuestionHelper text={ t('transaction.question_helper', 'Your transaction will revert if it is pending for more than this long.')} />
      </Label>
      <Field>
        <Input type="number" step="1" min="1" value={value} onChange={handleChange} />
        <Text>{t('minutes', 'Minutes')}</Text>
      </Field>
      {error && (
        <Text mt="8px" color="failure">
          {error}
        </Text>
      )}
    </StyledTransactionDeadlineSetting>
  )
}

export default TransactionDeadlineSetting
