import { Route, Routes } from "react-router-dom";
import IndexComponent from "../components/IndexComponent";
import AddPost from "../components/post/AddPost";
import PostContent from "../components/post/PostContent";
import UpdatePost from "../components/post/UpdatePost";
import SearchComponent from "../components/common/SearchComponent";
import SingUpComponent from "../components/auth/SingUpComponent";
import MyPageComponent from "../components/mypage/MypageComponent";
import ScrollToTop from "./scrollTop";
import ResetPasswordComponent from "../components/auth/ResetPasswordComponent";

const RoutesComponent = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<IndexComponent />} />
        <Route path="/add" element={<AddPost />} />
        <Route path="/post/:docId" element={<PostContent />} />
        <Route path="/rewrite/:docId" element={<UpdatePost />} />
        <Route path="/search" element={<SearchComponent />} />
        <Route path="/singup" element={<SingUpComponent />} />
        <Route path="/mypage" element={<MyPageComponent />} />
        <Route path="/reset" element={<ResetPasswordComponent />} />
      </Routes>
    </>
  );
};

export default RoutesComponent;
