import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import { AuthContextProvider } from "./feature/auth/context/auth.context";
import { PostContextprovider } from "./feature/post/context/post.context";

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <PostContextprovider>
          <AppRoutes />
        </PostContextprovider>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
