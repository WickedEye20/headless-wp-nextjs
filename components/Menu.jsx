import Link from "next/link";

export default function Menu({ menu }) {
  return (
    <nav className="bg-white border-b">
      <ul className="flex gap-4">
        <li className="relative group py-2">
          <Link href="/home-2" legacyBehavior>
            <a className="hover:text-blue-600 font-semibold">Home 2</a>
          </Link>
        </li>
        <li className="relative group py-2">
          <Link href="/gravity-form" legacyBehavior>
            <a className="hover:text-blue-600 font-semibold">Gravity Forms</a>
          </Link>
        </li>
        {menu.items &&
          menu.items
            .filter((item) => item.parent == 0)
            .map((item) => {
              let item_ID = item.id;
              return (
                <li
                  key={item_ID}
                  id={item_ID}
                  className="relative group py-2"
                  tabIndex={0}
                  role="menuitem"
                  aria-haspopup={true}
                  aria-expanded={false}
                >
                  <Link href={item.url} legacyBehavior>
                    <a
                      className="hover:text-blue-600 font-semibold"
                      dangerouslySetInnerHTML={{ __html: item.title }}
                    ></a>
                  </Link>
                  {menu.items &&
                    (() => {
                      const subMenuItems = menu.items.filter(
                        (subItem) =>
                          subItem.parent != 0 && subItem.parent == item_ID
                      );
                      return subMenuItems.length > 0 ? (
                        <ul
                          className="sub_menu_list absolute left-0 top-full min-w-[180px] rounded bg-white shadow-lg p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-200 z-10"
                          role="menu"
                        >
                          {subMenuItems.map((subItem) => (
                            <li
                              key={subItem.ID}
                              className="relative group sub_menu"
                              role="menuitem"
                            >
                              <Link href={subItem.url} legacyBehavior>
                                <a
                                  className="block px-3 py-1 hover:text-blue-600 font-semibold hover:bg-gray-100 rounded"
                                  dangerouslySetInnerHTML={{
                                    __html: subItem.title,
                                  }}
                                  tabIndex={-1}
                                ></a>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      ) : null;
                    })()}
                </li>
              );
            })}
      </ul>
    </nav>
  );
}
