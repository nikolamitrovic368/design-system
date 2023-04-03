import React, { FC } from 'react';
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

export interface InterstitialFullWidthProps {
  title: string;
  description: string;
  category?: string;
  primaryCta?: PrimaryCTAInterstitial;
  split?: boolean;
  media: DzMediaProps;
  textColor?: TextColors;
}

const styles: any = {
  mediaContainer: `
    block
    md:min-h-[30rem]
    min-h-[22.5rem]
    overflow-hidden
    relative
  `,
  image: `
    h-full
    w-[auto]
    object-cover
    md:object-contain
    md:h-[auto]
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
  btnCTA: `
    mt-2.5
    md:mt-5
  `,
  nonSplit: `
    relative
  `,
  contentInfoNonSplit: `
    w-full
    md:w-[43.125rem]
    p-5
    gap-5
    flex
    flex-col
    absolute
    left-2/4
    top-2/4
    -translate-x-1/2
    -translate-y-1/2
    text-center
  `,
};

export const InterstitialFullWidth: FC<InterstitialFullWidthProps> = ({
  textColor = 'white-100',
  category,
  title,
  description,
  primaryCta,
  media,
}) => {
  const textClassColor = `text-${textColor}`;
  return (
    <div className={cn(styles.nonSplit)}>
      <DzMedia
        className={cn(styles.mediaContainer)}
        imgClass={cn(styles.image)}
        {...media}
      />
      <div className={cn(styles.contentInfoNonSplit)}>
        {category ? (
          <DzText
            className={cn(styles.category, textClassColor)}
            text={category}
            textSize={TEXT_SIZES.XS}
          />
        ) : null}
        <DzTitle
          classNameTitle={cn(styles.title, textClassColor)}
          title={title}
          titleType={TITLE_TYPES.H2}
          titleSize={TITLE_SIZES.LG}
        ></DzTitle>
        <DzText className={cn(textClassColor)} text={description} />
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

export default InterstitialFullWidth;