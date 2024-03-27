import React, { FC, useEffect, useState } from 'react';
import './Brainstorming.scss';

import { IBrainstorming } from 'domain/models/brainstorming';

import OneText from 'components/core/OneText';
import Card from 'components/core/Card';
import Button from 'components/core/Button';
import remove from 'assets/error.svg';
import Add from 'components/core/Add';

type BrainstormingProps = {
	data: IBrainstorming;
};

const Brainstorming: FC<BrainstormingProps> = ({ data }) => {
	const [brainstorming, setBrainstorming] = useState<IBrainstorming>(data);

	const [emptyOne, setEmptyOne] = useState<boolean>(false);

	const [newIdea, setNewIdea] = useState<string>('');

	useEffect(() => {
		const limitedIdeas = brainstorming.ideas.length >= 20;
		setEmptyOne(!limitedIdeas);
		return;
	}, [brainstorming]);

	const handleChange = (value: string, name: string) => {
		setBrainstorming(brain => ({ ...brain, name: value }));
	};

	const handleNewIdea = (value: string) => {
		setNewIdea(value);
		setEmptyOne(!!value);
	};

	// const ideaValidation = () => {
	// 	console.log('validating');
	// };

	const handleIdeas = (index?: number) => {
		const newIdeas: string[] = brainstorming.ideas;
		index ? newIdeas.splice(1, index) : newIdeas.push(newIdea);
		setBrainstorming(brain => ({ ...brain, ideas: newIdeas }));
	};

	return (
		<Card
			key={data.id}
			id={data.id}
			className="brainstorming"
			// status={!adding ? needStatus : completed ? CardStatus.editing : CardStatus.new}
			// onRemove={() => removeNeed && removeNeed(need)}
			// onSave={save}
		>
			<div className="brainstorming_name">
				<OneText
					className="subtitles"
					name="name"
					placeholder="Título"
					value={brainstorming.goal}
					onChange={value => handleChange(value, 'name')}
					max={30}
				/>
			</div>
			<div className="brainstorming_ideas">
				{brainstorming.ideas.map((idea, index) => (
					<div key={idea} className="brainstorming_ideas_item">
						{idea}
						<img
							className="brainstorming_ideas_item--remove"
							onClick={() => handleIdeas(index)}
							src={remove}
							alt="delete_button"
						/>
					</div>
				))}
				{brainstorming.ideas.length <= 20 && (
					<div className="brainstorming_ideas_item">
						<OneText
							className="values"
							name="name"
							placeholder="NUEVA IDEA"
							max={30}
							onChange={handleNewIdea}
						/>
						<Add onClick={handleIdeas} disabled={!emptyOne} />
					</div>
				)}
			</div>
		</Card>
	);
};

export default Brainstorming;
