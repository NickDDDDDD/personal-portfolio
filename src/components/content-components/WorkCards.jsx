import { useState } from "react";
import ShuffleCard from "../reuse-components/cards/ShuffleCard";

const WorkCards = () => {
  const [order, setOrder] = useState(["front", "middle", "back"]);

  const handleShuffle = () => {
    setOrder((prevOrder) => {
      const last = prevOrder[prevOrder.length - 1];
      const rest = prevOrder.slice(0, -1);
      return [last, ...rest];
    });
  };

  return (
    <div className="grid place-content-center h-full w-full">
      <div className="relative  h-96 w-72 ">
        <ShuffleCard handleShuffle={handleShuffle} position={order[0]}>
          work 1
        </ShuffleCard>
        <ShuffleCard handleShuffle={handleShuffle} position={order[1]}>
          work 2
        </ShuffleCard>
        <ShuffleCard handleShuffle={handleShuffle} position={order[2]}>
          work 3
        </ShuffleCard>
      </div>
    </div>
  );
};

export default WorkCards;
