import React, {useContext, useState} from 'react';
import {SystemColors} from '../styleVars';
import { SystemIcons } from '../components/ui/Icon/Icon';

interface ToastContext {
  showToast: (
    message: string,
    icon?: SystemIcons,
    color?: keyof SystemColors,
    mode?: ToastMode,
  ) => void;
  visible: boolean;
  message: string;
  mode?: ToastMode;
  icon?: SystemIcons;
  color?: keyof SystemColors;
}

export const ToastContext = React.createContext<ToastContext>({} as any);

type ToastMode = 'filled' | 'outlined' | 'transparent';

export function ToastProvider({children}: {children: React.ReactNode}) {
  const [message, setMessage] = useState<string>('');
  const [mode, setMode] = useState<ToastMode | undefined>();
  const [icon, setIcon] = useState<SystemIcons | undefined>();
  const [visible, setVisible] = useState<boolean>(false);
  const [color, setColor] = useState<keyof SystemColors | undefined>();

  const showToast = (
    message: string,
    icon?: SystemIcons,
    color?: keyof SystemColors,
    mode?: ToastMode,
  ) => {
    setMessage(message);
    setMode(mode);
    setIcon(icon);
    setColor(color);
    setVisible(true);
    setTimeout(() => {
      setVisible(false);
    }, 4000);
  };

  const value: ToastContext = {
    showToast,
    visible,
    mode,
    message,
    icon,
    color,
  };

  return (
    <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
  );
}
