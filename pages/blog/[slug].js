import Head from 'next/head';
import dbConnect from '../../lib/dbConnect';
import Post from '../../models/Post';

export default function BlogPost({ post }) {
  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.content.slice(0, 150)} />
      </Head>
      <article style={{ padding: 20 }}>
        <h1>{post.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </article>
    </>
  );
}

export async function getServerSideProps({ params }) {
  await dbConnect();
  const post = await Post.findOne({ slug: params.slug }).lean();
  if (!post) return { notFound: true };
  post._id = post._id.toString();
  return { props: { post } };
}