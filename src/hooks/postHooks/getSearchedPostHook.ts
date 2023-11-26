import { useInfiniteQuery } from "react-query";
import useQueryDebounce from "../useQueryDebounce";
import {
  collection,
  endAt,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  startAt,
} from "firebase/firestore/lite";
import { db } from "../../firebase/firebaseConfig";

const useGetSearchedPostHook = (searchQuery: string) => {
  const debouncedhInput = useQueryDebounce(searchQuery, 500);

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery(
    ["searchedPost", debouncedhInput],
    searchPost,
    {
      enabled: !!debouncedhInput,
      staleTime: 3 * 6000,
      getNextPageParam: (lastPage) => {
        return lastPage.lastVisible;
      },
      //TODO: 성공/실패시 처리 메서드 추가
    }
  );

  async function searchPost({ pageParam = null }) {
    let dbQuery = query(
      collection(db, "Posts"),
      orderBy("title"), // 제목 정렬
      startAt(debouncedhInput),
      endAt(debouncedhInput + "\uf8ff"),
      // \uf8ff 유니코드 범위에서 상당히 높은 코드 포인트이기 때문에 검색하고자 하는 키워드 뒤에 어떠한 문자열이 와도 쿼리 범위 내에 있도록 해주기 때문
      limit(5)
    );

    if (pageParam) {
      dbQuery = query(
        collection(db, "Posts"),
        orderBy("title"), // 제목 정렬
        startAt(debouncedhInput),
        endAt(debouncedhInput + "\uf8ff"),
        startAfter(pageParam),
        limit(5)
      );
    }

    const querySnapshot = await getDocs(dbQuery);
    const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
    const searchedPost = querySnapshot.docs.map((doc) => {
      const postData = doc.data();
      const docID = doc.id;
      return { docID, postData };
    });
    return { searchedPost, lastVisible };
  }

  return { data, fetchNextPage, hasNextPage };
};

export default useGetSearchedPostHook;
