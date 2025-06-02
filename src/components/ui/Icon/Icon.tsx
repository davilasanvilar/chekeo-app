import React from 'react';
import Add from './icons/add.svg';
import Check from './icons/check.svg';
import Ok from './icons/ok.svg';
import Error from './icons/error.svg';
import Dot from './icons/dot.svg';

import {colors} from '../../../styleVars';

export type IconProps = {
  type: SystemIcons;
  size?: number;
  color?: string;
};

export type SystemIcons = 'add' | 'check' | 'ok' | 'error' | 'dot';

export const Icon = (props: IconProps) => {
  const {type, size = 16, color = colors.primary[500]} = props;
  return getIconType(type, size, color);
};

function getIconType(
  type: SystemIcons,
  size = 12,
  color?: string,
): React.ReactElement {
  switch (type) {
    case 'add':
      return <Add width={size} height={size} color={color} />;
    case 'check':
      return <Check width={size} height={size} color={color} />;
    case 'ok':
      return <Ok width={size} height={size} color={color} />;
    case 'error':
      return <Error width={size} height={size} color={color} />;
    case 'dot':
      return <Dot width={size} height={size} color={color} />;

    default:
      return <></>;
  }
}
