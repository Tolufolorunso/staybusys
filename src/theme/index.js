import { createTheme } from '@mui/material';

export const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 1000,
      lg: 1200,
      xl: 1920
    }
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true
      },
      styleOverrides: {
        root: {
          textTransform: 'none'
        },
        sizeSmall: {
          padding: '6px 16px'
        },
        sizeMedium: {
          padding: '8px 20px'
        },
        sizeLarge: {
          padding: '11px 24px'
        },
        textSizeSmall: {
          padding: '7px 12px'
        },
        textSizeMedium: {
          padding: '9px 16px'
        },
        textSizeLarge: {
          padding: '12px 16px'
        },

      }
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true
      },

    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: '32px 24px',
          '&:last-child': {
            paddingBottom: '32px'
          }
        }
      }
    },

    MuiPaginationItem: {
      styleOverrides: {
        root: {
          margin:"0px !important",
          borderRadius:"0px",
          border: '1px solid #E8E9EC',
          backgroundColor:"#fff",

          "&.Mui-selected":{
            backgroundColor:"#FF6685 !important",
            color:'white'
          },

        },
        ellipsis: {
          height:"32px !important",
        },
        previousNext: {
            borderRadius:"4px !important"
        }

      }
    },


    MuiCardHeader: {
      defaultProps: {
        titleTypographyProps: {
          variant: 'h3'
        },
        subheaderTypographyProps: {
          variant: 'body2'
        }
      },
      styleOverrides: {
        root: {
          padding: '32px 24px',
          paddingLeft:"50px"
        }
      }
    },
    MuiCssBaseline: {
      styleOverrides: {
        '*': {
          boxSizing: 'border-box',
          margin: 0,
          padding: 0
        },
        html: {
          MozOsxFontSmoothing: 'grayscale',
          WebkitFontSmoothing: 'antialiased',
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100%',
          width: '100%'
        },
        body: {
          display: 'flex',
          flex: '1 1 auto',
          flexDirection: 'column',
          minHeight: '100%',
          backgroundColor:"#F7F4EF",
          width: '100%'
        },
        '#__next': {
          display: 'flex',
          flex: '1 1 auto',
          flexDirection: 'column',
          height: '100%',
          width: '100%'
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderColor: '#E6E8F0'
        }
      }
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: 'white',
          '.MuiTableCell-root': {
            color: '#374151',
            textTransform:"none"

          },
          borderBottom:"1px solid rgba(223, 224, 235, 1)",
          '& .MuiTableCell-root': {
            borderBottom: 'none',

            fontWeight: 900,
            paddingLeft:"50px !important",
            lineHeight: 1,
            letterSpacing: 0.5,
            textTransform: 'none',
            fontFamily: 'Almarena',
            fontStyle: 'normal',
            fontWeight: 700,
            fontSize: '25px',
            lineHeight: '130%',
            /* or 32px */


            color:' #181818',
          },
          '& .MuiTableCell-paddingCheckbox': {
            paddingTop: 4,
            paddingBottom: 4
          }
        }
      }
    },
    MuiTableBody: {
      styleOverrides: {
        root: {
          backgroundColor: 'white',
          '.MuiTableCell-root': {
            color: '#374151',
            borderBottom:"1px solid rgba(223, 224, 235, 1)",
          },
          borderBottom:"1px solid rgba(223, 224, 235, 1)",
          '& .MuiTableCell-root': {
            borderBottom:"1px solid rgba(223, 224, 235, 1)",
            fontSize: '16px',
            fontWeight: 400,
            paddingLeft:"50px !important",
            lineHeight: 1,
            letterSpacing: 0.5,
            fontFamily:"Euclid Circular A",
            textTransform: 'none',
            color: '#18181',
          },
          '& .MuiTableCell-paddingCheckbox': {
            paddingTop: 4,
            paddingBottom: 4
          }
        }
      }
    }

  },
  palette: {
    neutral: {
      100: '#F3F4F6',
      200: '#E5E7EB',
      300: '#D1D5DB',
      400: '#9CA3AF',
      500: '#6B7280',
      600: '#4B5563',
      700: '#374151',
      800: '#1F2937',
      900: '#111827'
    },
    action: {
      active: '#6B7280',
      focus: 'rgba(55, 65, 81, 0.12)',
      hover: '#F7F8FF',
      selected: 'rgba(55, 65, 81, 0.08)',
      disabledBackground: 'rgba(55, 65, 81, 0.12)',
      disabled: 'rgba(55, 65, 81, 0.26)'
    },

    background: {
      default: '#F9FAFC',
      paper: '#FFFFFF'
    },
    divider: '#E6E8F0',
    primary: {
      main: '#FF6685',
      light: '#828DF8',
      dark: '#3832A0',
      contrastText: '#FFFFFF'
    },

    secondary: {
      main: '#1DA1F2',
      light: '#3FC79A',
      dark: '#0B815A',
      contrastText: '#FFFFFF'
    },
    success: {
      main: '#D0FE8B',
      light: '#43C6B7',
      dark: '#0E8074',
      contrastText: '#FFFFFF'
    },
    info: {
      main: '#2196F3',
      light: '#64B6F7',
      dark: '#0B79D0',
      contrastText: '#FFFFFF'
    },
    warning: {
      main: '#FFB020',
      light: '#FFBF4C',
      dark: '#B27B16',
      contrastText: '#FFFFFF'
    },
    error: {
      main: '#D14343',
      light: '#DA6868',
      dark: '#922E2E',
      contrastText: '#FFFFFF'
    },
    text: {
      primary: '#121828',
      secondary: '#65748B',
      disabled: 'rgba(55, 65, 81, 0.48)'
    }
  },
  shape: {
    borderRadius: 8
  },
  shadows: [
    'none',
    '0px 1px 1px rgba(100, 116, 139, 0.06), 0px 1px 2px rgba(100, 116, 139, 0.1)',
    '0px 1px 2px rgba(100, 116, 139, 0.12)',
    '0px 1px 4px rgba(100, 116, 139, 0.12)',
    '0px 1px 5px rgba(100, 116, 139, 0.12)',
    '0px 1px 6px rgba(100, 116, 139, 0.12)',
    '0px 2px 6px rgba(100, 116, 139, 0.12)',
    '0px 3px 6px rgba(100, 116, 139, 0.12)',
    '0px 2px 4px rgba(31, 41, 55, 0.06), 0px 4px 6px rgba(100, 116, 139, 0.12)',
    '0px 5px 12px rgba(100, 116, 139, 0.12)',
    '0px 5px 14px rgba(100, 116, 139, 0.12)',
    '0px 5px 15px rgba(100, 116, 139, 0.12)',
    '0px 6px 15px rgba(100, 116, 139, 0.12)',
    '0px 7px 15px rgba(100, 116, 139, 0.12)',
    '0px 8px 15px rgba(100, 116, 139, 0.12)',
    '0px 9px 15px rgba(100, 116, 139, 0.12)',
    '0px 10px 15px rgba(100, 116, 139, 0.12)',
    '0px 12px 22px -8px rgba(100, 116, 139, 0.25)',
    '0px 13px 22px -8px rgba(100, 116, 139, 0.25)',
    '0px 14px 24px -8px rgba(100, 116, 139, 0.25)',
    '0px 10px 10px rgba(31, 41, 55, 0.04), 0px 20px 25px rgba(31, 41, 55, 0.1)',
    '0px 25px 50px rgba(100, 116, 139, 0.25)',
    '0px 25px 50px rgba(100, 116, 139, 0.25)',
    '0px 25px 50px rgba(100, 116, 139, 0.25)',
    '0px 25px 50px rgba(100, 116, 139, 0.25)'
  ],
  typography: {
    button: {
      fontWeight: 600
    },
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.5
    },
    body2: {
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: 1.57
    },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.75
    },
    subtitle2: {
      fontSize: '0.875rem',
      fontWeight: 500,
      lineHeight: 1.57
    },
    overline: {
      fontSize: '0.75rem',

      letterSpacing: '0.5px',
      lineHeight: 2.5,
      textTransform: 'uppercase',
      fontFamily: 'Euclid Circular A',
      fontStyle: 'normal',
      fontWeight: 400,

      lineHeight:' 160%',
      /* or 25px */


      letterSpacing: '0.03em',

      color: '#2F2E40',
    },
    overline2: {
      fontSize: '0.75rem',

      letterSpacing: '0.5px',
      lineHeight: 2.5,
      textTransform: 'uppercase',
      fontFamily: 'Euclid Circular A',
      fontStyle: 'normal',
      fontWeight: 400,

      lineHeight:' 160%',
      /* or 25px */


      letterSpacing: '0.03em',


    },

    caption: {
      fontSize: '1rem',
      fontWeight: 400,
      fontFamily: 'Euclid Circular A',
      fontStyle: 'normal',
      color:" #2f2e40",
      lineHeight: 1.66
    },
    caption2: {
      fontSize: '1rem',
      fontWeight: 400,
      fontFamily: 'Euclid Circular A',
      fontStyle: 'normal',
      color:" #fff",
      lineHeight: 1.66
    },

    h1: {
      fontWeight: 700,
      fontSize: '3.5rem',
      lineHeight: 1.375
    },
    h2: {
      fontWeight: 700,
      fontSize: '3rem',
      lineHeight: 1.375
    },
    h3: {
      fontWeight: 700,
      fontSize: '2.25rem',
      lineHeight: 1.375,

      fontFamily: 'Almarena',
      fontStyle: 'normal',

      lineHeight: '130%',

      color:' #2F2E40',

    },
    h4: {
      fontWeight: 700,
      fontSize: '2rem',
      lineHeight: 1.375,
      fontFamily: 'Almarena',
      fontStyle: 'normal',
      fontWeight: 700,

      lineHeight: '130%',
      /* identical to box height, or 39px */


      color:' #2F2E40;'
    },
    h5: {

      fontSize: '1.5rem',
      lineHeight: 1.375,
      fontFamily: 'Almarena',
      fontStyle: 'normal',
      fontWeight: 700,

      color:' #2F2E40;'
    },
    h6: {
      fontWeight: 600,
      fontSize: '1.125rem',
      lineHeight: 1.375
    },
    p: {
      fontWeight: 400,
      fontSize: '14px',
      lineHeight: 1.15
    }
  }

});
