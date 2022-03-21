import React from 'react';
import type { NextPage } from 'next';

import { BaseLayout } from 'layouts';
import { Box } from '@mui/material';
import { Form } from '../components';

const Home: NextPage = () => {
  return (
    <BaseLayout maxWidth="lg">
      <Form />
    </BaseLayout>
  );
};

export default Home;
