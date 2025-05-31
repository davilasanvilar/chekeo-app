interface Color {
    0: string;
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
  }
  
  export interface SystemColors {
    primary: Color;
    error: Color;
    neutral: Color;
    success: Color;
    warning: Color;
  }
  
  export const colors: SystemColors = {
    primary: {
      0: '#E8EAF6',
      50: '#E8EAF6',
      100: '#C5CAE9',
      200: '#9FA8DA',
      300: '#7986CB',
      400: '#5C6BC0',
      500: '#3F51B5',
      600: '#3949AB',
      700: '#303F9F',
      800: '#283593',
      900: '#1A237E',
    },
    neutral: {
      0: '#FFFFFF',
      50: '#FAFAFA',
      100: '#F5F5F5',
      200: '#EEEEEE',
      300: '#E0E0E0',
      400: '#BDBDBD',
      500: '#9E9E9E',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
    },
    error: {
      0: '#FFEBEE',
      50: '#FAECEC',
      100: '#F6D9D9',
      200: '#ECB3B3',
      300: '#DE7B7B',
      400: '#D96868',
      500: '#D04242',
      600: '#A63535',
      700: '#7D2828',
      800: '#531A1A',
      900: '#2A0D0D',
    },
    success: {
      0: '#07541E',
      50: '#C7EFD3',
      100: '#AEE7BF',
      200: '#54C876',
      300: '#40C067',
      400: '#2FB858',
      500: '#1EB14A',
      600: '#1B9E42',
      700: '#188D3B',
      800: '#157B34',
      900: '#126A2C',
    },
    warning: {
      0: '#FFFDE7',
      50: '#FFF9E5',
      100: '#FFF0B3',
      200: '#FFE380',
      300: '#FFD54F',
      400: '#FFCA28',
      500: '#FFE791',
      600: '#FFB300',
      700: '#FFA000',
      800: '#FF8F00',
      900: '#FF6F00',
    },
  };