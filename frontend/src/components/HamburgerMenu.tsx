import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, MotionConfig } from "framer-motion";
import { MdClose } from "react-icons/md";

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <div className="md:hidden z-50">
      <motion.button
        animate={isOpen ? "open" : "closed"}
        onClick={() => setIsOpen(!isOpen)}
        className="flex flex-col space-y-[4px]"
      >
        <motion.span className="w-6 h-[3px] bg-black block rounded-full" />
        <motion.span className="w-6 h-[3px] bg-black block rounded-full" />
        <motion.span className="w-6 h-[3px] bg-black block rounded-full" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <MotionConfig transition={{ type: "spring", bounce: 0.099 }}>
            <motion.div
              key="mobile-nav"
              variants={{
                open: {
                  x: "0%",
                  transition: {
                    type: "spring",
                    bounce: 0.099,
                    when: "beforeChildren",
                  },
                },
                closed: {
                  x: "-100%",
                  transition: {
                    type: "spring",
                    bounce: 0.099,
                    when: "afterChildren",
                  },
                },
              }}
              initial="closed"
              animate="open"
              exit="closed"
              className="lg:hidden fixed  inset-0 mx-auto flex flex-col items-center justify-center gap-10 text-center"
              style={{
                background:
                  "radial-gradient(circle at 10% 20%, rgb(239, 246, 249) 0%, rgb(206, 239, 253) 90%)",
              }}
            >
              <motion.button
                onClick={closeMenu}
                className="absolute top-0 right-0 m-4  rounded-full p-2 text-black"
              >
                <MdClose size={32} />
              </motion.button>
              <motion.div>
                <motion.ul className="space-y-10 text-black">
                  <li>
                    <motion.a
                      whileHover={{ scale: 1.4 }}
                      className="text-4xl font-bold"
                    >
                      <Link to="/" onClick={closeMenu}>
                        Home
                      </Link>
                    </motion.a>
                  </li>
                  <li>
                    <motion.a
                      whileHover={{ scale: 1.4 }}
                      className="text-4xl font-bold"
                    >
                      <Link to="/search" onClick={closeMenu}>
                        Hotels
                      </Link>
                    </motion.a>
                  </li>
                  <li>
                    <motion.a
                      whileHover={{ scale: 1.4 }}
                      className="text-4xl font-bold"
                    >
                      <Link to="/my-bookings" onClick={closeMenu}>
                        My Bookings
                      </Link>
                    </motion.a>
                  </li>
                  <li>
                    <motion.a
                      whileHover={{ scale: 1.4 }}
                      className="text-4xl font-bold"
                    >
                      <Link to="/my-hotels" onClick={closeMenu}>
                        My Hotels
                      </Link>
                    </motion.a>
                  </li>
                </motion.ul>
              </motion.div>
            </motion.div>
          </MotionConfig>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HamburgerMenu;
