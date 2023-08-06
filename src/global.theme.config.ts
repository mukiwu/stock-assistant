import { createTheme } from '@mui/material/styles'
import { red } from '@mui/material/colors'

declare module '@mui/material/styles' {
  interface PaletteColor {
    retroRed?: string
    retroDark?: string
    retroGreen?: string
  }

  interface SimplePaletteColorOptions {
    retroRed?: string
    retroDark?: string
    retroGreen?: string
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    retroRed: true
    retroDark: true
    retroGreen: true
  }
}

declare module '@mui/material/Alert' {
  interface AlertPropsColorOverrides {
    retroRed: true
    retroDark: true
    retroGreen: true
  }
}

type ColorKeys = 'retroDark' | 'retroRed' | 'retroGreen'

const colors: Record<ColorKeys, string> = {
  retroDark: '#3C4041',
  // retroRed: '#E17165',
  retroRed: red['300'],
  retroGreen: '#488281'
}

let theme = createTheme()
for (const color in colors) {
  const key = color as ColorKeys
  theme = createTheme(theme, {
    palette: {
      [color]: theme.palette.augmentColor({
        color: {
          main: colors[key]
        },
        name: color
      })
    }
  })
}

theme = createTheme(theme, {
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          color: '#fff'
        }
      }
    }
  }
})

export default theme
