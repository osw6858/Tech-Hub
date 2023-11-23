import { useEffect, useState } from "react";

const useSeparate = (content: string) => {
  const [sumNail, setSumNail] = useState("");
  const [contents, setContents] = useState("");

  useEffect(() => {
    const extractImageURL = (content: string) => {
      const urlRegex = /!\[.*\]\((https?:\/\/[^ ]*)\)/;
      const match = content.match(urlRegex);
      match ? setSumNail(match[1]) : null;
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

  return { sumNail, contents };
};

export default useSeparate;
