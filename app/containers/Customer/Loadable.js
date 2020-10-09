/**
 *
 * Asynchronously loads the component for Customer
 *
 */

import React from 'react';
import loadable from 'utils/loadable';
import LoadingIndicator from 'components/LoadingIndicator';

export default loadable(() => import('./Order'), {
  fallback: <LoadingIndicator />,
});
