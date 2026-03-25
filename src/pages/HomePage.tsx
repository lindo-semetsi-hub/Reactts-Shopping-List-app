import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addList } from "../slices/listsSlice";

import { RootState } from "../store";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const dispatch = useDispatch();


  const navigate = useNavigate();

  const lists = useSelector((state: RootState) => state.lists.items);
  const currentUser = useSelector((state: RootState) => state.user.currentUser);

  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");

  const [search, setSearch ] = useState("");

  const [category, setCategory] = useState("");

  const handleAdd = () => {
    if (!name || !quantity || !category) {
      alert("Please fill all the fields");
      return;
    }

    dispatch(addList({ name, quantity, category }));

    setName("");
    setQuantity("");
    setCategory("");
  };

  const filteredLists = lists.filter((iten: any) =>
  item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ color: "green" }}>
        Welcome {currentUser ? currentUser.name : "Guest"}
      </h1>

      <button onClick={() => navigate("/profile")}>
        Go to Profile
      </button>

      <hr />

      <h2>Add Item</h2>

      <input
        placeholder="Item name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br /><br />

      <input
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />
      <br /><br />

      <input
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <br /><br />

      <button onClick={handleAdd} style={{ background: "green", color: "white" }}>
        Add Item
      </button>

      <hr />



    <h2>Your Items</h2>

      {lists.length === 0 ? (
        <p>No items yet</p>
      ) : (
        <ul>
          {lists.map((item: any) => (
            <li key={item.id}>
              {item.name} | {item.quantity} | {item.category}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};



export default HomePage;