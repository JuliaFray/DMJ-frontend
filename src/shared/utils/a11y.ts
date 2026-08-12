export const a11yProps = (index: number | string) => {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
    value: index.toString(),
  };
};
