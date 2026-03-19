import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { fetchLists, addList, deleteList } from "../slices/listsSlice";

const HomePage: React.FC = () => {
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
        {lists.map((list: any) => (
          <li key={list.id}>
            {list.name} - Qty: {list.quantity}{" "}
            <button onClick={() => dispatch(deleteList(list.id))}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;