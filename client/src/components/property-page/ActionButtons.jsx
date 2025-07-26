import React from 'react';

const ActionButtons = ({ handleChat, handleSave, saved }) => (
	<div className="flex justify-between py-2">
		<button
			onClick={handleChat}
			className="flex items-center gap-3 justify-center bg-white border border-accent rounded-md cursor-pointer p-3"
		>
			<img
				src="/chat.png"
				alt=""
				className="w-4 h-4"
			/>
			Send a Message
		</button>
		<button
			onClick={handleSave}
			className="flex items-center bg-white border border-accent rounded-md cursor-pointer p-3 gap-3 justify-center"
			style={{ backgroundColor: saved ? '#ec572a' : 'white' }}
		>
			<img
				src="/save.png"
				alt=""
				className="w-4 h-4"
			/>
			{saved ? 'Place Saved' : 'Save the Place'}
		</button>
	</div>
);

export default ActionButtons;
