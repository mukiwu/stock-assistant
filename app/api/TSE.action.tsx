'use server'
import axios from 'axios'

const apiTSEIndexUrl = 'https://api.fugle.tw/marketdata/v1.0/stock/historical/candles/IX0001'
// https://www.twse.com.tw/exchangeReport/MI_INDEX?response=json&date=20211001&type=IX0001

const formatDate = (date: Date) => {
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')

  return `${year}-${month}-${day}`
}

export async function fetchTSEIndex() {
  const today = new Date()
  const lastYear = new Date()
  lastYear.setFullYear(lastYear.getFullYear() - 1)
  lastYear.setDate(lastYear.getDate() + 1)

  try {
    const headers = {
      'X-API-KEY': process.env.API_KEY as string,
      'Content-Type': 'application/json'
    }
    const payload = {
      from: formatDate(lastYear),
      to: formatDate(today),
      fields: 'open,high,low,close,volume'
    }
    const response = await axios.get(apiTSEIndexUrl, {
      headers: headers,
      params: payload,
    })
    return response.data.data
  } catch (error) {
    console.error('API 請求錯誤:', error)
  }
}