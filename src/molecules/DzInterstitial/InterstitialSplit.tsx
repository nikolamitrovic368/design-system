import React, { FC, useMemo } from 'react';
import {
  DzMedia,
  DzMediaProps,
  DzText,
  TEXT_SIZES,
  DzTitle,
  TITLE_TYPES,
  TITLE_SIZES,
  DzButton,
  BUTTON_SIZES,
} from '../../atoms';
import { cn } from '../../utils/classnames';
import { TextColors, PrimaryCTAInterstitial } from './DzInterstitial';
import { BREAKPOINTS } from '../../layout/breakpoints';
import useWindowSize from '../../hooks/useWindowSize';

export interface InterstitialSplitProps {
  title?: string;
  description?: string;
  category?: string;
  primaryCta?: PrimaryCTAInterstitial;
  split?: boolean;
  media?: DzMediaProps;
  textColor?: TextColors;
  customClass?: string;
  customTitleClass?: string;
  customDescriptionClass?: string;
}

const styles: any = {
  splitContainer: `
    flex
    w-full
    gap-5
    flex-col
    md:flex-row
  `,
  mediaContainer: `
    basis-1/2
    block
    overflow-hidden
    relative
  `,
  image: `
    h-full
    w-full
    object-cover
    absolute
    top-2/4
    -translate-y-1/2
    object-center
  `,
  category: `
    md:text-sm
  `,
  title: `
    md:text-xxl
  `,
  contentInfo: `
    flex
    flex-col
    gap-2.5
    basis-1/2
  `,
  description: `
    my-2.5
  `,
  btnCTA: `
    mt-2.5
    md:mt-5
  `,
};

export const InterstitialSplit: FC<InterstitialSplitProps> = ({
  textColor = 'black-100',
  category,
  title = '',
  description,
  primaryCta,
  media,
  customClass = '',
  customTitleClass = '',
  customDescriptionClass = '',
}) => {
  const textClassColor = `text-${textColor}`;
  const { width } = useWindowSize();
  const isSmall = useMemo(() => {
    return width < BREAKPOINTS.MD;
  }, [width]);
  return (
    <div className={cn(styles.splitContainer, customClass)}>
      {media ? (
        <DzMedia
          className={cn(styles.mediaContainer)}
          imgClass={cn(!isSmall ? styles.image : 'object-cover')}
          {...media}
        />
      ) : null}

      <div className={cn(styles.contentInfo)}>
        {category ? (
          <DzText
            className={cn(styles.category, textClassColor, customTitleClass)}
            text={category}
            textSize={TEXT_SIZES.XS}
          />
        ) : null}

        {title ? (
          <DzTitle
            classNameTitle={cn(styles.title, textClassColor)}
            title={title}
            titleType={TITLE_TYPES.P}
            titleSize={TITLE_SIZES.LG}
          ></DzTitle>
        ) : null}

        {description ? (
          <DzText
            className={cn(
              styles.description,
              textClassColor,
              customDescriptionClass
            )}
            text={description}
          />
        ) : null}

        {primaryCta ? (
          <div>
            <DzButton
              className={cn(styles.btnCTA, textClassColor)}
              {...(primaryCta?.ctaProps ?? {})}
              size={BUTTON_SIZES.LARGE}
            >
              {primaryCta.text}
            </DzButton>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default InterstitialSplit;
