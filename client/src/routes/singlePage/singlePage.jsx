import "./singlePage.scss";
import Slider from '../../components/slider/Slider';
import { useNavigate, useLoaderData } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { SocketContext } from '../../context/SocketContext';
import apiRequest from '../../lib/apiRequest';
import { useNotificationStore } from '../../lib/notificationStore';
import AgentSection from '../../components/property-page/AgentSection';
import PropertyDetails from '../../components/property-page/PropertyDetails';
import SimilarProperties from '../../components/property-page/SimilarProperties';

function SinglePage() {
	const post = useLoaderData();
	const { currentUser } = useContext(AuthContext);
	const [saved, setSaved] = useState(post?.isSaved || false); // Default to false if post is not available
	const { socket } = useContext(SocketContext);
	const [chat, setChat] = useState(null);
	const navigate = useNavigate();
	const recieverID = post?.userId; // Optional chaining to prevent errors when currentUser or post is null
	const decrease = useNotificationStore((state) => state.decrease);

	// Remove the login check here for SinglePage
	const checkAuthentication = () => {
		return true; // Skip authentication for SinglePage
	};

	useEffect(() => {
		if (!post) return; // If post is not available, do not proceed

		const fetchChats = async () => {
			try {
				const res = await apiRequest.get('/chats');
				const chats = res.data;
				const existingChat = chats.find(
					(chat) =>
						chat.userIDs.includes(currentUser?.id) &&
						chat.userIDs.includes(recieverID)
				);
				if (existingChat) {
					setChat(existingChat);
				} else {
					const res = await apiRequest.post('/chats', {
						userIDs: [currentUser?.id, recieverID],
					});
					setChat(res.data);
				}
			} catch (err) {
				console.log(err);
			}
		};
		fetchChats();
	}, [post, currentUser?.id, recieverID]);

	const handleChat = async () => {
		if (!checkAuthentication()) return;

		if (chat) {
			handleOpenChat(chat.id, post?.user);
		} else {
			const res = await apiRequest.post('/chats', {
				userIDs: [currentUser?.id, recieverID],
			});
			setChat(res.data);
			handleOpenChat(res.data.id, post?.user);
		}
	};

	const handleOpenChat = async (id, receiver) => {
		try {
			const res = await apiRequest.get('/chats/' + id);
			if (!res.data.seenBy.includes(currentUser.id)) {
				decrease();
			}
			setChat({ ...res.data, receiver });
		} catch (err) {
			console.log(err);
		}
	};

	const handleSave = async () => {
		if (!checkAuthentication()) return;

		setSaved((prev) => !prev);
		try {
			await apiRequest.post('/users/save', { postId: post?.id });
		} catch (err) {
			console.log(err);
			setSaved((prev) => !prev);
		}
	};

	if (!post) {
		return <p>Loading...</p>;
	}

	return (
		<div className="flex flex-col w-full gap-5 py-6">
			<div className="w-full flex flex-col md:flex-row gap-4">
				<div className="w-full md:w-3/4">
					<Slider images={post?.images || []} />
				</div>
				<div className="w-full md:w-1/4">
					<AgentSection post={post} />
				</div>
			</div>

			<div className="">
				<PropertyDetails
					post={post}
					handleChat={handleChat}
					handleSave={handleSave}
					saved={saved}
				/>
			</div>
			<SimilarProperties />
		</div>
	);
}

export default SinglePage;
