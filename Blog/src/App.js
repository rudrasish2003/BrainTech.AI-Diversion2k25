import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import contractABI from "./artifacts/contracts/Blog.sol/Blog.json";
import "./App.css";
import { LuBrain } from "react-icons/lu";

const contractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"; // Replace with actual deployed address

function App() {
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [posts, setPosts] = useState([]);

  // ✅ Connect Wallet
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const blogContract = new ethers.Contract(contractAddress, contractABI.abi, signer);

        setAccount(await signer.getAddress());
        setContract(blogContract);

        console.log("Connected to contract:", blogContract);
      } catch (error) {
        console.error("Error connecting to wallet:", error);
      }
    } else {
      console.log("MetaMask not detected!");
    }
  };

  // ✅ Add Blog Post
  const addBlogPost = async () => {
    if (!contract) return console.log("Contract not connected!");

    try {
      const tx = await contract.createPost(title, content); // Call contract function
      await tx.wait(); // Wait for confirmation
      console.log("Blog post added!");

      fetchPosts(); // Refresh list after posting
    } catch (error) {
      console.error("Error adding blog post:", error);
    }
  };

  // ✅ Fetch All Blog Posts
  const fetchPosts = async () => {
    if (!contract) return;

    try {
      const postsData = await contract.getPosts();
      setPosts(postsData);
      console.log("Fetched Posts:", postsData);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  // Fetch posts on contract load
  useEffect(() => {
    if (contract) fetchPosts();
  }, [contract]);

  return (
    <div className="App">
    <div className="Appmain">
    <div className="App2" >
     <div className="App3">
      <LuBrain size="3rem" color="red"
      />
      </div>
      <div className="App4">
      <h1>log</h1>
      </div>
      </div>
      <div className="App5">      <button onClick={connectWallet} className="button1">
        {account ? `Connected: ${account}` : "Connect MetaMask"}
      </button>
      </div>
      </div>
{/* 
      <button onClick={connectWallet} className="button1">
        {account ? `Connected: ${account}` : "Connect MetaMask"}
      </button> */}

      <div>
        <input type="text" placeholder="Blog Title" value={title} className="blog" onChange={(e) => setTitle(e.target.value)} />
        <input type="text" placeholder="Content Hash (IPFS link)" className="blog2"  value={content} onChange={(e) => setContent(e.target.value)} />
        <button onClick={addBlogPost} className="post">Post Blog</button>
      </div>

      <button onClick={fetchPosts} className="load">Load Blog Posts</button>

      <h2>All Posts</h2>
      <ul>
        {posts.map((post, index) => (
          <li key={index}>
            <h3>{post.title}</h3>
            <p>Content: <a href={`https://ipfs.io/ipfs/${post.contentHash}`} target="_blank" rel="noopener noreferrer">{post.contentHash}</a></p>
            <p>Author: {post.author}</p>
            <p>Timestamp: {new Date(Number(post.timestamp) * 1000).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
