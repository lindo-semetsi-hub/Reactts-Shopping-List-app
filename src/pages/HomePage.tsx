import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { fetchLists, addList, deleteList, updateList, setSearch, setSortKey } from "../slices/listsSlice";

const HomePage: React.FC = () => {
  const dispatch = useDispatch();
  const { items, search, sortKey } = useSelector((state: RootState) => state.lists);

  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [category, setCategory] = useState("");

  useEffect(() => {
    dispatch(fetchLists());
  }, [dispatch]);

  const handleAdd = () => {
    if (!name) return alert("Enter a name");
    dispatch(addList({ name, quantity, category }));
    setName(""); setQuantity(1); setCategory("");
  };

  // filer + sort
  let filtered = items.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
  if (sortKey === "name") filtered.sort((a,b)=>a.name.localeCompare(b.name));
  if (sortKey === "quantity") filtered.sort((a,b)=>a.quantity-b.quantity);

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial", backgroundColor: "#f0fff0", minHeight: "100vh" }}>
      <h1 style={{ color: "#006400" }}>Shopping Lists</h1>

      {/* Add item */}
      <div style={{ marginBottom: "1rem" }}>


        <input style={{ marginRight: "0.5rem", padding: "0.3rem" }} placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
        <input type="number" style={{ marginRight: "0.5rem", width:"4rem", padding: "0.3rem" }} value={quantity} onChange={e => setQuantity(Number(e.target.value))} />
        <input style={{ marginRight: "0.5rem", padding: "0.3rem" }} placeholder="Category" value={category} onChange={e => setCategory(e.target.value)} />
        <button style={{ backgroundColor:"#006400", color:"white", padding:"0.3rem 0.6rem", border:"none", cursor:"pointer" }} onClick={handleAdd}>Add</button>
      </div>

      {/* search & sort */}
      <div style={{ marginBottom: "1rem" }}>
        <input style={{ marginRight:"0.5rem", padding:"0.3rem" }} placeholder="Search" value={search} onChange={e=>dispatch(setSearch(e.target.value))} />
        <select style={{ padding:"0.3rem" }} onChange={e=>dispatch(setSortKey(e.target.value))}>
          <option value="">Sort</option>
          <option value="name">Name</option>
          <option value="quantity">Quantity</option>
        </select>
      </div>

      {/* List */}
      <ul>
        {filtered.map(item=>(
          <li key={item.id} style={{ marginBottom:"0.5rem" }}>
            <strong>{item.name}</strong> - Qty: {item.quantity} - <em>{item.category}</em>
            <button style={{ marginLeft:"0.5rem", backgroundColor:"#006400", color:"white", border:"none", cursor:"pointer" }} onClick={()=>dispatch(deleteList(item.id))}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;