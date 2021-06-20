import { useState } from "react";
import up from "../icons/up.png";
import moment from "moment";

function Cards({ instance }) {
  const [initDrop, setDrop] = useState(false);

  const clickHandler = () => {
    setDrop(true);
  };

  const upHandler = () => {
    setDrop(false);
  };

  return (
    <div className="md:container md:mx-auto flex justify-center">
      <section className="p-5 w-full md:w-1/2 block bg-gray-700">
        <p
          className="text-white text-3xl font-bold cursor-pointer hover:text-blue-400"
          onClick={clickHandler}
        >
          {instance.title}
        </p>
        {instance.createdOn && (
          <p className="mt-2 text-gray-200 font-light text-sm">
            {moment(instance.createdOn.toString()).calendar()}
          </p>
        )}
        {initDrop && (
          <div>
            <img
              src={up}
              alt="up"
              className="w-5 h-5 my-5 cursor-pointer"
              onClick={upHandler}
            />
            <p className="text-gray-200 text-lg mt-2">{instance.description}</p>
            {instance.status === false && (
              <p className="text-red-600 mt-2">In Progress</p>
            )}
            {instance.status === true && (
              <p className="text-green-600 mt-2">Completed</p>
            )}
          </div>
        )}
      </section>
    </div>
  );
}

export default Cards;
