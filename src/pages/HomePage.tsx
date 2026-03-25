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


  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");

  const handleAdd = () => {
    if (!name || !quantity || !category) {
      alert("Fill all fields");
      return;
    }

    dispatch(addList({ name, quantity, category }));

    setName("");
    setQuantity("");
    setCategory("");
  };

  



  //based on search
  const filteredLists = lists.filter((item: any) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1 style={{ color: "green" }}>
        Welcome to ReaReka {currentUser ? currentUser.name : "Guest"} 👋
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

      <button style={{ background: "green", color: "white" }} onClick={handleAdd}>
        Add Item
      </button>

      <hr />



  <h2>Search</h2>

      <input
        placeholder="Search by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <br /><br />

      <h2>Your Items</h2>

      {filteredLists.length === 0 ? (
        <p>No matching items...</p>
      ) : (
        <ul>
          {filteredLists.map((item: any) => (
            <li key={item.id}>
              <strong>{item.name}</strong> | Qty: {item.quantity} | Category: {item.category}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};




export default HomePage;