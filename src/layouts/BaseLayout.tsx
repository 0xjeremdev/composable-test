import React from 'react';
import { Container, ContainerProps } from '@mui/material';

import { Header } from 'components';

export type BaseLayoutProps = ContainerProps;

const BaseLayout: React.FC<BaseLayoutProps> = ({ children, ...restProps }) => {
  return (
    <>
      <Header />
      <Container {...restProps}>{children}</Container>
    </>
  );
};

export default BaseLayout;
