import { useState, useEffect } from "react";
import { firestoreStorage } from "../services/config";
import Cards from "../components/cards";

function AdminDashboard() {
  const [initData, setData] = useState([]);

  useEffect(() => {
    const loader = async () => {
      try {
        await firestoreStorage.collection("complaints").onSnapshot((snap) => {
          let docs = snap.docs.map((doc) => {
            return {
              ...doc.data(),
              id: doc.id,
            };
          });
          setData(docs);
        });
      } catch (err) {}
    };
    loader();
  }, []);

  return (
    <div className="mt-10 text-white">
      <div className="mt-10">
        {initData.map((instance) => {
          return (
            <section key={instance.title} className="mt-5">
              <Cards instance={instance} />
            </section>
          );
        })}
      </div>
    </div>
  );
}

export default AdminDashboard;
