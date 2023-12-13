'use server'

const apiKey = 'MWQzMGE0NzAtMGY0OS00MWJkLTkzZDAtNGEzNWQzNmNiYWUwIDQ3ODFlMjg2LWU5ZDUtNDM1OC1iZTQxLTU0ZDc4YjcyYWQ1YQ=='
const apiTSEIndexUrl = 'https://api.fugle.tw/marketdata/v1.0/stock/historical/candles/IX0001'

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
      'X-API-KEY': apiKey,
      'Content-Type': 'application/json',
    },
  })

  const result = await response.json()
  return result
}