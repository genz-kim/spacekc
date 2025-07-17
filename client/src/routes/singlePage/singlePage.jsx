import "./singlePage.scss";
import Slider from "../../components/slider/Slider";
import Map from "../../components/map/Map";
import { useNavigate, useLoaderData } from "react-router-dom";
import DOMPurify from "dompurify";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { SocketContext } from "../../context/SocketContext";
import apiRequest from "../../lib/apiRequest";
import { useNotificationStore } from "../../lib/notificationStore";
import AgentSection from '../../components/property-page/AgentSection';

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
		<div className="flex flex-col md:flex-row w-full gap-5 py-6">
			<div className="flex flex-col w-3/4 gap-3">
				<div className="">
					<Slider images={post?.images || []} />
					{/* <div className="info">
						<div className="top">
							<div className="post">
								<h1>{post?.title}</h1>
								<div className="address">
									<img
										src="/pin.png"
										alt=""
									/>
									<span>{post?.address}</span>
								</div>
								<div className="price">ksh {post?.price}</div>
							</div>
							<div className="user">
								<img
									src={post?.user?.avatar}
									alt=""
								/>
								<span>{post?.user?.username}</span>
							</div>
						</div>
						<div
							className="bottom"
							dangerouslySetInnerHTML={{
								__html: DOMPurify.sanitize(post?.postDetail?.desc),
							}}
						></div>
					</div> */}
				</div>
			</div>

			<div className="w-1/4">
				<AgentSection post={post} />
				{/* <div className="listVertical">
            <div className="feature">
              <img src="/utility.png" alt="" />
              <div className="featureText">
                <span>Utilities</span>
                {post?.postDetail?.utilities === "owner" ? (
                  <p>Owner is responsible</p>
                ) : (
                  <p>Tenant is responsible</p>
                )}
              </div>
            </div>
            <div className="feature">
              <img src="/pet.png" alt="" />
              <div className="featureText">
                <span>Pet Policy</span>
                {post?.postDetail?.pet === "allowed" ? (
                  <p>Pets Allowed</p>
                ) : (
                  <p>Pets not Allowed</p>
                )}
              </div>
            </div>
            <div className="feature">
              <img src="/fee.png" alt="" />
              <div className="featureText">
                <span>Income Policy</span>
                <p>{post?.postDetail?.income}</p>
              </div>
            </div>
          </div>
          <p className="title">Sizes</p>
          <div className="sizes">
            <div className="size">
              <img src="/size.png" alt="" />
              <span>{post?.postDetail?.size} sqft</span>
            </div>
            <div className="size">
              <img src="/bed.png" alt="" />
              <span>{post?.bedroom} beds</span>
            </div>
            <div className="size">
              <img src="/bath.png" alt="" />
              <span>{post?.bathroom} bathroom</span>
            </div>
          </div>
          <p className="title">Nearby Places</p>
          <div className="listHorizontal">
            <div className="feature">
              <img src="/school.png" alt="" />
              <div className="featureText">
                <span>School</span>
                <p>
                  {post?.postDetail?.school > 999
                    ? post?.postDetail?.school / 1000 + "km"
                    : post?.postDetail?.school + "m"}{" "}
                  away
                </p>
              </div>
            </div>
            <div className="feature">
              <img src="/pet.png" alt="" />
              <div className="featureText">
                <span>Bus Stop</span>
                <p>{post?.postDetail?.bus}m away</p>
              </div>
            </div>
            <div className="feature">
              <img src="/fee.png" alt="" />
              <div className="featureText">
                <span>Restaurant</span>
                <p>{post?.postDetail?.restaurant}m away</p>
              </div>
            </div>
          </div>
          <p className="title">Location</p>
          <div className="mapContainer">
            <Map items={[post]} />
          </div>
          <div className="buttons">
            <button onClick={handleChat}>
              <img src="/chat.png" alt="" />
              Send a Message
            </button>
            <button
              onClick={handleSave}
              style={{
                backgroundColor: saved ? "#fece51" : "white",
              }}
            >
              <img src="/save.png" alt="" />
              {saved ? "Place Saved" : "Save the Place"}
            </button>
          </div> */}
			</div>
		</div>
	);
}

export default SinglePage;
