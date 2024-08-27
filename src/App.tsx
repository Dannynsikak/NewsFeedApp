import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useAppSelector } from "./app/hooks";
import { Navbar } from "./components/Navbar";
import { LoginPage } from "./features/auth/LoginPage";
import {
  // PostList,
  // AddPostForm,
  ViewPost,
  EditPostForm,
} from "./features/posts/index";
import {} from "./features/posts/ViewPost";
import { selectCurrentUsername } from "./features/auth/authSlice";
import { PostsMainPage } from "./features/posts/PostMainPage";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const username = useAppSelector(selectCurrentUsername);

  if (!username) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <Routes>
                  <Route path="/posts" element={<PostsMainPage />} />
                  <Route path="/posts/:postId" element={<ViewPost />} />
                  <Route path="/editPost/:postId" element={<EditPostForm />} />
                </Routes>
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
