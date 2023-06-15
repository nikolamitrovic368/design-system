import React, { FC, useMemo, useRef } from 'react';
import { DesktopSubmenu } from './DesktopSubmenus';
import { DzLink, DzLinkProps, RouterProps } from '../../atoms';
import { cn } from '../../utils/classnames';
import { MobileSubmenus } from './MobileSubmenus';
import useHover from '../../hooks/useHover';

export interface MenuItemsProps {
  items: any[];
  isMobile?: boolean;
  linkProps?: DzLinkProps | RouterProps;
}

interface PageLink {
  url: string;
}

interface MenuItemLink {
  title: string;
  newTab: boolean;
  link: string;
}

interface RootLink {
  link: string;
  newTab: boolean;
}

interface SubmenuItems {
  items: any[];
}

interface MenuItemPage {
  title: string;
  newTab: boolean;
  anchor: string;
  page: PageLink;
}

interface MenuItemSubmenu {
  title: string;
  rootLink: RootLink;
  submenu: SubmenuItems;
}

const styles: any = {
  menuContainer: `
    md:flex
    w-fit
    items-center
    justify-end
    max-h-[1.25rem]
  `,
  menuContainerMobile: `
    max-h-[36.1875rem]
    overflow-y-auto
    mr-1
    scrollbar
    scrollbar-h-[0.1875rem]
    scrollbar-w-[0.1875rem]
    scrollbar-thumb-black-60
    scrollbar-track-black-20
    scrollbar-rounded-[0.1875rem]
  `,
  submenuItemMobile: `
    p-5
    w-full
    block
    min-w-fit
  `,
  submenuItemDesktop: `
    w-full
    block
    px-5
    my-1.5
    min-w-fit
  `,
};

export const renderPerType = {
  menuItemLink: (data: MenuItemLink, _, linkProps, className) => {
    const { title, newTab, link } = data ?? {};

    return (
      <DzLink
        {...linkProps}
        href={link}
        openNewTab={newTab}
        className={className}
      >
        {title}
      </DzLink>
    );
  },
  menuItemSubmenu: (
    data: MenuItemSubmenu,
    isMobile: boolean,
    linkProps,
    className
  ) => {
    const { title, submenu } = data ?? {};
    const rootURL = data?.rootLink?.link ?? '';
    const { items } = submenu ?? {};

    return isMobile ? (
      <MobileSubmenus
        title={title}
        rootUrl={rootURL}
        items={items}
        linkProps={linkProps}
      />
    ) : (
      <DesktopSubmenu
        title={title}
        rootUrl={rootURL}
        items={items}
        linkProps={linkProps}
        linkClass={className}
      />
    );
  },
  menuItemPage: (data: MenuItemPage, _, linkProps, className) => {
    const { title, newTab, anchor, page } = data ?? {};
    const { url = '' } = page ?? {};
    const urlWithAnchor = anchor ? `${url}#${anchor}` : url;

    return (
      <DzLink
        {...linkProps}
        href={urlWithAnchor}
        openNewTab={newTab}
        className={className}
      >
        {title}
      </DzLink>
    );
  },
};

export const renderItems = (items, isMobile = false, linkProps = {}) => {
  return items.map(item => {
    const { _type, title } = item ?? {};
    const renderFunction = renderPerType?.[_type];
    const itemListClass = isMobile
      ? styles.submenuItemMobile
      : styles.submenuItemDesktop;
    const listItemStyles = _type === 'menuItemSubmenu' ? '' : itemListClass;

    const { mobileEnabled, desktopEnabled } = item;
    if (isMobile && !mobileEnabled) return null;
    if (!isMobile && !desktopEnabled) return null;

    return renderFunction ? (
      <li
        className="relative"
        key={`${isMobile ? 'mbl' : 'dsk'}-${title}-link-item`}
      >
        {renderFunction(item, isMobile, linkProps, listItemStyles)}
      </li>
    ) : null;
  });
};

export const MenuItems: FC<MenuItemsProps> = ({
  items = [],
  isMobile = false,
  linkProps = {},
}) => {
  if (!items) return null;
  const desktopItems = useRef<HTMLUListElement | null>(null);
  const isHoverRoot = useHover(desktopItems);
  const linkPropsMenu = useMemo(() => (isHoverRoot ? linkProps : {}), [
    isHoverRoot,
    linkProps,
  ]);

  return (
    <ul
      ref={desktopItems}
      className={cn(
        isMobile ? styles.menuContainerMobile : styles.menuContainer
      )}
    >
      {renderItems(items, isMobile, linkPropsMenu)}
    </ul>
  );
};

export default MenuItems;