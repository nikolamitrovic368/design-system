import React, { FC, Fragment } from 'react';
import { Transition, Disclosure } from '@headlessui/react';
import {
  DzTitle,
  TitleType,
  TextSize,
  TEXT_TYPES,
  TEXT_SIZES,
} from './DzTitle';
import {
  DzText,
  TEXT_TYPES as TYPES_TEXT,
  TEXT_SIZES as SIZE_TEXT,
} from './DzText';

import { DzLink } from './DzLink';
import { cn } from '@/utils/classnames';
import ArrowDown from '@/svgIcons/arrowDown';

export interface DzExpansionProps {
  title: string;
  subtitle?: string;
  link?: string;
  linkText?: string;
}

interface TitleTypeProps {
  titleType: TitleType;
  titleSize: TextSize;
  subtitleSize?: TextSize;
  title: string;
  subtitle?: string;
}

const styles = {
  expansion: `
    flex
    flex-col
  `,
  headWrapper: `
    flex
    justify-between
    pb-[2.5rem]
  `,
  link: `
    !text-md
    underline
    underline-offset-1
  `,
  divider: `
    bg-black-20
  `,
  headerComponent: `
    flex
    justify-between
  `,
  arrowIcon: `
    my-auto
  `,
  contentList: `
    flex
    flex-col
  `,
  textContainer: `
    flex
    flex-col
    justify-start
  `,
  slug: `
    self-start
  `,
  item: `
    mb-5
    mt-5
  `,
  panel: `
    mt-[0.9375rem]
  `
};

const sections = [
  {
    slug: 'slug',
    title: 'Title Text',
    content:
      "Chicharrones marfa tumeric squid four loko flexitarian celiac hell of hot chicken jianbing salvia enamel pin woke. Migas you probably haven't heard of them church-key pok pok banh mi yr ennui ethical subway tile authentic. Sartorial retro roof party, gastropub bicycle rights drinking vinegar microdosing swag DIY deep v. Viral hella pop-up, banh mi squid poke chambray yuccie biodiesel occupy scenester.",
  },
  {
    slug: 'slug',
    title: 'Title Text',
    content:
      "Chicharrones marfa tumeric squid four loko flexitarian celiac hell of hot chicken jianbing salvia enamel pin woke. Migas you probably haven't heard of them church-key pok pok banh mi yr ennui ethical subway tile authentic. Sartorial retro roof party, gastropub bicycle rights drinking vinegar microdosing swag DIY deep v. Viral hella pop-up, banh mi squid poke chambray yuccie biodiesel occupy scenester.",
  },
  {
    slug: 'slug',
    title: 'Title Text',
    content:
      "Chicharrones marfa tumeric squid four loko flexitarian celiac hell of hot chicken jianbing salvia enamel pin woke. Migas you probably haven't heard of them church-key pok pok banh mi yr ennui ethical subway tile authentic. Sartorial retro roof party, gastropub bicycle rights drinking vinegar microdosing swag DIY deep v. Viral hella pop-up, banh mi squid poke chambray yuccie biodiesel occupy scenester.",
  },
];

export const DzExpansion: FC<DzExpansionProps> = ({
  title = '',
  subtitle = '',
  linkText = '',
  link = '/',
}) => {
  const getTitle = ({
    titleType,
    titleSize,
    subtitleSize,
    title,
    subtitle,
  }: TitleTypeProps) => {
    return (
      <DzTitle
        titleType={titleType}
        titleSize={titleSize}
        subtitleSize={subtitleSize}
        title={title}
        subtitle={subtitle}
      />
    );
  };
  const renderLink =
    linkText && link ? (
      <DzLink LinkElement="a" href={link} className={cn(styles.link)}>
        {linkText}
      </DzLink>
    ) : null;

  return (
    <div className={cn(styles.expansion)}>
      <div className={cn(styles.headWrapper)}>
        {getTitle({
          titleType: TEXT_TYPES.H3,
          titleSize: TEXT_SIZES.LARGE,
          subtitleSize: TEXT_SIZES.LARGE,
          title,
          subtitle,
        })}
        {renderLink}
      </div>
      <hr className={cn(styles.divider)} />
      <div className={cn(styles.contentList)}>
        {sections.map(section => {
          return (
            <>
              <div className={cn(styles.item)}>
                <Disclosure>
                  {({ open }) => (
                    <>
                      <Disclosure.Button className={'w-full'}>
                        <div className={cn(styles.headerComponent)}>
                          <div className={cn(styles.textContainer)}>
                            <DzText
                              className={cn(styles.slug)}
                              textType={TYPES_TEXT.P}
                              text={section?.slug}
                              textSize={SIZE_TEXT.XS}
                            />
                            {getTitle({
                              titleType: TEXT_TYPES.H5,
                              titleSize: TEXT_SIZES.LARGE,
                              title: section.title,
                            })}
                          </div>

                          <ArrowDown
                            fill="#4D4D4D"
                            className={cn(styles.arrowIcon)}
                          />
                        </div>
                      </Disclosure.Button>
                      <Transition
                        show={open}
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Disclosure.Panel className={cn(styles.panel)} static>
                          {section.content}
                        </Disclosure.Panel>
                      </Transition>
                    </>
                  )}
                </Disclosure>
              </div>
              <hr className={cn(styles.divider)} />
            </>
          );
        })}
      </div>
    </div>
  );
};

export default DzExpansion;
