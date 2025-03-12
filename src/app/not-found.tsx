'use client';
import React from 'react';

import Error from '@/Components/Error';

const NotFound = () => {
  return (
    <Error
      statusCode={404}
      msg="Sorry! We couldn't find what you want."
      action={() => window.location.reload()}
    />
  );
};

export default NotFound;
