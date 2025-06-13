import { useEffect, useState } from 'react';
import Menu from './Menu';

export default function Layout({ children }) {
  const [menu, setMenu] = useState(null);

  useEffect(() => {
    fetch('/api/menus')
      .then(res => res.json())
      .then(data => {
        // Use the first menu by default, or adjust as needed
        setMenu(data && data.length ? data[0] : null);
      });
  }, []);

  return (
    <>
      {menu && <Menu menu={menu} />}
      <main>{children}</main>
    </>
  );
}
