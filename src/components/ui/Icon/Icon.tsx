import React from 'react';
import Add from './icons/add.svg';
import Check from './icons/check.svg';
import {colors} from '../../../styleVars';

export type IconProps = {
  type: SystemIcons;
  size?: number;
  color?: string;
};

export type SystemIcons = 'add' | 'check';

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
    default:
      return <></>;
  }
}
