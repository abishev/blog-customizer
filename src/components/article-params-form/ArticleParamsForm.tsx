import { clsx } from 'clsx';
import { useEffect, useRef, useState } from 'react';
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
  style: ArticleStateType;
  styleHandler: (selected: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
  style,
  styleHandler,
}: ArticleParamsFormProps): React.JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedStyles, setSelectedStyles] =
    useState<ArticleStateType>(defaultArticleState);
  const rootRef = useRef<HTMLDivElement>(null);

  useOutsideClickClose({
    isOpen,
    rootRef,
    onChange: setIsOpen,
  });

  useEffect(() => {
    if (isOpen) {
      setSelectedStyles(style);
    }
  }, [isOpen, style]);

  const setSelectedStylesHandler = (
    selected: OptionType,
    type: keyof ArticleStateType
  ): void => {
    setSelectedStyles((prev) => ({ ...prev, [type]: selected }));
  };

  const openHandler = (): void => {
    setIsOpen((prev) => !prev);
  };

  const resetHandler = (): void => {
    styleHandler(defaultArticleState);
    setSelectedStyles(defaultArticleState);
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    styleHandler(selectedStyles);
  };

  return (
    <>
      <ArrowButton isOpen={isOpen} onClick={openHandler} />
      <aside
        className={clsx(styles.container, {
          [styles.container_open]: isOpen,
        })}
        ref={rootRef}
      >
        <form className={styles.form} onSubmit={submitHandler}>
          <Text as="h2" size={31} weight={800} uppercase dynamicLite>
            Задайте параметры
          </Text>
          <Select
            selected={selectedStyles.fontFamilyOption}
            options={fontFamilyOptions}
            placeholder="Выберите шрифт"
            onChange={(selected) =>
              setSelectedStylesHandler(selected, 'fontFamilyOption')
            }
            title="шрифт"
          />
          <RadioGroup
            name="radio"
            options={fontSizeOptions}
            selected={selectedStyles.fontSizeOption}
            onChange={(selected) => setSelectedStylesHandler(selected, 'fontSizeOption')}
            title="размер шрифта"
          />
          <Select
            selected={selectedStyles.fontColor}
            options={fontColors}
            placeholder="Выберите цвет шрифта"
            onChange={(selected) => setSelectedStylesHandler(selected, 'fontColor')}
            title="цвет шрифта"
          />
          <Separator />
          <Select
            selected={selectedStyles.backgroundColor}
            options={backgroundColors}
            placeholder="Выберите цвет фона"
            onChange={(selected) =>
              setSelectedStylesHandler(selected, 'backgroundColor')
            }
            title="цвет фона"
          />
          <Select
            selected={selectedStyles.contentWidth}
            options={contentWidthArr}
            placeholder="Выберите ширину контента"
            onChange={(selected) => setSelectedStylesHandler(selected, 'contentWidth')}
            title="ширина контента"
          />
          <div className={styles.bottomContainer}>
            <Button
              title="Сбросить"
              onClick={resetHandler}
              htmlType="reset"
              type="clear"
            />
            <Button title="Применить" htmlType="submit" type="apply" />
          </div>
        </form>
      </aside>
    </>
  );
};
