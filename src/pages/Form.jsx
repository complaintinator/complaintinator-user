import { useContext, useEffect } from "react";
import { AuthContext } from "../Auth";
import { supabase } from "../services/base";
import Dashboardnav from "../components/dashboardNavbar";

function Form() {
  const styler =
    "shadow appearence-none w-3/4 py-2 px-3 text-grey-darker mb-2 border border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-600 text-white rounded shadow-md";

  const { currentStatus } = useContext(AuthContext);

  const submitHandler = (e) => {
    e.preventDefault();
    const { title, description, location } = e.target.elements;

    const submitter = async () => {
      const { data, error } = await supabase.from("complaints").insert([
        {
          title: title.value,
          description: description.value,
          createdBy: currentStatus.uid,
          location: location.value,
        },
      ]);

      console.log(error, data);
    };

    submitter();
  };

  useEffect(() => {
    document.title = "Complaintinator | New Complaint";
  });

  return (
    <section className="relative min-h-screen p-10">
      <Dashboardnav />
      <div className="container mx-auto w-full md:w-1/2 mt-10">
        <form onSubmit={submitHandler}>
          <div className="px-8">
            <div>
              <label className="block text-gray-darker text-md font-bold mb-2 text-white tracking-wider uppercase">
                Title
              </label>
              <input type="text" className={styler} name="title" />
            </div>
            <div className="mt-5">
              <label className="block text-gray-darker text-md font-bold mb-2 text-white tracking-wider uppercase">
                Description
              </label>
              <textarea
                type="text"
                className="shadow appearence-none w-3/4 py-2 px-3 text-grey-darker mb-2 border border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-600 text-white rounded shadow-md h-28"
                name="description"
              ></textarea>
            </div>
            <div className="mt-5">
              <label className="block text-gray-darker text-md font-bold mb-2 text-white tracking-wider uppercase">
                Location
              </label>
              <input type="text" className={styler} name="location" />
            </div>
            <div className="w-3/4 text-center mt-20">
              <button className="text-white text-lg uppercase tracking-wider bg-red-600 px-2 py-3 rounded hover:shadow-lg hover:bg-red-500">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Form;
