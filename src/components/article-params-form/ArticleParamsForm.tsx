import { ArrowButton } from '../../ui/arrow-button';
import { Button } from '../../ui/button';
import { FormEvent, useRef, useState } from 'react';
import { useOutsideClickClose } from '../../ui/select/hooks/useOutsideClickClose';
import { useClose } from './hooks/useClose';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from '../../constants/articleProps';
import { Select } from '../../ui/select/Select';
import { Text } from '../../ui/text/Text';
import { Separator } from '../../ui/separator';
import { RadioGroup } from '../../ui/radio-group';
import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';
interface ArticleParamsFormProps {
	articleState: ArticleStateType;
	setArticleState: (param: ArticleStateType) => void;
}

export const ArticleParamsForm = ({
	articleState,
	setArticleState,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [formState, setFormState] = useState({
		fontFamily: articleState.fontFamilyOption,
		fontSize: articleState.fontSizeOption,
		fontColor: articleState.fontColor,
		backgroundColor: articleState.backgroundColor,
		contentWidth: articleState.contentWidth,
	});

	const rootRef = useRef<HTMLDivElement | null>(null);
	const formRef = useRef<HTMLFormElement>(null);

	useOutsideClickClose({
		isOpen,
		rootRef,
		onClose: () => setIsOpen(false),
		onChange: setIsOpen,
	});

	useClose({
		isOpen: isOpen,
		onClose: () => setIsOpen(false),
		rootRef: formRef,
	});

	const formResetHandler = () => {
		setFormState((prevState) => ({
			...prevState,
			fontFamily: defaultArticleState.fontFamilyOption,
			fontSize: defaultArticleState.fontSizeOption,
			fontColor: defaultArticleState.fontColor,
			backgroundColor: defaultArticleState.backgroundColor,
			contentWidth: defaultArticleState.contentWidth,
		}));

		setArticleState(defaultArticleState);
	};

	const formSubmitHandler = (evt: FormEvent) => {
		evt.preventDefault();

		setArticleState({
			...formState,
			fontFamilyOption: formState.fontFamily,
			fontSizeOption: formState.fontSize,
			fontColor: formState.fontColor,
			backgroundColor: formState.backgroundColor,
			contentWidth: formState.contentWidth,
		});

		setIsOpen(!isOpen);
	};
	return (
		<>
			<ArrowButton onClick={() => setIsOpen(!isOpen)} isMenuOpen={isOpen} />

			<aside
				className={clsx(styles.container, isOpen && styles.container_open)}
				ref={rootRef}>
				<form
					className={styles.form}
					onSubmit={formSubmitHandler}
					onReset={formResetHandler}
					ref={formRef}>
					<Text as={'h2'} size={25} weight={800} uppercase={true}>
						Задайте параметры
					</Text>
					<Select
						title='Шрифт'
						selected={formState.fontFamily}
						options={fontFamilyOptions}
						onChange={(selectedOption) =>
							setFormState((prevState) => ({
								...prevState,
								fontFamily: selectedOption,
							}))
						}
					/>
					<RadioGroup
						title='Размер шрифта'
						name='fontSize'
						options={fontSizeOptions}
						selected={formState.fontSize}
						onChange={(selectedOption) =>
							setFormState((prevState) => ({
								...prevState,
								fontSize: selectedOption,
							}))
						}
					/>
					<Select
						title='Цвет текста'
						selected={formState.fontColor}
						options={fontColors}
						onChange={(selectedOption) =>
							setFormState((prevState) => ({
								...prevState,
								fontColor: selectedOption,
							}))
						}
					/>
					<Separator />
					<Select
						title='Цвет фона'
						selected={formState.backgroundColor}
						options={backgroundColors}
						onChange={(selectedOption) =>
							setFormState((prevState) => ({
								...prevState,
								backgroundColor: selectedOption,
							}))
						}
					/>
					<Select
						title='Ширина контента'
						selected={formState.contentWidth}
						options={contentWidthArr}
						onChange={(selectedOption) =>
							setFormState((prevState) => ({
								...prevState,
								contentWidth: selectedOption,
							}))
						}
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
