import { FiYoutube } from "react-icons/fi";
import { FaInstagram } from "react-icons/fa";
import { IoDocumentTextOutline, IoImageOutline } from "react-icons/io5";
import { RiFolderVideoLine } from "react-icons/ri";
import { TbMusic } from "react-icons/tb";

export const media = [
  {
    id: 1,
    icon: FiYoutube, // ✅ Pass the component, not JSX
    color: "#F05A5A",
    name: "YouTube",
    desc: "Convert YouTube videos to MP3, MP4, or other formats",
    path: "/"
  },
  {
    id: 2,
    icon: FaInstagram,
    color: "#EF6AAC",
    name: "Instagram",
    desc: "Download and convert Instagram reels and posts",
    path: "/"
  },
  {
    id: 3,
    icon: IoDocumentTextOutline,
    color: "#6EA2F8",
    name: "Documents",
    desc: "Convert between PDF, DOCX, TXT, and more types of files",
    path: "/"
  },
  {
    id: 4,
    icon: IoImageOutline,
    color: "#3AC597",
    name: "Images",
    desc: "Convert between JPG, PNG, WebP, and other formats",
    path: "/"
  },
  {
    id: 5,
    icon: TbMusic,
    color: "#A856F7",
    name: "Audio",
    desc: "Convert between MP3, WAV, FLAC, and more types formats",
    path: "/"
  },
  {
    id: 6,
    icon: RiFolderVideoLine,
    color: "#8284F3",
    name: "Videos",
    desc: "Convert between MP4, AVI, MKV, and other formats",
    path: "/"
  }
];
