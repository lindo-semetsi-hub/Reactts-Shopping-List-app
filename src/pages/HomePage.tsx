import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { RootState } from "../store";

import { addList, fetchLists } from "../slices/listsSlice";

const HomePage:
 React.FC = () => {
  const dispatch = useDispatch();

  const lists = useSelector((state: RootState) => state.lists.items);

  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    dispatch(fetchLists());
  }, [dispatch]);

  const handleAdd = () => {
    dispatch(addList({ name, quantity }));
    setName("");
    setQuantity(1);
  };

  return (

    <div>
      <h1>Shopping Lists</h1>

      <input value={name} onChange={e => setName(e.target.value)} placeholder="Item name" />
      <input type="number" value={quantity} onChange={e => setQuantity(Number(e.target.value))} />
      <button onClick={handleAdd}>Add List</button>

      <ul>
        {lists.map(list => (
          <li key={list.id}>{list.name} - Qty: {list.quantity}</li>
        ))}
      </ul>
    </div>
  );
};



export default HomePage;