import { useCallback, useEffect, useState } from "react";
import { withRouter } from "react-router";
import { firebaseAuth } from "../services/config";

function Register({ history }) {
  useEffect(() => {
    document.title = "Complaintinator | Register";
  }, []);

  const [initMessage, setMessage] = useState(null);

  const styler =
    "shadow appearence-none w-full py-2 px-3 text-grey-darker mb-2 border border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-white";

  const registerHandler = useCallback(
    async (e) => {
      e.preventDefault();
      const { employeeid, email, password, confirmpassword } =
        e.target.elements;
      console.log(employeeid.value);
      try {
        if (password.value === confirmpassword.value) {
          await firebaseAuth.createUserWithEmailAndPassword(
            email.value,
            password.value
          );
          history.push("/dashboard");
        } else {
          setMessage("Passwords does not match !");
        }
      } catch (error) {
        setMessage(error.message);
      }
    },
    [history]
  );

  return (
    <section className="md:w-1/4 w-4/5 mx-auto mt-20">
      <form onSubmit={registerHandler}>
        <div className="rounded px-8 pt-6 pb-8 mb-4 flex flex-col backdrop-filter backdrop-blur-lg bg-opacity-30 bg-gray-500">
          <p className="bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-yellow-500 text-lg md:text-2xl mt-1 text-center font-bold mb-5">
            Complaintinator
          </p>
          {initMessage != null && (
            <p className="mt-5 mb-5 text-white bg-red-600 p-2 border-2 border-red-500">
              {initMessage}
            </p>
          )}
          <div className="mb-4">
            <label className="block text-gray-darker text-sm font-bold mb-2 text-white">
              Employee ID
            </label>
            <input className={styler} type="text" name="employeeid" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-darker text-sm font-bold mb-2 text-white">
              Email
            </label>
            <input className={styler} type="email" name="email" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-darker text-sm font-bold mb-2 text-white">
              Password
            </label>
            <input className={styler} type="password" name="password" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-darker text-sm font-bold mb-2 text-white">
              Confirm password
            </label>
            <input className={styler} type="password" name="confirmpassword" />
          </div>
          <button className="bg-blue-500 text-white mt-5 px-4 py-3 hover:bg-blue-400">
            Continue
          </button>
        </div>
      </form>
    </section>
  );
}

export default withRouter(Register);
