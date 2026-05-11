import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Login from "./feature/auth/pages/Login";
import Register from "./feature/auth/pages/Register";
import Homepage from "./feature/auth/pages/Homepage";
import Feed from "./feature/post/pages/Feed";
import Connection from "./feature/post/pages/Connection";
import Sidebar from "./feature/post/pages/Sidebar";
import BottomNav from "./feature/post/pages/BottomNav";
import CreatePost from "./feature/post/pages/CreatePost";

import Profile from "./feature/post/pages/Profile";

function AppRoutes() {
  const location = useLocation();
  const isAuthPage = ["/", "/login", "/register"].includes(location.pathname);

  return (
    <div className={isAuthPage ? "" : "app-container"}>
      {!isAuthPage && <Sidebar />}
      <main className={isAuthPage ? "" : "main-content"}>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/connection" element={<Connection />} />
          <Route path="/createpost" element={<CreatePost />} />
          
          <Route path="/profile" element={<Profile />} />
          
          {/* Mock routes for UI completion */}
          <Route path="/explore" element={<Feed />} /> 
          <Route path="/reels" element={<Feed />} />
          <Route path="/messages" element={<Feed />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      {!isAuthPage && <BottomNav />}
    </div>
  );
}

export default AppRoutes;
