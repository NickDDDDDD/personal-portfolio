import { useState } from "react";
import ShuffleCard from "../reuse-components/cards/ShuffleCard";

const WorkCards = () => {
  const totalCardsCount = 5;
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
      <div
        className="relative w-1/3 -ml-24 md:-ml-44 md:w-1/5 aspect-[7/10] "
        style={{
          willChange: "transform",
        }}
      >
        <ShuffleCard
          id="work-1"
          handleShuffle={handleShuffle}
          position={order[0]}
          totalCardsCount={totalCardsCount}
        >
          work 1
        </ShuffleCard>
        <ShuffleCard
          id="work-2"
          handleShuffle={handleShuffle}
          position={order[1]}
          totalCardsCount={totalCardsCount}
        >
          work 2
        </ShuffleCard>
        <ShuffleCard
          id="work-3"
          handleShuffle={handleShuffle}
          position={order[2]}
          totalCardsCount={totalCardsCount}
        >
          work 3
        </ShuffleCard>
        <ShuffleCard
          id="work-4"
          handleShuffle={handleShuffle}
          position={order[3]}
          totalCardsCount={totalCardsCount}
        >
          work 4
        </ShuffleCard>
        <ShuffleCard
          id="work-5"
          handleShuffle={handleShuffle}
          position={order[4]}
          totalCardsCount={totalCardsCount}
        >
          work 5
        </ShuffleCard>
      </div>
    </div>
  );
};

export default WorkCards;
