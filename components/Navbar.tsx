import { useState, useEffect, useMemo, FunctionComponent } from 'react';
import Link from 'next/link';
import { menuItems, MenuItemType } from '@/data/navbar-menu.data';




const Navbar: FunctionComponent = () => {
  const [ dropdownActive, setDropdownActive ] = useState({
    titles: false,
    contracts: false
  });

  const handleClick = (type) => {
    setDropdownActive(prev => {
      return {
        ...prev,
        [type]: !prev[type]
      }
    });
  }

  const handleMouseOver = type => {
    setDropdownActive(prev => {
      return {
        ...prev,
        [type]: true
      }
    })
  }

  const handleMouseExit = type => {
    setDropdownActive(prev => {
      return {
        ...prev,
        [type]: false
      }
    })
  }

  console.log({ dropdownActive });

  return (
    <div className="h-20 bg-slate-900 flex justify-between items-center text-xl text-white">

      <div className="flex justify-center cursor-pointer items-center w-10 select-none">
        <Link href="/">
          <a>
            <img className="h-10 mx-20" src="/ledafilms-icon-light.png" />
          </a>
        </Link>
      </div>

      <nav className="flex items-center h-full">
        <ul className="relative h-full flex justify-between items-center text-xl">
          { menuItems.map(({ title, url, submenu }, index) => (
            <MenuItems 
              title={title} 
              url={url} 
              submenu={submenu} 
              key={index} 
              clickHandler={handleClick}
              handleMouseOver={handleMouseOver}
              handleMouseExit={handleMouseExit}
              dropdownActive={dropdownActive}
            />
          )) }
        </ul>


      </nav>

    </div>
  );
}



const MenuItems = ({ title, url, submenu, clickHandler, handleMouseOver, handleMouseExit, dropdownActive, id }) => {
  return (
    <div className="h-full w-36 flex items-center">
      { submenu?.length > 0 ? (
        <li 
          onMouseOver={() => handleMouseOver(title)} 
          onMouseLeave={() => handleMouseExit(title)} 
          className="h-full w-[inherit] flex justify-center items-center text-center select-none"
        >
          <button type="button" aria-haspopup="menu">
            { title }{' '}
            <span>&#x25BC;</span>
          </button>

          { dropdownActive[title] && (
            <Dropdown submenu={submenu} />
          ) }
        </li>
      ) : (
        <li className="mx-8 select-none">
          <Link href={url}>
            <a>{title}</a>
          </Link>
        </li>
      ) }
    </div>
  );
}



interface SubMenu {
  submenu: {
    title: string,
    url: string
  }[]
}

const Dropdown = ({ submenu } : SubMenu) => {
  return (
    <ul className="absolute top-full w-[inherit] text-sm origin-left rounded-md shadow-lg ring-1 bg-slate-900 py-1 px-3 focus:outline-none">
      {submenu.map((item, index) => (
        <li key={index} className="my-4 text-left">
          <Link href={item.url}>
            <a>{item.title}</a>
          </Link>
        </li>
      ))}
    </ul>
  );
}



export default Navbar;

