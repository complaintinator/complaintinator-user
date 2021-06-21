import { useEffect, useState } from "react";
import { supabase } from "../services/base";
import Fuse from "fuse.js";
import moment from "moment";

function Admin() {
  const [initData, setData] = useState([]);
  const [initQuery, setQuery] = useState("");
  const [initDrop, setDrop] = useState(false);

  const dropHandler = () => {
    setDrop(true);
  };

  const upHandler = () => {
    setDrop(false);
  };

  useEffect(() => {
    document.title = "Complaintinator | Admin";
    const loader = async () => {
      const { data, error } = await supabase.from("complaints").select("*");

      setData(data);
      if (error) {
        console.log(error);
      }
    };
    loader();
  }, []);

  const fuse = new Fuse(initData, {
    keys: ["id", "title", "email"],
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
    <section className="container mx-auto md:w-2/4 w-4/5">
      <div className="mx-auto container mt-10 md:w-1/2 w-full">
        <input
          placeholder="🔍 Search..."
          className="bg-gray-700 p-3 text-white md:w-full w-full focus:outline-none focus:ring focus:border-blue-300 rounded shadow"
          value={initQuery}
          onChange={searchHandler}
        />
      </div>
      <div className="flex-1 p-10">
        {charecterResults.map((instance) => {
          return (
            <div
              className="w-full rounded-lg shadow-lg p-4 bg-white mb-5"
              key={instance.id}
            >
              <div className="flex justify-between content-center">
                <h3
                  className="font-semibold text-lg tracking-wide cursor-pointer hover:text-blue-400"
                  onClick={dropHandler}
                >
                  {instance.title}
                </h3>
                <p className="text-gray-500 text-sm">
                  {moment(instance.createdOn.toString()).calendar()}
                </p>
              </div>
              {initDrop && (
                <div>
                  <p onClick={upHandler} className="cursor-pointer">
                    🔼
                  </p>
                  <p className="text-black text-lg mt-2 font-semibold">
                    {instance.description}
                  </p>
                </div>
              )}
              <p>Created By : {instance.email}</p>
              {instance.status === false && (
                <p className="bg-red-100 py-2 px-6 rounded-full mt-2 w-28 text-xs">
                  🔴 Active
                </p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Admin;
