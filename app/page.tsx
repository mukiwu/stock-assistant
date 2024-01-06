'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import dayjs from 'dayjs'

import theme from './global.theme.config'
import Container from '@mui/material/Container'
import { DataGrid, GridToolbar, GridCellParams, GridColDef, gridPageCountSelector, GridPagination, useGridApiContext, useGridSelector } from '@mui/x-data-grid'
import LinearProgress from '@mui/material/LinearProgress'
import { TablePaginationProps } from '@mui/material/TablePagination'
import MuiPagination from '@mui/material/Pagination'
import TSE from './component/TSE'

const getCellClassName = (params: GridCellParams) => {
  return `${Number(params.value) > 0 ? 'text-primary font-bold' : 'text-success font-bold relative -left-[2px]'}`
}

const columns: GridColDef[] = [
  { field: 'symbol', headerName: '股票代碼', width: 100 },
  { field: 'name', headerName: '股票名稱', width: 150 },
  {
    field: 'closePrice', headerName: '當前價', width: 120, headerAlign: 'center', align: 'center',
    // cellClassName: (params: GridCellParams) => {
    //   return `${Number(params.value) > 0 ? 'text-primary font-bold' : 'text-success font-bold'}`
    // }
  },
  { field: 'openPrice', headerName: '開盤價', width: 120, headerAlign: 'center', align: 'center', },
  { field: 'highPrice', headerName: '最高價', width: 120, headerAlign: 'center', align: 'center', },
  { field: 'lowPrice', headerName: '最低價', width: 120, headerAlign: 'center', align: 'center', },
  {
    field: 'change', headerName: '今日漲跌', width: 120, headerAlign: 'center', align: 'center',
    cellClassName: (params: GridCellParams) => getCellClassName(params),
    valueFormatter: (params) => {
      const valueFormatted = Number(params.value).toFixed(2)
      return `${valueFormatted}`
    }
  },
  {
    field: 'changePercent', headerName: '今日漲跌幅', width: 120, headerAlign: 'center', align: 'center',
    cellClassName: (params: GridCellParams) => getCellClassName(params),
    valueFormatter: (params) => {
      const valueFormatted = Number(params.value).toFixed(2)
      return `${valueFormatted}%`
    }
  },
]

const apiIntradayQuoteUrl = 'https://api.fugle.tw/marketdata/v1.0/stock/intraday/quote'
const apiSnapshotQuotesUrl = 'https://api.fugle.tw/marketdata/v1.0/stock/snapshot/quotes'

const Page = () => {
  const [hydrated, setHydrated] = useState(false)
  const [lastUpdated, setLastUpdated] = useState<Date>()
  const [quote, setQuote] = useState<any>([])
  const [page, setPage] = useState(0)
  const rowsPerPage = 15

  const fetchIntradayQuote = async () => {
    const currentQuote = quote.slice((page - 1) * rowsPerPage, (page - 1) * rowsPerPage + rowsPerPage)
    console.log(currentQuote)
  }

  const fetchSnapshot = async (): Promise<void> => {
    console.log('fetchSnapshot')
    try {
      const headers = {
        'X-API-KEY': process.env.API_KEY as string
      }
      const response = await axios.get(`${apiSnapshotQuotesUrl}/TSE`, {
        headers: headers
      })
      const data = response.data.data
      if (data.length === 0) return
      data.forEach((item: any) => {
        item.id = item.symbol
      })
      setPage(1)
      setQuote(data)
    } catch (error) {
      console.error('API 請求錯誤:', error)
    }
  }

  const Pagination = ({ page, onPageChange }: Pick<TablePaginationProps, 'page' | 'onPageChange'>) => {
    const apiRef = useGridApiContext()
    const pageCount = useGridSelector(apiRef, gridPageCountSelector)
    return (
      <MuiPagination color="primary" shape="rounded" size="small" count={pageCount} page={page + 1}
        onChange={(event, newPage) => {
          onPageChange(event as any, newPage - 1);
        }}
        sx={{
          '& .MuiPagination-ul': {
            flexWrap: 'nowrap'
          },
        }}
      />
    )
  }

  const CustomPagination = (props: any) => {
    return <GridPagination ActionsComponent={Pagination} {...props} />
  }

  useEffect(() => {
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (hydrated) {
      fetchSnapshot()
      setLastUpdated(new Date())
    }
  }, [hydrated])

  useEffect(() => {
    fetchIntradayQuote()
  }, [page])

  if (!hydrated) return null

  return (
    <>
      <TSE />
      <Container maxWidth="xl" className="mb-8">
        <div className="my-4 flex justify-between">
          <h1 className="text-lg">台股即時報價</h1>
          <div className="flex items-center text-sm">
            <button
              className="px-2 py-1 bg-blue-500 text-white text-xs rounded-md transition-colors hover:bg-blue-400"
              onClick={() => fetchSnapshot()}
            >
              重新整理
            </button>
            <div className="ml-2">最後更新時間：{dayjs(lastUpdated).format('YYYY-MM-DD HH:mm:ss')}</div>
          </div>
        </div>

        <DataGrid density='compact' rows={quote} columns={columns}
          slots={{
            pagination: CustomPagination,
            toolbar: GridToolbar,
            loadingOverlay: LinearProgress
          }}
          initialState={{
            pagination: { paginationModel: { pageSize: 12 } },
          }}
          pageSizeOptions={[12]}
          sx={{
            '& .MuiDataGrid-columnHeaders': {
              background: theme.palette.info.main,
              color: theme.palette.secondary.main,
            },
            '& .MuiIconButton-root': {
              color: theme.palette.secondary.light,
            },
            '& .MuiDataGrid-columnSeparator': {
              color: 'transparent'
            }
          }}
          loading={quote.length === 0}
        />
      </Container>
    </>
  )
}

export default Page
