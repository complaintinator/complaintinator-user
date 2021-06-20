import { useContext, useEffect, useState } from "react";
import Dashboardnav from "../components/dashboardNavbar";
import Cards from "../components/cards";
import { AuthContext } from "../Auth";
import { supabase } from "../services/base";

function Dashboard() {
  const [initData, setData] = useState([]);
  const { currentStatus } = useContext(AuthContext);

  useEffect(() => {
    document.title = "Complaintinator | Dashboard";
    const loader = async () => {
      const { data, error } = await supabase
        .from("complaints")
        .select("*")
        .filter("createdBy", "eq", currentStatus.uid);
      setData(data);
      if (error) {
        console.log(error);
      }
    };

    loader();
  }, [currentStatus.uid]);

  return (
    <main>
      <div className="relative min-h-screen">
        <div className="flex-1 p-10 font-bold">
          <Dashboardnav />
          {initData.length === 0 && (
            <p className="mt-10 text-center text-white">Loading...</p>
          )}
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
      </div>
    </main>
  );
}

export default Dashboard;
