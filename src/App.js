import styles from './app.module.css';
import { useState } from 'react';
import data from './data.json';

export const App = () => {
	// не стал использовать второе состояние steps так как setSteps в дальнейшем нам не пригодилось, использовал data чтобы избавиться от лишних переменных
	const [activeIndex, setActiveIndex] = useState(0);

	const firstStep = activeIndex === 0;
	const lastStep = activeIndex === data.length - 1;

	const goBack = () => {
		if (!firstStep) {
			setActiveIndex(activeIndex - 1);
		}
	};

	const goForvard = () => {
		if (!lastStep) {
			setActiveIndex(activeIndex + 1);
		} else {
			startOver();
		}
	};

	const startOver = () => {
		setActiveIndex(0);
	};

	return (
		<div className={styles.container}>
			<div className={styles.card}>
				<h1>Инструкция по готовке пельменей</h1>
				<div className={styles.steps}>
					<div className={styles['steps-content']}>
						{data[activeIndex].content}
					</div>
					<ul className={styles['steps-list']}>
						{data.map((step, index) => (
							<li
								key={index}
								className={`${styles['steps-item']} ${
									index <= activeIndex
										? styles.done
										: ''
								} ${index === activeIndex ? styles.active : ''}`}
							>
								<button
									className={
										styles['steps-item-button']
									}
									onClick={() =>
										setActiveIndex(index)
									}
								>
									{index + 1}
								</button>
								{step.title}
							</li>
						))}
					</ul>
					<div className={styles['buttons-container']}>
						<button
							className={styles.button}
							onClick={goBack}
							disabled={firstStep}
						>
							Назад
						</button>
						<button
							className={styles.button}
							onClick={goForvard}
						>
							{lastStep ? 'Начать сначала' : 'Далее'}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
