import React, { FC } from 'react';
import { TITLE_SIZES, TITLE_TYPES } from '../../atoms';
import { cn } from '../../utils/classnames';
import { DzTitleSection, DzTitleSectionProps } from './DzTitleSection';

const styles: any = {
  title: `
    md:text-xl
  `,
};

const DEFAULT_TITLE_PROPS = {
  titleType: TITLE_TYPES.P,
  titleSize: TITLE_SIZES.MD,
  subtitleSize: TITLE_SIZES.MD,
  subtitleType: TITLE_TYPES.P,
  classNameTitle: cn(styles.title),
  classNameSubtitle: cn(styles.title),
};

export const DzTitleMol: FC<DzTitleSectionProps> = props => {
  return (
    <DzTitleSection
      {...props}
      titleProps={{ ...DEFAULT_TITLE_PROPS, ...(props.titleProps ?? {}) }}
    />
  );
};

export default DzTitleMol;