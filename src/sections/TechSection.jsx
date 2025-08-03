import { TechSectionContent } from "/src/utils/content";

import TechIconCard from "../components/TechIconCard.jsx";
import { useState, useEffect, useCallback, useRef } from "react";
import { useMeasure } from "react-use";
import { motion } from "motion/react";
import ResponsiveTypography from "../components/typography/ResponsiveTypography.jsx";
import PoissonDiskSampling from "poisson-disk-sampling";

const {
  ReactIcon,
  HtmlIcon,
  CssIcon,
  JsIcon,
  TailwindIcon,
  MaterialUiIcon,
  PlaywrightIcon,
  ViteIcon,
  WebpackIcon,
  JavaIcon,
  MySqlIcon,
  PostgresqlIcon,
  Burpsuite,
  Postman,
} = TechSectionContent;

const TechSection = () => {
  const containerRef = useRef(null);
  const [measureRef, { width, height }] = useMeasure();
  const [iconObjs, setIconObjs] = useState([]);
  const [open, setOpen] = useState(false);

  const baseSize = Math.max(width, height) / 15;
  const minDistance = baseSize * 2;

  const generateIcons = useCallback(() => {
    const icons = [
      HtmlIcon,
      CssIcon,
      JsIcon,
      ReactIcon,
      MaterialUiIcon,
      TailwindIcon,
      PlaywrightIcon,
      ViteIcon,
      WebpackIcon,
      JavaIcon,
      MySqlIcon,
      PostgresqlIcon,
      Burpsuite,
      Postman,
    ];

    const pds = new PoissonDiskSampling({
      shape: [width - baseSize * 2, height - baseSize * 2],
      minDistance: minDistance,
      tries: 50,
    });

    const points = pds.fill();

    const sliced = points.slice(0, icons.length);

    return icons.map((Icon, index) => {
      const [left, top] = sliced[index] || [0, 0];
      return {
        Icon,
        id: index,
        rotate: Math.random() * 60 - 30,
        top: `${top}px`,
        left: `${left}px`,
        size: `${baseSize}px`,
      };
    });
  }, [baseSize, width, height, minDistance]);

  useEffect(() => {
    if (open && width > 0 && height > 0) {
      setIconObjs(generateIcons());
    }
  }, [open, width, height, generateIcons]);

  console.log("TechSection render");

  return (
    <section
      className="aspect-video w-full rounded-2xl bg-gradient-to-br from-slate-400 to-slate-500 p-12"
      onClick={() => setOpen(true)}
    >
      {open ? (
        <div
          className="relative h-full w-full"
          style={{ perspective: 1000 }}
          ref={(el) => {
            containerRef.current = el;
            measureRef(el);
          }}
        >
          {iconObjs.map((iconObj) => {
            const randomTilt =
              (Math.random() * 45 + 45) * (Math.random() > 0.5 ? 1 : -1);

            return (
              <motion.div
                key={iconObj.id}
                style={{
                  position: "absolute",
                  top: iconObj.top,
                  left: iconObj.left,
                  rotate: iconObj.rotate,
                }}
                initial={{ scale: 1, y: 0 }}
                animate={{
                  scale: [1, 1.4, 1],
                  y: [0, -100, 0],
                  rotateY: [0, randomTilt, 0],
                }}
                transition={{
                  duration: 0.5,
                  times: [0, 0.5, 1],
                  ease: ["easeOut", "easeIn"],
                  delay: iconObj.id * 0.02,
                }}
              >
                <TechIconCard containerRef={containerRef}>
                  <iconObj.Icon
                    style={{ width: iconObj.size, height: iconObj.size }}
                  />
                </TechIconCard>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <div className="flex h-full w-full items-center justify-center gap-6">
          <ResponsiveTypography variant="h2" className="text-slate-300">
            What&apos;s in my
          </ResponsiveTypography>

          <ResponsiveTypography
            variant="h1"
            className="font-bold text-slate-600"
          >
            toolbox
          </ResponsiveTypography>
        </div>
      )}
    </section>
  );
};

export default TechSection;
