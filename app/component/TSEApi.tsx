'use server'

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

  const payload = {
    from: formatDate(lastYear),
    to: formatDate(today),
    fields: 'open,high,low,close,volume'
  }

  const response = await fetch(`${apiTSEIndexUrl}?${new URLSearchParams(payload)}`, {
    method: 'GET',
    headers: {
      'X-API-KEY': process.env.API_KEY as string,
      'Content-Type': 'application/json',
    },
  })

  const result = await response.json()
  return result
}