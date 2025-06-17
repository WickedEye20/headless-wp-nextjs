import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import WpMediaImage from "./WpMediaImage";
import { getPosts } from "../lib/wordpress";

import { formatDate } from "../lib/formatDate";
export default function News() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getPosts()
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading posts: {error}</p>;

  return (
    <>
      <h1 className="text-3xl font-bold mb-4">Latest Posts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map((post) => (
          <article key={post.id} className="border rounded p-4 shadow">
            {post._embedded?.["wp:featuredmedia"]?.[0]?.source_url && (
              <WpMediaImage
                id={post._embedded["wp:featuredmedia"][0].id}
                alt={post.title.rendered}
                width={600}
                height={400}
              />
            )}
            <small>{formatDate(post.acf?.date)}</small>
            <Link href={`/news/${post.slug}`} passHref legacyBehavior>
              <a>
                <h2
                  className="text-xl font-semibold"
                  dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                />
              </a>
            </Link>
            <div dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
          </article>
        ))}
      </div>
    </>
  );
}
