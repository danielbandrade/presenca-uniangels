import React, { useState } from 'react';

const MultiSelectList = () => {
  const [selectedItems, setSelectedItems] = useState([]);

  // Sample list of items
  const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];

  const handleSelectItem = (item) => {
    if (selectedItems.includes(item)) {
      // Item is already selected, so remove it from the selection
      setSelectedItems(selectedItems.filter((selectedItem) => selectedItem !== item));
    } else {
      // Item is not selected, so add it to the selection
      setSelectedItems([...selectedItems, item]);
    }
  };

  return (
    <div>
      <h2>Multi-Select List</h2>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            <label>
              {item}
              <input
                type="checkbox"
                value={item}
                checked={selectedItems.includes(item)}
                onChange={() => handleSelectItem(item)}
              />
            </label>
          </li>
        ))}
      </ul>
      <p>Selected Items: {selectedItems.join(', ')}</p>
    </div>
  );
};

export default MultiSelectList;
