import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import WpMediaImage from "../components/WpMediaImage";
import { getPageBySlug } from "../lib/wordpress";

export default function WPPage() {
  const { slug } = useRouter().query;
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    setError(null);
    getPageBySlug(slug)
      .then((item) => {
        setPage(item);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [slug]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!page) return <div>Page not found.</div>;

  return (
    <div>
      <h1>{page.title.rendered}</h1>
      <div>
        {page.acf.homepage_sections &&
          Array.isArray(page.acf.homepage_sections) &&
          page.acf.homepage_sections.map((section, idx) => {
            switch (section.acf_fc_layout) {
              case "video_banner_2":
                return (
                  <section
                    key={idx}
                  >
                    <h2
                      dangerouslySetInnerHTML={{
                        __html: section.banner_heading,
                      }}
                    />
                    <p>{section.banner_subheading}</p>
                    {section.video_banner_file && (
                      <WpMediaImage id={section.video_banner_file} width={1920} height={1080} />
                    )}
                    {/* You can render video, fallback image, etc. here */}
                  </section>
                );
              case "service_center":
                return (
                  <section
                    key={idx}
                    className="px-[7vw]"
                  >
                    <h2>{section.section_title}</h2>
                    {/* Example: render services */}
                    {Array.isArray(section.add_services) && (
                      <ul
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: "1rem",
                        }}
                      >
                        {section.add_services.map((service, i) => (
                          <li
                            key={i}
                            style={{
                              border: "1px solid #ddd",
                              borderRadius: "8px",
                              padding: "0.5rem 1rem",
                            }}
                          >
                            <WpMediaImage id={service.service_icon} />
                            <a
                              href={service.service_page_link?.url}
                              target={service.service_page_link?.target}
                            >
                              {service.service_page_link?.title}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </section>
                );
              case "news_and_updates":
                return (
                  <section
                    key={idx}
                    className="px-[7vw]"
                  >
                    <h2>{section.section_title}</h2>
                    {/* Render news here */}
                  </section>
                );
              case "upcoming_events":
                return (
                  <section
                    key={idx}
                    className="px-[7vw]"
                  >
                    <h2>{section.section_title}</h2>
                    {/* Render events here */}
                  </section>
                );
              case "local_attractions":
                return (
                  <section
                    key={idx}
                    className="px-[7vw]"
                  >
                    <h2>{section.section_title}</h2>
                    {Array.isArray(section.locations) && (
                      <ul
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: "1rem",
                        }}
                      >
                        {section.locations.map((loc, i) => (
                          <li key={i}>
                            <a
                              href={loc.location_link?.url}
                              target={loc.location_link?.target}
                            >
                              {loc.location_link?.title}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </section>
                );
              case "activities_of_seasons_2":
                return (
                  <section
                    key={idx}
                    className="px-[7vw]"
                  >
                    <h2>{section.section_title}</h2>
                    {Array.isArray(section.homepage_seasons) && (
                      <ul
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: "1rem",
                        }}
                      >
                        {section.homepage_seasons.map((activity, i) => (
                          <li key={i}>
                            <a
                              href={activity.select_activity?.url}
                              target={activity.select_activity?.target}
                            >
                              {activity.select_activity?.title}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </section>
                );
              default:
                return null;
            }
          })}
      </div>
    </div>
  );
}
