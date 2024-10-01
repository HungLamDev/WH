import React from 'react';
import { ListChildComponentProps, FixedSizeList, ListOnScrollProps } from 'react-window';

// Render each row in the virtualized list
const renderRow = (props: ListChildComponentProps) => {
  const { index, style, data } = props;
  const option = data[index];
  return (
    <li style={style} key={option.id}>
      {option.label}
    </li>
  );
};

// Custom ListboxComponent
const ListboxComponent: React.FC<React.HTMLAttributes<HTMLElement>> = React.forwardRef((props, ref) => {
  const { children, ...other } = props;

  // Convert children to an array of elements
  const itemData = React.Children.toArray(children);

  // Custom onScroll handler to match the expected type
  const handleScroll = (scrollInfo: ListOnScrollProps) => {
    if (props.onScroll) {
      // Create a synthetic event object that matches UIEvent<HTMLElement>
      const syntheticEvent = {
        target: scrollInfo.scrollOffset,
        currentTarget: scrollInfo.scrollOffset,
      } as unknown as React.UIEvent<HTMLElement>;

      props.onScroll(syntheticEvent);
    }
  };

  return (
    <FixedSizeList
      height={250}
      width="100%"
      itemSize={46}
      itemCount={itemData.length}
      overscanCount={5}
      itemData={itemData}
      ref={ref as any}
      {...other}
      onScroll={handleScroll}
    >
      {renderRow}
    </FixedSizeList>
  );
});

export default ListboxComponent;