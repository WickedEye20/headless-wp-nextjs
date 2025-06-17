import { useEffect, useState } from "react";
import { getMediaUrl } from "../lib/wordpress";

/**
 * Fetches and displays a WordPress media image by attachment ID.
 * @param {number} id - The WordPress media attachment ID.
 * @param {string} alt - Alt text for the image.
 * @param {object} imgProps - Additional props for the <img> tag.
 */
export default function WpMediaImage({ id, alt = "", width, height, imgProps = {} }) {
  const [url, setUrl] = useState(null);
  const [loading, setLoading] = useState(!!id);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(null);
    getMediaUrl(id)
      .then((u) => {
        setUrl(u);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (!id) return null;
  const imgWidth = width || 40;
  const imgHeight = height || 40;
  const videoWidth = width || 120;
  const videoHeight = height || 80;
  if (loading) return <span style={{display: 'inline-block', width: imgWidth, height: imgHeight, background: '#eee'}} />;
  if (error) return <span style={{color: 'red'}}>Image error</span>;
  if (!url) return null;
  const isVideo = url.match(/\.(mp4|webm|ogg)(\?.*)?$/i);
  if (isVideo) {
    return (
      <video
        src={url}
        controls
        style={{
          width: videoWidth,
          height: videoHeight,
          objectFit: "contain",
          background: "#000",
        }}
        {...imgProps}
      >
        Sorry, your browser doesn't support embedded videos.
      </video>
    );
  }
  return (
    <img
      src={url}
      alt={alt}
      style={{ width: imgWidth, height: imgHeight, objectFit: "contain" }}
      {...imgProps}
    />
  );
}

