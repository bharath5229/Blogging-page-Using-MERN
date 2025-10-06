import React, { useEffect, useState } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";

const Home = ({ user }) => {
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(()=>{
    const fetchBlogs = async ()=>{
      const res = await axios.get("http://localhost:5000/api/blogs");
      setBlogs(res.data);
    };
    fetchBlogs();
  },[]);

  const filteredBlogs = blogs.filter(blog => blog.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div style={{ background:"#87CEFA", minHeight:"100vh", padding:"20px", borderRadius:"15px" }}>
      <h1>Welcome {user?.name}</h1>
      <input 
        placeholder="Search blog..." 
        value={search} 
        onChange={(e)=>setSearch(e.target.value)} 
        style={{ padding:"5px", borderRadius:"10px", marginBottom:"20px" }}
      />
      <div style={{ display:"grid", gridTemplateColumns:"repeat(2, 1fr)", gap:"20px" }}>
        {filteredBlogs.map(blog => <BlogCard key={blog._id} blog={blog} />)}
      </div>
    </div>
  );
};

export default Home;
