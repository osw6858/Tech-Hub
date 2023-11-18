import styled, { ThemeProvider } from "styled-components";
import GlobalStyle from "./styles/GlobalStyle";
import { useAppSelector } from "./hooks/dispatchHook";
import { darkTheme, whiteTheme } from "./styles/Theme";
import HeaderComponent from "./components/common/HeaderComponent";
import { Route, Routes } from "react-router-dom";
import IndexComponent from "./components/main/IndexComponent";
import AddPost from "./components/post/AddPost";
import FooterComponent from "./components/common/FooterComponenet";
import PostContent from "./components/post/PostContent";
import UpdatePost from "./components/post/UpdatePost";

function App() {
  const theme = useAppSelector((state) => state.theme);
  return (
    <ThemeProvider theme={theme.dark ? darkTheme : whiteTheme}>
      <GlobalStyle />
      <Wrapper>
        <Container>
          <HeaderComponent />

          <Main>
            <Routes>
              <Route path="/" element={<IndexComponent />} />
              <Route path="/add" element={<AddPost />} />
              <Route path="/post/:docId" element={<PostContent />} />
              <Route path="/rewrite/:docId" element={<UpdatePost />} />
            </Routes>
          </Main>
        </Container>
        <FooterComponent />
      </Wrapper>
    </ThemeProvider>
  );
}

export default App;

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
  transition: all 0.3s;
  min-width: 28rem;
  height: 100%;
  min-height: 100%;
`;

const Container = styled.div`
  width: 65%;
  height: 100%;
  margin: 0 auto;

  @media ${(props) => props.theme.laptop} {
    width: 80%;
  }

  @media ${(props) => props.theme.tablet} {
    width: 95%;
  }

  @media ${(props) => props.theme.mobile} {
    width: 95%;
  }
`;

const Main = styled.main`
  height: 100%;
  width: 100%;
  min-height: calc(100vh - 42.6rem);
  margin: 5rem 0 5rem 0;

  @media ${(props) => props.theme.mobile} {
    margin: 0rem;
  }
`;
