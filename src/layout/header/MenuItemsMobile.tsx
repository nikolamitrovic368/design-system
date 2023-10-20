import React, {
  FC,
  Fragment,
  useState,
  MouseEventHandler,
  useCallback,
  useMemo,
} from 'react';
import { cn } from '../../utils/classnames';
import MenuLogo from '../../svgIcons/menu';
import CloseLogo from '../../svgIcons/close';
import { Popover, Transition } from '@headlessui/react';
import { MenuItems } from './MenuItems';
import { DzFooter, FooterData } from '../footer/DzFooter';
import useWindowSize from '../../hooks/useWindowSize';

export interface MenuItemsMobileProps {
  items: any[];
  handleSearch: MouseEventHandler<any>;
  footerData: FooterData;
  newsletterAction: Function;
}

const styles: any = {
  logoMenu: `
    cursor-pointer
  `,
  submenuContainer: `
    absolute
    left-0
    top-[50px]
    w-full
    overflow-y-scroll
    bg-white-100
    scrollbar
    scrollbar-h-[0.1875rem]
    scrollbar-w-[0.1875rem]
    scrollbar-thumb-black-60
    scrollbar-track-black-20
    scrollbar-rounded-[0.1875rem]
  `,
  subMenu: `
    w-full
    bg-white-100
    flex
    flex-col
    relative
  `,
  other: `
    p-5
    border
    border-y
    border-black-20
    text-start
  `,
  copyright: `
    px-5
    py-2.5
    text-left
    text-sm
    border
    border-y
    border-black-20
  `,
  toggleIcon: `
    outline-none
    md:outline-transparent
  `,
};

export const MenuItemsMobile: FC<MenuItemsMobileProps> = ({
  items = [],
  footerData,
  newsletterAction = () => null,
}) => {
  const [openMenu, setOpenMenu] = useState(false);

  const { width, height } = useWindowSize();
  const containerHeight = useMemo(() => {
    if (typeof window != 'undefined' && window.document) {
      return window.innerHeight - 60;
    }
    return null;
    //eslint-disable-next-line
  }, [width, height]);

  return (
    <>
      <Popover as={Fragment}>
        <Popover.Button as={Fragment}>
          <button
            className={cn(styles.toggleIcon)}
            onClick={() =>
              setOpenMenu(open => {
                if (typeof window != 'undefined' && window.document) {
                  if (open) {
                    document.body.style.overflow = 'unset';
                  } else {
                    document.body.style.overflow = 'hidden';
                  }
                }
                return !open;
              })
            }
          >
            {!openMenu ? (
              <MenuLogo className={cn(styles.logoMenu)} id="open-menu-logo" />
            ) : (
              <CloseLogo className={cn(styles.logoMenu)} id="close-menu-logo" />
            )}
          </button>
        </Popover.Button>
        <Transition
          as={Fragment}
          show={openMenu}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <Popover.Panel
            static
            className={cn(
              styles.submenuContainer,
              containerHeight ? '' : 'h-screen'
            )}
            style={{
              height: `${containerHeight}px`,
            }}
          >
            <div className={cn(styles.subMenu)}>
              <MenuItems items={items} isMobile />
              <button
                className={cn(styles.other)}
                onClick={() => newsletterAction()}
              >
                Newsletter
              </button>
              <DzFooter
                data={footerData}
                newsletterAction={newsletterAction}
                isOnHeader
              />
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
    </>
  );
};

export default MenuItemsMobile;
