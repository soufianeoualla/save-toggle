import { useState } from "react";
import { FaCircleCheck } from "react-icons/fa6";
import { motion } from "motion/react";
import { cn } from "../utils";

const SaveToggle = () => {
  const [status, setStatus] = useState<"start" | "loading" | "saved">("start");
  const [showText, setShowText] = useState(false);

  const handleClick = () => {
    if (status === "start") {
      setStatus("loading");
      setTimeout(() => {
        setStatus("saved");
        setTimeout(() => {
          setShowText(true);
        }, 500);
      }, 2000);
    } else if (status === "saved" && showText) {
      setShowText(false);
      setStatus("start");
    }
  };

  const fadeSlide = ({
    x,
    y = 0,
    color,
    duration = 0.3,
    opacity = 0,
  }: {
    x: number;
    y?: number;
    color?: string;
    duration?: number;
    opacity?: number;
  }) => ({
    initial: { opacity: opacity, x, y, color },
    animate: { opacity: 1, x: 0, y: 0, color: color || undefined },
    transition: { duration: duration },
  });

  const renderContent = () => {
    switch (status) {
      case "start":
        return (
          <div className="bg-[#ebeae4] flex justify-center items-center text-neutral-900 w-[80px] h-10 rounded-4xl">
            <motion.span
              {...fadeSlide({
                x: 0,
                y: 10,
              })}
            >
              Save
            </motion.span>
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
              damping: 15,
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
          <motion.div
            initial={{
              width: 40,
              backgroundColor: "#2e2d2b",
              borderRadius: 100,
            }}
            animate={{
              width: showText ? 110 : 40,
              backgroundColor: showText ? "white" : "#2e2d2b",
              borderRadius: showText ? 35 : 100,
            }}
            transition={{
              type: "spring",
              damping: 14,
              stiffness: 120,
              mass: 1.5,
              duration: 0.3,
            }}
            className={cn(
              "h-10 flex justify-center items-center gap-x-2 border border-[#ebeae4] ",
              showText ? "bg-white" : "bg-[#2e2d2b]"
            )}
          >
            <motion.div
              {...fadeSlide({
                x: showText ? 10 : 0,
                duration: 0.3,
                color: showText ? "#63615c" : "white",
              })}
              className="flex justify-center items-center text-xl"
            >
              <FaCircleCheck />
            </motion.div>

            {showText && (
              <motion.div
                {...fadeSlide({
                  x: -10,
                  duration: 0.6,
                })}
                className="text-[#63615c] overflow-hidden"
              >
                Saved
              </motion.div>
            )}
          </motion.div>
        );
    }
  };

  return <motion.button onClick={handleClick}>{renderContent()}</motion.button>;
};

export default SaveToggle;
