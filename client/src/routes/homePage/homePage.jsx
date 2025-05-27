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
			{/* <SearchBar /> */}
		</div>
	);
}

export default HomePage;
