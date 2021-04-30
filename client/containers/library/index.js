import React from 'react';
import PageList from '../../components/PageList';

const itemsList = [
  {
    label: 'Add Book',
    link: '/library/add',
    icon: 'book-medical',
  },
  {
    label: 'Available Books',
    link: '/library/list',
    icon: 'list-alt',
  },
  {
    label: 'Personal Stats',
    link: '/library/personal-stats',
    icon: 'chart-line',
  },
  {
    label: 'Stats',
    link: '/library/lib-stats',
    icon: 'chart-bar',
  },
];

const Library = () => <PageList itemsList={itemsList} />;
export default Library;
