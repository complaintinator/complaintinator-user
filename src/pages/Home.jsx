import { useEffect } from "react";
import Navbar from "../components/navbar";
import Symbol from "../components/symbol";

function Home() {
  useEffect(() => {
    document.title = "Complaintinator | Home";
  }, []);

  return (
    <main className="mx-auto max-w-6xl">
      <Navbar />
      <Symbol />
    </main>
  );
}

export default Home;
