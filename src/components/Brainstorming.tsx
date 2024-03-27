import React, { useState } from 'react';
import './Brainstorming.scss';

interface Idea {
	id: number;
	text: string;
	checked: boolean;
}

interface BrainstormingProps {
	title: string;
}

const Brainstorming: React.FC<BrainstormingProps> = ({ title }) => {
	const [ideas, setIdeas] = useState<Idea[]>([]);
	const [newIdea, setNewIdea] = useState('');

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setNewIdea(event.target.value);
	};

	const handleAddIdea = () => {
		if (ideas.length >= 20) return; // Limit to 20 ideas
		if (newIdea.trim() === '') return; // Prevent empty ideas

		const newIdeaObject: Idea = {
			id: Date.now(),
			text: newIdea,
			checked: false,
		};

		setIdeas([...ideas, newIdeaObject]);
		setNewIdea('');
	};

	const handleToggleCheck = (id: number) => {
		const updatedIdeas = ideas.map(idea =>
			idea.id === id ? { ...idea, checked: !idea.checked } : idea,
		);

		setIdeas(updatedIdeas);
	};

	const handleDeleteIdea = (id: number) => {
		const updatedIdeas = ideas.filter(idea => idea.id !== id);
		setIdeas(updatedIdeas);
	};

	return (
		<div className="brainstorming-card">
			<h2 className="brainstorming-title">{title}</h2>
			<div className="brainstorming-list">
				{ideas.map(idea => (
					<div className="brainstorming-item" key={idea.id}>
						<input
							type="checkbox"
							checked={idea.checked}
							onChange={() => handleToggleCheck(idea.id)}
						/>
						<span
							className={idea.checked ? 'idea-text checked' : 'idea-text'}
							onClick={() => handleToggleCheck(idea.id)}
						>
							{idea.text}
						</span>
						<button className="delete-button" onClick={() => handleDeleteIdea(idea.id)}>
							<i className="fas fa-times"></i>
						</button>
					</div>
				))}
			</div>
			<div className="brainstorming-add">
				<input
					type="text"
					value={newIdea}
					onChange={handleInputChange}
					placeholder="Add an idea..."
					maxLength={100}
				/>
				<button onClick={handleAddIdea}>Add</button>
			</div>
		</div>
	);
};

export default Brainstorming;
