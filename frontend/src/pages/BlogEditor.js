import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const BlogEditor = ({ user }) => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  useEffect(()=>{
    if(id){
      axios.get(`http://localhost:5000/api/blogs`).then(res=>{
        const blog = res.data.find(b => b._id === id);
        setTitle(blog.title);
        setContent(blog.content);
      });
    }
  },[id]);

  const handleSave = async ()=>{
    if(id){
      await axios.put(`http://localhost:5000/api/blogs/edit/${id}`, { title, content });
    } else {
      await axios.post("http://localhost:5000/api/blogs/create", { title, content, author: user.name });
    }
    navigate("/home");
  }

  return (
    <div style={{ padding:"20px" }}>
      <input value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Blog Title" style={{ width:"100%", padding:"10px" }} />
      <textarea value={content} onChange={(e)=>setContent(e.target.value)} placeholder="Blog Content" style={{ width:"100%", height:"300px", marginTop:"10px", padding:"10px" }} />
      <button onClick={handleSave} style={{ marginTop:"10px" }}>Save</button>
    </div>
  );
};

export default BlogEditor;
