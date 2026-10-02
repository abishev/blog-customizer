import { clsx } from 'clsx';
import { useState } from 'react';

import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import { Article } from '../article/Article';
import { defaultArticleState } from './../../constants/articleProps';

import type { ArticleStateType } from './../../constants/articleProps';
import type { CSSProperties } from 'react';

import styles from './app.module.scss';

export const App = (): React.JSX.Element => {
  const [style, setStyle] = useState<ArticleStateType>(defaultArticleState);

  const styleHandler = (selected: ArticleStateType): void => {
    setStyle(selected);
  };

  return (
    <main
      className={clsx(styles.main)}
      style={
        {
          '--font-family': style.fontFamilyOption.value,
          '--font-size': style.fontSizeOption.value,
          '--font-color': style.fontColor.value,
          '--bg-color': style.backgroundColor.value,
          '--container-width': style.contentWidth.value,
        } as CSSProperties
      }
    >
      <ArticleParamsForm style={style} styleHandler={styleHandler} />
      <Article />
    </main>
  );
};
