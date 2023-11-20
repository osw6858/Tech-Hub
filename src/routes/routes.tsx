import { Route, Routes } from "react-router-dom";
import IndexComponent from "../components/main/IndexComponent";
import AddPost from "../components/post/AddPost";
import PostContent from "../components/post/PostContent";
import UpdatePost from "../components/post/UpdatePost";
import SearchComponent from "../components/SearchComponent";

const RoutesComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<IndexComponent />} />
      <Route path="/add" element={<AddPost />} />
      <Route path="/post/:docId" element={<PostContent />} />
      <Route path="/rewrite/:docId" element={<UpdatePost />} />
      <Route path="/search" element={<SearchComponent />} />
    </Routes>
  );
};

export default RoutesComponent;
