'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import dayjs from 'dayjs'

import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.info.main,
    color: theme.palette.secondary.main,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}))

const apiKey = 'MWQzMGE0NzAtMGY0OS00MWJkLTkzZDAtNGEzNWQzNmNiYWUwIDQ3ODFlMjg2LWU5ZDUtNDM1OC1iZTQxLTU0ZDc4YjcyYWQ1YQ=='
const apiIntradayTickersUrl = 'https://api.fugle.tw/marketdata/v1.0/stock/intraday/tickers'
const apiIntradayQuoteUrl = 'https://api.fugle.tw/marketdata/v1.0/stock/intraday/quote'

const Page = () => {
  const [hydrated, setHydrated] = useState(false)
  const [lastUpdated, setLastUpdated] = useState<Date>()
  const [ticker, setTicker] = useState<any>([])
  const [quote, setQuote] = useState<any>([])

  const fetchTickers = async () => {
    try {
      const headers = {
        'X-API-KEY': apiKey,
      }
      const payload = {
        type: 'EQUITY'
      }
      const response = await axios.get(apiIntradayTickersUrl, {
        headers: headers,
        params: payload,
      })
      setTicker(response.data.data)
    } catch (error) {
      console.error('API 請求錯誤:', error)
    }
  }

  const fetchQuote = async (data: any) => {
    setQuote([])
    const rawQuoteData: any[] = []
    try {
      const headers = {
        'X-API-KEY': apiKey,
      }
      for (let i = 0; i < 10 && i < data.length; i++) {
        const item = data[i]
        const response = await axios.get(`${apiIntradayQuoteUrl}/${item.symbol}`, {
          headers: headers
        })
        rawQuoteData.push(response.data)
      }
      setQuote(rawQuoteData)
    } catch (error) {
      console.error('API 請求錯誤:', error)
    }
  }

  useEffect(() => {
    fetchTickers()
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (hydrated) {
      fetchQuote(ticker)
      setLastUpdated(new Date())
    }
  }, [hydrated, ticker])

  if (!hydrated) return null

  return (
    <>
      <div className="my-4 flex justify-between">
        <h1 className="text-lg">台股即時報價</h1>
        <div className="flex items-center text-sm">
          <button
            className="px-2 py-1 bg-blue-500 text-white rounded-md"
            onClick={() => fetchTickers()}
          >
            重新整理
          </button>
          <div className="ml-2">最後更新時間：{dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss')}</div>
        </div>
      </div>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a quote table">
          <TableHead>
            <TableRow>
              <StyledTableCell>股票代碼</StyledTableCell>
              <StyledTableCell>股票名稱</StyledTableCell>
              <StyledTableCell align="right">當前價</StyledTableCell>
              <StyledTableCell align="right">昨日收盤價</StyledTableCell>
              <StyledTableCell align="right">開盤價</StyledTableCell>
              <StyledTableCell align="right">最高價</StyledTableCell>
              <StyledTableCell align="right">最低價</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {quote.map((row: any) => (
              <TableRow
                key={row.symbol}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">{row.symbol}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell align="right">{row.closePrice}</TableCell>
                <TableCell align="right">{row.previousClose}</TableCell>
                <TableCell align="right">{row.openPrice}</TableCell>
                <TableCell align="right">{row.highPrice}</TableCell>
                <TableCell align="right">{row.lowPrice}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default Page
