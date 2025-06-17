import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { formatDate } from "../../lib/formatDate";
import WpMediaImage from "../../components/WpMediaImage";
import { getPostBySlug } from "../../lib/wordpress";

export default function PostSingle() {
  const router = useRouter();
  const { slug } = router.query;
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) return;
    getPostBySlug(slug)
      .then((item) => {
        if (item) {
          setPost(item);
        } else {
          setError("Post not found");
        }
        setLoading(false);
      })
      .catch((err) => {
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
        <WpMediaImage
          id={post._embedded['wp:featuredmedia'][0].id}
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
