import { useState } from 'react';
import dynamic from 'next/dynamic';
import axios from 'axios';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async () => {
    try {
      await axios.post('/api/posts', { title, content });
      alert('Created!');
    } catch (e) {
      alert('Error: ' + e.response?.data.error);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Create Post</h1>
      <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} style={{ width: '100%', marginBottom: 12 }} />
      <ReactQuill value={content} onChange={setContent} />
      <button onClick={handleSubmit} style={{ marginTop: 12 }}>Submit</button>
    </div>
  );
}