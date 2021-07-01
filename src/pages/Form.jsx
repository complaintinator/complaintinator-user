import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { AuthContext } from "../Auth";
import { supabase } from "../services/base";
import Dashboardnav from "../components/dashboardNavbar";
import Message from "../components/message";

function Form() {
  const styler =
    "shadow appearence-none w-3/4 py-2 px-3 text-grey-darker mb-2 border border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-600 text-white rounded shadow-md";

  const [initMessage, setMessage] = useState(false);
  const history = useHistory();

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
          email: currentStatus.email,
        },
      ]);

      setMessage(true);

      setTimeout(() => {
        history.push("/dashboard");
      }, 2000);
    };

    submitter();
  };

  useEffect(() => {
    document.title = "Complaintinator | New Complaint";
  });

  return (
    <section className="p-10">
      <Dashboardnav />
      <div className="container md:w-1/2 w-full mx-auto mt-20">
        {initMessage && <Message />}
        <form onSubmit={submitHandler}>
          <div className="px-8">
            <div>
              <label className="block text-gray-darker text-md font-bold mb-2 text-white tracking-wider uppercase">
                Title
              </label>
              <input type="text" className={styler} name="title" required />
            </div>
            <div className="mt-5">
              <label className="block text-gray-darker text-md font-bold mb-2 text-white tracking-wider uppercase">
                Description
              </label>
              <textarea
                type="text"
                className="shadow appearence-none w-3/4 py-2 px-3 text-grey-darker mb-2 border border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-600 text-white rounded shadow-md h-28"
                name="description"
                required
              ></textarea>
            </div>
            <div className="mt-5">
              <label className="block text-gray-darker text-md font-bold mb-2 text-white tracking-wider uppercase">
                Location
              </label>
              <input type="text" className={styler} name="location" required />
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
