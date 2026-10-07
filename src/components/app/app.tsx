import { clsx } from 'clsx';
import { useState } from 'react';

import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import { Article } from '../article/Article';
import { defaultArticleState } from './../../constants/articleProps';

import type { ArticleStateType } from './../../constants/articleProps';
import type { CSSProperties } from 'react';

import styles from './app.module.scss';

export const App = (): React.JSX.Element => {
  const [articleStyles, setArticleStyles] =
    useState<ArticleStateType>(defaultArticleState);

  const applyArticleStyles = (selected: ArticleStateType): void => {
    setArticleStyles(selected);
  };

  return (
    <main
      className={clsx(styles.main)}
      style={
        {
          '--font-family': articleStyles.fontFamilyOption.value,
          '--font-size': articleStyles.fontSizeOption.value,
          '--font-color': articleStyles.fontColor.value,
          '--bg-color': articleStyles.backgroundColor.value,
          '--container-width': articleStyles.contentWidth.value,
        } as CSSProperties
      }
    >
      <ArticleParamsForm applyArticleStyles={applyArticleStyles} />
      <Article />
    </main>
  );
};
