interface Color {
  0?: string;
  50?: string;
  100?: string;
  200?: string;
  300?: string;
  400?: string;
  500?: string;
  600?: string;
  700?: string;
  800?: string;
  900?: string;
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
    100: '#2af984',
    200: '#2de57d',
    300: '#14cc6f',
    400: '#2bbf74',
    500: '#34a36b',
    600: '#167244',
    700: '#0f663b',
    800: '#054f2a',
    900: '#033f1f',
  },
  neutral: {
    0: '#FFFFFF',
    100: '#f7f8ff',
    200: '#e3e8f4',
    300: '#bec4d3',
    400: '#838699',
    500: '#5e6372',
    600: '#2f2f4c',
    700: '#1e223d',
    800: '#11162d',
    900: '#090d21',
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