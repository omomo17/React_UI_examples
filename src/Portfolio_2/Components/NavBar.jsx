// import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
// import { FaSquareXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaKaggle } from "react-icons/fa";

const NavBar = () => {
  return (
    <nav className="mb-20 flex justify-between items-center py-6">
      <div className="flex flex-shrink-0 items-center"></div>
      <div className="m-8 flex item-center justify-center gap-4 text-3xl">
        <a
          href="https://www.instagram.com/omomo_aa"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
        >
          <FaInstagram className="hover:text-pink-500 transition-colors duration-200" />
        </a>
        <a
          href="https://github.com/omomo17"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
        >
          <FaGithub className="hover:text-gray-600 transition-colors duration-200" />
        </a>

        <a
          href="https://www.kaggle.com/omomo17"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
        >
          <FaKaggle className="hover:text-cyan-500 transition-colors duration-200" />
        </a>
      </div>
    </nav>
  );
};

export default NavBar;
