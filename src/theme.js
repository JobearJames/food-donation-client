import {createTheme } from '@mui/material/styles';
const primary ={
    main: '#D46912BA',
}
const secondary = {
  main: '#C9F2F2'
}
const theme = createTheme({
  palette: {
    primary: {
      main: primary.main,
    },
    secondary:{
      main: secondary.main
    }
  },
  typography:{
    subtitle1:{
      fontWeight: 500
    },
    subtitle:{
      fontSize: '1.25rem',
      fontWeight: 400
    }
  }
});

export default theme