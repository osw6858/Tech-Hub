import styled from "styled-components";
import CardComponent from "./CardComponent";
import { useQuery } from "react-query";
import { collection, getDocs } from "firebase/firestore/lite";
import { db } from "../../firebase/firebaseConfig";

const IndexComponent = () => {
  const query = useQuery("getAllPost", getAllPost);

  async function getAllPost() {
    try {
      const docRef = collection(db, "Posts");

      const docSnap = await getDocs(docRef);

      if (!docSnap.empty) {
        const postData = docSnap.docs;
        return postData.map((doc) => {
          const docId = doc.id;
          const postData = doc.data();
          return {
            docId,
            postData,
          };
        });
      }
    } catch (error) {
      throw new Error(`오류가 발생했습니다. ${error}`);
    }
  }

  const postData = query.data;

  return (
    <Container>
      {postData?.map((post) => (
        <CardComponent
          key={post.docId}
          content={post.postData.content}
          // name={post.postData.displayName}
          title={post.postData.title}
          docId={post.docId}
          createdAt={post.postData.createdAt}
        />
      ))}
    </Container>
  );
};

export default IndexComponent;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 2rem;

  @media ${(props) => props.theme.laptop} {
    grid-template-columns: repeat(3, 1fr);
  }

  @media ${(props) => props.theme.tablet} {
    grid-template-columns: repeat(2, 1fr);
  }

  @media ${(props) => props.theme.mobile} {
    grid-template-columns: repeat(1, 1fr);
  }
`;
