import tick from "../icons/tick.png";
import { motion } from "framer-motion";

function Message() {
  return (
    <div>
      <motion.div
        className="fixed top-10 right-28 w-30 bg-gray-800 p-2 rounded flex content-center border-2 border-green-600"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <div className="pr-2 self-center">
          <img src={tick} alt="icon for tick" className="w-5 h-5" />
        </div>
        <p className="text-gray-200">Created successfully</p>
      </motion.div>
    </div>
  );
}

export default Message;
