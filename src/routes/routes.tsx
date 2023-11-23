import { Route, Routes } from "react-router-dom";
import IndexComponent from "../components/IndexComponent";
import AddPost from "../components/post/AddPost";
import PostContent from "../components/post/PostContent";
import UpdatePost from "../components/post/UpdatePost";
import SearchComponent from "../components/SearchComponent";
import SingUpComponent from "../components/auth/SingUpComponent";

const RoutesComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<IndexComponent />} />
      <Route path="/add" element={<AddPost />} />
      <Route path="/post/:docId" element={<PostContent />} />
      <Route path="/rewrite/:docId" element={<UpdatePost />} />
      <Route path="/search" element={<SearchComponent />} />
      <Route path="/singup" element={<SingUpComponent />} />
    </Routes>
  );
};

export default RoutesComponent;
