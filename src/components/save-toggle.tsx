import { useState } from "react";
import { FaCircleCheck } from "react-icons/fa6";
import { motion } from "motion/react";

const SaveToggle = () => {
  const [status, setStatus] = useState<
    "start" | "loading" | "saved" | "finished"
  >("start");

  const handleClick = () => {
    if (status === "start") {
      setStatus("loading");
      setTimeout(() => {
        setStatus("saved");
        setTimeout(() => setStatus("finished"), 300);
      }, 1000);
    } else if (status === "finished") {
      setStatus("start");
    }
  };

  const fadeSlide = (x = 0, y = 0, color?: string) => ({
    initial: { opacity: 0, x, y, color },
    animate: { opacity: 1, x: 0, y: 0, color: color || undefined },
    transition: { duration: 0.3 },
  });

  const renderContent = () => {
    switch (status) {
      case "start":
        return (
          <div className="bg-[#ebeae4] flex justify-center items-center text-neutral-900 w-[80px] h-10 rounded-4xl">
            <motion.span {...fadeSlide(0, 10)}>Save</motion.span>
          </div>
        );

      case "loading":
        return (
          <motion.div
            initial={{
              opacity: 0,
              backgroundColor: "#ebeae4",
              width: 80,
              borderRadius: 30,
            }}
            animate={{
              opacity: 1,
              backgroundColor: "#2e2d2b",
              width: 40,
              borderRadius: "50%",
            }}
            transition={{
              type: "spring",
              damping: 16,
              stiffness: 120,
              mass: 1.5,
            }}
            className="flex justify-center items-center h-10 w-10"
          >
            <div className="w-6 h-6 border-4 border-[#d6d4ce] border-t-white rounded-full animate-spin" />
          </motion.div>
        );

      case "saved":
        return (
          <div className="bg-[#2e2d2b] rounded-full flex justify-center items-center h-10 w-10">
            <FaCircleCheck className="text-white text-xl" />
          </div>
        );

      case "finished":
        return (
          <motion.div
            initial={{
              opacity: 0,
              width: 40,
              height: 40,
              backgroundColor: "#2e2d2b",
              borderRadius: 60,
            }}
            animate={{
              opacity: 1,
              width: 110,
              backgroundColor: "transparent",
              borderRadius: 35,
              border: "1px solid #ebeae4",
            }}
            transition={{
              type: "spring",
              damping: 16,
              stiffness: 120,
              mass: 1.5,
            }}
            className="h-10 flex justify-center items-center gap-x-2"
          >
            <motion.div
              {...fadeSlide(15, 0, "#fff")}
              animate={{ opacity: 1, x: 0, color: "#63615c" }}
            >
              <FaCircleCheck className="text-xl" />
            </motion.div>
            <motion.div {...fadeSlide(-15)} className="text-[#63615c]">
              Saved
            </motion.div>
          </motion.div>
        );
    }
  };

  return <motion.button onClick={handleClick}>{renderContent()}</motion.button>;
};

export default SaveToggle;
