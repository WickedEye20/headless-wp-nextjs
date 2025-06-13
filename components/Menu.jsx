import Link from 'next/link';

export default function Menu({ menu }) {
  return (
    <nav className="bg-white border-b">
      <ul className="flex space-x-4 px-4 py-2">
        {menu.items && menu.items.map(item => (
          <li key={item.ID} className="relative group">
            <Link href={item.url} legacyBehavior>
              <a className="hover:text-blue-600 font-semibold">{item.title}</a>
            </Link>
            {item.children && item.children.length > 0 && (
              <ul className="absolute left-0 top-full bg-white shadow-lg p-4 min-w-[200px] hidden group-hover:block z-10">
                {item.children.map(child => (
                  <li key={child.ID} className="mb-2 last:mb-0">
                    <Link href={child.url} legacyBehavior>
                      <a className="hover:text-blue-600">{child.title}</a>
                    </Link>
                    {/* Support for third-level (mega) menu */}
                    {child.children && child.children.length > 0 && (
                      <ul className="ml-4 mt-2 border-l pl-2">
                        {child.children.map(grandchild => (
                          <li key={grandchild.ID}>
                            <Link href={grandchild.url} legacyBehavior>
                              <a className="hover:text-blue-600">{grandchild.title}</a>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
