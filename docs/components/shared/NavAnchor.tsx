import React from 'react';
import { NavLink } from 'react-router-dom';
import { AnchorProps } from '~lib';
import { Anchor } from './registry';

export interface NavAnchorProps extends AnchorProps {
  to?: string;
}

export const NavAnchor = ({ to, href, ...rest }: NavAnchorProps) => {
  return to ? (
    <NavLink to={to} component={Anchor} {...rest} />
  ) : (
    <Anchor href={href} {...rest} />
  );
};
