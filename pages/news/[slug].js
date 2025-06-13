import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { formatDate } from "../../lib/formatDate";

const WP_API_URL = process.env.NEXT_PUBLIC_WP_REST_URL?.replace('/posts?_embed', '') || '';

export default function PostSingle() {
  const router = useRouter();
  const { slug } = router.query;
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) return;
    fetch(`${WP_API_URL}/posts?slug=${slug}&_embed`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then(data => {
        if (data.length > 0) {
          setPost(data[0]);
        } else {
          setError('Post not found');
        }
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [slug]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading post: {error}</p>;
  if (!post) return <p>No post found.</p>;

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4" dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
      {post._embedded?.['wp:featuredmedia']?.[0]?.source_url && (
        <Image
          src={post._embedded['wp:featuredmedia'][0].source_url}
          alt={post.title.rendered}
          width={800}
          height={500}
          className="mb-6"
        />
      )}
      <small>{formatDate(post.acf?.date)}</small>
      <article className="prose max-w-none" dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
    </main>
  );
}
