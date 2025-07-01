import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import axios from 'axios';
import { useRouter } from 'next/router';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

export default function EditPost() {
  const router = useRouter();
  const { slug } = router.query;

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (!slug) return;
    axios.get(`/api/posts/${slug}`).then(res => {
      setTitle(res.data.title);
      setContent(res.data.content);
    });
  }, [slug]);

  const handleSubmit = async () => {
    try {
      await axios.put(`/api/posts/${slug}`, { title, content });
      alert('Updated!');
    } catch (e) {
      alert('Error: ' + e.response?.data.error);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Edit Post</h1>
      <input value={title} onChange={e => setTitle(e.target.value)} style={{ width: '100%', marginBottom: 12 }} />
      <ReactQuill value={content} onChange={setContent} />
      <button onClick={handleSubmit} style={{ marginTop: 12 }}>Update</button>
    </div>
  );
}