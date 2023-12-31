import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore/lite";
import { useInfiniteQuery } from "react-query";
import { db } from "../../firebase/firebaseConfig";

const useGetMyPost = (uid: string) => {
  const { data, fetchNextPage, hasNextPage, status } = useInfiniteQuery(
    ["getMyPosts", uid],
    getAllPosts,
    {
      staleTime: 5 * 6000,
      getNextPageParam: (lastPage) => {
        return lastPage.lastVisible; //이 반환값이 getAllPosts함수의 매개변수로 전달됨
      },
      //TODO: 성공/실패시 처리 메서드 추가
    }
  );

  async function getAllPosts({ pageParam = null }) {
    let dbQuery = query(
      collection(db, "Posts"),
      where("uid", "==", uid),
      orderBy("createdAt", "desc"),
      limit(20)
    );

    if (pageParam) {
      dbQuery = query(
        collection(db, "Posts"),
        where("uid", "==", uid),
        orderBy("createdAt", "desc"),
        startAfter(pageParam),
        limit(5)
      );
    }

    const querySnapshot = await getDocs(dbQuery);
    const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
    const posts = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return { docID: doc.id, postData: data };
    });

    return { posts, lastVisible };
  }

  return { data, fetchNextPage, hasNextPage, status };
};

export default useGetMyPost;
