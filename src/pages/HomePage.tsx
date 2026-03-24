import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";



import { RootState } from "../store";
import { addList, deleteList, updateList } from "../slices/listsSlice";

      interface ListItem {
      id: number;
        name: string;
        quantity: number;

        notes?: string;
          category?: string;
}
  
  const HomePage: React.FC = () => {
    const currentUser = useSelector((state: RootState) => state.user.currentUser);
    const lists = useSelector((state: RootState) => state.lists.items);
    const dispatch = useDispatch();

  const [name, setName] = useState("");

  const [quantity, setQuantity] = useState<number>(1);
  const [notes, setNotes] = useState("");


  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");

  const [sort, setSort] = useState<"name" | "category" | "date">("date");

  const handleAddList = () => {
    if (!name) return alert("Enter a list name!");
    const newList: ListItem = {
      id: Date.now(),
      name,
      quantity,
      notes,
      category,
    };
    dispatch(addList(newList));
    setName("");
    setQuantity(1);
    setNotes("");
    setCategory("");
  };

  const handleDelete = (id: number) => {
    dispatch(deleteList(id));
  };


  const handleEdit = (list: ListItem) => {
    const updatedName = prompt("Update name:", list.name) || list.name;
    dispatch(updateList({ ...list, name: updatedName }));
  };
 

  // search --------------------------------------------------------------------------------------------
  const filteredLists = lists
    .filter((l: ListItem) => l.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a: any, b: any) => {
      if (sort === "name") return a.name.localeCompare(b.name);
      if (sort === "category") return (a.category || "").localeCompare(b.category || "");
      return b.id - a.id; // fallback
    });

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f0fff0", padding:"2rem", fontFamily:"Arial" }}>
      <h1 style={{ color:"#006400" }}>Welcome to ReaReka, {currentUser ? currentUser.name : "Guest"}!</h1>
      <p style={{ marginTop:"1rem" }}>
        <a href="/profile" style={{ color:"#006400", marginRight:"1rem" }}>Profile</a>
        <a href="/" style={{ color:"#006400" }}>Logout</a>
      </p>

      {/* new list*/}
      <div style={{ marginTop:"2rem", background:"white", padding:"1rem", borderRadius:"8px", boxShadow:"0 0 10px rgba(0,0,0,0.1)" }}>
        <h2 style={{ color:"#006400" }}>Add New Shopping List</h2>
        <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} style={{ marginRight:"0.5rem", padding:"0.4rem" }} />
        <input placeholder="Quantity" type="number" value={quantity} onChange={e => setQuantity(Number(e.target.value))} style={{ marginRight:"0.5rem", padding:"0.4rem", width:"60px" }} />
        <input placeholder="Notes" value={notes} onChange={e => setNotes(e.target.value)} style={{ marginRight:"0.5rem", padding:"0.4rem" }} />
        <input placeholder="Category" value={category} onChange={e => setCategory(e.target.value)} style={{ marginRight:"0.5rem", padding:"0.4rem" }} />
        <button onClick={handleAddList} style={{ backgroundColor:"#006400", color:"white", border:"none", padding:"0.5rem 1rem", cursor:"pointer" }}>Add</button>
      </div>



 
      {/* Search & Sort */}
      <div style={{ marginTop:"1rem" }}>
        <input placeholder="Search by name" value={search} onChange={e=>setSearch(e.target.value)} style={{ padding:"0.4rem", marginRight:"0.5rem" }} />
        <select value={sort} onChange={e=>setSort(e.target.value as any)} style={{ padding:"0.4rem" }}>
          <option value="date">Date Added</option>
          <option value="name">Name</option>
          <option value="category">Category</option>
        </select>
      </div>




      {/* Lists */}
      <div style={{ marginTop:"2rem" }}>
        {filteredLists.map((list: ListItem) => (
          <div key={list.id} style={{ background:"white", padding:"1rem", marginBottom:"0.5rem", borderRadius:"8px", display:"flex", justifyContent:"space-between", alignItems:"center", boxShadow:"0 0 5px rgba(0,0,0,0.1)" }}>
            <div>
              <strong>{list.name}</strong> ({list.quantity}) - {list.category} <br />
              <small>{list.notes}</small>
            </div>
            <div>
              <button onClick={()=>handleEdit(list)} style={{ marginRight:"0.5rem", cursor:"pointer" }}>Edit</button>
              <button onClick={()=>handleDelete(list.id)} style={{ cursor:"pointer" }}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};



export default HomePage;