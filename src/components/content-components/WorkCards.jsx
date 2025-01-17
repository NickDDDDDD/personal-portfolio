import { useState } from "react";
import ShuffleCard from "../reuse-components/cards/ShuffleCard";

const WorkCards = () => {
  const totalCardsCount = 3;
  const [order, setOrder] = useState(
    Array.from({ length: totalCardsCount }, (_, i) => i)
  );

  console.log("work card render");
  const handleShuffle = () => {
    const orderCopy = [...order];
    orderCopy.unshift(orderCopy.pop());
    setOrder(orderCopy);
  };

  return (
    <div className="flex items-center justify-center h-full w-full ">
      <div className="relative w-1/3 aspect-[7/10] -ml-24 md:-ml-44 md:w-[40%]  md:aspect-[4/3]">
        <ShuffleCard
          id="work-1"
          handleShuffle={handleShuffle}
          position={order[0]}
        >
          work 1
        </ShuffleCard>
        <ShuffleCard
          id="work-2"
          handleShuffle={handleShuffle}
          position={order[1]}
        >
          work 2
        </ShuffleCard>
        <ShuffleCard
          id="work-3"
          handleShuffle={handleShuffle}
          position={order[2]}
        >
          work 3
        </ShuffleCard>
      </div>
    </div>
  );
};

export default WorkCards;
