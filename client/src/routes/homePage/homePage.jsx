import { useEffect, useState } from "react";
import SearchBar from "../../components/searchBar/SearchBar";
import "./homePage.scss";

function HomePage() {
  const [hideScrollbar, setHideScrollbar] = useState(true);

  useEffect(() => {
    let timeout;

    const handleScroll = () => {
      setHideScrollbar(false); // Show scrollbar when scrolling
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setHideScrollbar(true); // Hide scrollbar after 1.5s of inactivity
      }, 1500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeout);
    };
  }, []);

  return (
		<div className={`homePage ${hideScrollbar ? 'hide-scrollbar' : ''}`}>
			<div className="textContainer">
				<div className="wrapper">
					<h1 className="text-secondary text-5xl">
						Seek your dream apartment. Your perfect home awaits!
					</h1>
					<p className="text-accent">Find your ideal home with ease...</p>
					<SearchBar />
					<div className="boxes">
						<div className="box">
							<h1>16+</h1>
							<h2>Years of Experience</h2>
						</div>
						<div className="box">
							<h1>200</h1>
							<h2>Award Gained</h2>
						</div>
						<div className="box">
							<h1>2000+</h1>
							<h2>Property Ready</h2>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default HomePage;
