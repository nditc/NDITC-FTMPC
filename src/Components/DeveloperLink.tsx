import Link from "next/link";
import { IoCodeSlash } from "react-icons/io5";

const DeveloperLink = () => {
  return (
    <Link
      href="/developer"
      className="fixed right-1 md:right-0 top-[47vh] rounded-full shadow-[-10px_10px_20px_10px_#00000024] flex items-center justify-center"
    >
      <IoCodeSlash className="w-7 h-7 m-2 hover:rotate-90 transition" />
    </Link>
  );
};

export default DeveloperLink;
