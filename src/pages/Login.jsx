import React, { useCallback, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { withRouter, Redirect } from "react-router";
import { firebaseAuth } from "../services/config";
import { AuthContext } from "../Auth";
import { useState } from "react";

function Login({ history }) {
  useEffect(() => {
    document.title = "Complaintinator | Login";
  }, []);

  const styler =
    "shadow appearence-none w-full py-2 px-3 text-grey-darker mb-2 border border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-white";

  const [initMessage, setMessage] = useState(null);

  const loginHandler = useCallback(
    async (e) => {
      e.preventDefault();
      const { email, password } = e.target.elements;
      try {
        await firebaseAuth.signInWithEmailAndPassword(
          email.value,
          password.value
        );
        history.push("/dashboard");
      } catch (error) {
        setMessage(error.message);
      }
    },
    [history]
  );

  const { currentStatus } = useContext(AuthContext);

  if (currentStatus) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <section className="md:w-1/4 w-4/5 mx-auto mt-20">
      <form onSubmit={loginHandler}>
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
          <button className="bg-blue-500 text-white mt-5 px-4 py-3 hover:bg-blue-400">
            Continue
          </button>
          <p className="mt-10 text-center text-white">
            New ? |{" "}
            <Link
              to="/auth/register"
              className="text-blue-500 hover:text-blue-300"
            >
              Register
            </Link>
          </p>
        </div>
      </form>
    </section>
  );
}

export default withRouter(Login);
