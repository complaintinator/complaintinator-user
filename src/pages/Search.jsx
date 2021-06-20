import { useEffect, useState, useContext } from "react";
import Dashboardnav from "../components/dashboardNavbar";
import Fuse from "fuse.js";
import Cards from "../components/cards";
import { AuthContext } from "../Auth";
import { supabase } from "../services/base";

function Search() {
  const [initData, setData] = useState([]);
  const [initQuery, setQuery] = useState("");
  const { currentStatus } = useContext(AuthContext);

  useEffect(() => {
    document.title = "Complaintinator | Search";
    const loader = async () => {
      let { data: complaints, error } = await supabase
        .from("complaints")
        .select("*")
        .filter("createdBy", "eq", currentStatus.uid);
      setData(complaints);
      if (error) {
        console.log(error);
      }
    };
    loader();
  }, [currentStatus.uid]);

  const fuse = new Fuse(initData, {
    keys: ["title", "description"],
  });

  const results = fuse.search(initQuery);
  const charecterResults = initQuery
    ? results.map((result) => result.item)
    : initData;

  function searchHandler({ currentTarget = {} }) {
    const { value } = currentTarget;
    setQuery(value);
  }

  return (
    <section className="relative min-h-screen p-10">
      <Dashboardnav />
      <div className="mx-auto container mt-10 md:w-1/2 w-full">
        <input
          placeholder="🔍 Search..."
          className="bg-gray-700 p-3 text-white md:w-full w-full focus:outline-none focus:ring focus:border-blue-300 rounded shadow"
          value={initQuery}
          onChange={searchHandler}
        />
      </div>
      <div>
        {charecterResults.map((instance) => {
          return (
            <section key={instance.title} className="mt-5 w-full">
              <Cards instance={instance} />
            </section>
          );
        })}
      </div>
    </section>
  );
}

export default Search;
