import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import Menu from "../components/Menu";

const WP_API_URL = process.env.NEXT_PUBLIC_WP_REST_URL;

import { formatDate } from "../lib/formatDate";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [menu, setMenu] = useState(null);

  useEffect(() => {
    fetch("/api/menus")
      .then((res) => res.json())
      .then((data) => setMenu(data && data.length ? data[0] : null));
  }, []);

  useEffect(() => {
    fetch(WP_API_URL)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
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
    <main className="container mx-auto p-4">
      {menu && <Menu menu={menu} />}
      <h1 className="text-3xl font-bold mb-4">Latest Posts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map((post) => (
          <article key={post.id} className="border rounded p-4 shadow">
            {post._embedded?.["wp:featuredmedia"]?.[0]?.source_url && (
              <Image
                src={post._embedded["wp:featuredmedia"][0].source_url}
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
    </main>
  );
}
