import React from 'react';

/* import components */
import { Head } from '@politico/interactive-style';
import Illustration from './Illustration';

/* import meta */
import { pib as meta } from 'package.json';

/* import styles */
import 'Theme/base.scss';

const Page = (props) => (
  <div className='story'>
    <Head site={meta.site} />
    <Illustration />
  </div>
);

export default Page;

export { Helmet } from 'react-helmet';
