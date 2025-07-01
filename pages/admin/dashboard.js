import useSWR from 'swr';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';

const fetcher = url => axios.get(url).then(res => res.data);

export default function Dashboard() {
  const router = useRouter();
  const { data: posts, mutate } = useSWR('/api/posts', fetcher);

  const handleDelete = async slug => {
    if (!confirm('Delete this post?')) return;
    await axios.delete(`/api/posts/${slug}`);
    mutate();
  };

  if (!posts) return <p>Loading...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h1>All Posts</h1>
      <Link href="/admin/create"><a>Create new</a></Link>
      <ul>
        {posts.map(p => (
          <li key={p._id}>
            <Link href={`/blog/${p.slug}`}><a>{p.title}</a></Link>{' '}
            <Link href={`/admin/edit/${p.slug}`}><a>[edit]</a></Link>{' '}
            <button onClick={() => handleDelete(p.slug)}>delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}