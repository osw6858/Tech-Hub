import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
} from "firebase/firestore/lite";
import { useInfiniteQuery } from "react-query";
import { db } from "../../firebase/firebaseConfig";

const useGetAllPosts = () => {
  const { data, fetchNextPage, hasNextPage, status } = useInfiniteQuery(
    ["getAllPosts"],
    getAllPosts,
    {
      staleTime: 4 * 6000,
      getNextPageParam: (lastPage) => {
        return lastPage.lastVisible; //이 반환값이 getAllPosts함수의 매개변수로 전달됨
      },
      //TODO: 성공/실패시 처리 메서드 추가
    }
  );

  async function getAllPosts({ pageParam = null }) {
    let dbQuery = query(
      collection(db, "Posts"),
      orderBy("createdAt", "desc"),
      limit(10)
    );

    if (pageParam) {
      dbQuery = query(
        collection(db, "Posts"),
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
export default useGetAllPosts;
