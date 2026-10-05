import { clsx } from 'clsx';
import { useRef, useState } from 'react';
import {
  backgroundColors,
  contentWidthArr,
  defaultArticleState,
  fontColors,
  fontFamilyOptions,
  fontSizeOptions,
} from 'src/constants/articleProps';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';

import type { ArticleStateType, OptionType } from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
  applyArticleStyles: (selected: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
  applyArticleStyles,
}: ArticleParamsFormProps): React.JSX.Element => {
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [selectedStyles, setSelectedStyles] =
    useState<ArticleStateType>(defaultArticleState);
  const formRef = useRef<HTMLDivElement>(null);

  useOutsideClickClose({
    isOpen: isFormOpen,
    rootRef: formRef,
    onChange: setIsFormOpen,
  });

  const updateSelectedStyle = (
    selected: OptionType,
    type: keyof ArticleStateType
  ): void => {
    setSelectedStyles((prev) => ({ ...prev, [type]: selected }));
  };

  const toggleForm = (): void => {
    setIsFormOpen((prev) => !prev);
  };

  const resetForm = (): void => {
    applyArticleStyles(defaultArticleState);
    setSelectedStyles(defaultArticleState);
  };

  const submitForm = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    applyArticleStyles(selectedStyles);
  };

  return (
    <>
      <ArrowButton isOpen={isFormOpen} onClick={toggleForm} />
      <aside
        className={clsx(styles.container, {
          [styles.container_open]: isFormOpen,
        })}
        ref={formRef}
      >
        <form className={styles.form} onSubmit={submitForm} onReset={resetForm}>
          <Text as="h2" size={31} weight={800} uppercase dynamicLite>
            Задайте параметры
          </Text>
          <Select
            selected={selectedStyles.fontFamilyOption}
            options={fontFamilyOptions}
            placeholder="Выберите шрифт"
            onChange={(selected) => updateSelectedStyle(selected, 'fontFamilyOption')}
            title="шрифт"
          />
          <RadioGroup
            name="radio"
            options={fontSizeOptions}
            selected={selectedStyles.fontSizeOption}
            onChange={(selected) => updateSelectedStyle(selected, 'fontSizeOption')}
            title="размер шрифта"
          />
          <Select
            selected={selectedStyles.fontColor}
            options={fontColors}
            placeholder="Выберите цвет шрифта"
            onChange={(selected) => updateSelectedStyle(selected, 'fontColor')}
            title="цвет шрифта"
          />
          <Separator />
          <Select
            selected={selectedStyles.backgroundColor}
            options={backgroundColors}
            placeholder="Выберите цвет фона"
            onChange={(selected) => updateSelectedStyle(selected, 'backgroundColor')}
            title="цвет фона"
          />
          <Select
            selected={selectedStyles.contentWidth}
            options={contentWidthArr}
            placeholder="Выберите ширину контента"
            onChange={(selected) => updateSelectedStyle(selected, 'contentWidth')}
            title="ширина контента"
          />
          <div className={styles.bottomContainer}>
            <Button title="Сбросить" htmlType="reset" type="clear" />
            <Button title="Применить" htmlType="submit" type="apply" />
          </div>
        </form>
      </aside>
    </>
  );
};
