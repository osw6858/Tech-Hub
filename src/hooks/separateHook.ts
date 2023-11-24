import { useEffect, useState } from "react";

const useSeparate = (content: string) => {
  const [thumbnail, setThumbnail] = useState("");
  const [contents, setContents] = useState("");

  useEffect(() => {
    const extractImageURL = (content: string) => {
      const urlRegex = /!\[.*\]\((https?:\/\/[^ )]*)\)/;
      const match = content.match(urlRegex);
      match ? setThumbnail(match[1]) : null;
    };

    extractImageURL(content);
  }, [content]);

  useEffect(() => {
    const removeImageTags = (content: string) => {
      const regex = /!\[.*\]\(.*\)/g;
      const removeImgContent = content.replace(regex, "");
      setContents(removeImgContent);
    };

    removeImageTags(content);
  }, [content]);

  return { thumbnail, contents };
};

export default useSeparate;
