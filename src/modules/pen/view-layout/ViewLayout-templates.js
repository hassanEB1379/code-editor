import ViewLayoutIcon from './ViewLayout-icon';

export const horizontalTemplate = {
   wrapper: {
      orientation: 'horizontal',
   },
   editors: {
      orientation: 'vertical',
   },
   icon: <ViewLayoutIcon rotate={-90} />,
};

export const verticalTemplate = {
   wrapper: {
      orientation: 'vertical',
   },
   editors: {
      orientation: 'horizontal',
   },
   icon: <ViewLayoutIcon />,
};
