import { useState } from "react";
import Signin from "./pages/Signin";
import Layout from "./layout/layout";
import Profile from "./pages/Profile";
import CreatePost from "./pages/CreatePost";
import Feed from "./pages/Feed";
import Connections from "./pages/Connections";
import Messages from "./pages/Messages";
import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import Discover from "./pages/Discover";
import Chat from "./pages/Chat";

export default function App() {
  const [isSignedIn, setIsSignedIn] = useState(true);

  const { user } = useUser()

  // console.log(user)

  useEffect(() => {
    if (user) {
      setIsSignedIn(true)
    } else {
      setIsSignedIn(false)
    }
  }, [user])

  return (
    <Routes>
      {isSignedIn ? (
        <Route path="/" element={<Layout />}>
          <Route index element={<Feed />} />
          <Route path="discover" element={<Discover />} />
          <Route path="connections" element={<Connections />} />
          <Route path="profile" element={<Profile />} />
          <Route path="messages" element={<Messages />} />
          <Route path="messages/:id" element={<Chat />} />
          <Route path="create-post" element={<CreatePost />} />

        </Route>
      ) : (
        <Route path="/" element={<Signin />} />
      )}
    </Routes>
  );
}
