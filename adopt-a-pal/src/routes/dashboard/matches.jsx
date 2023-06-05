import { React, useState, useEffect } from "react";
import SmallCard from "../../components/SmallCard";

function Matches({ palDataList, loading, uid }) {
  const [count, setCount] = useState(0);
  const updateCount = () => {
    setCount((count) => count - 1);
  };

  useEffect(() => {
    setCount(palDataList?.length);
  }, [palDataList]);

  return (
    <>
      <div className="w-[83vw] flex flex-col flex-wrap mt-28 mb-10 mx-auto px-12 justify-center ">
        {/* PAGE TITLE */}
        <div className="mb-8 text-start text-2xl font-bold text-brown indicator">
          <span className="indicator-item badge badge-secondary">{count}</span>
          Your Matches
        </div>

        {loading && (
          <div className="mx-auto">
            <div
              class="h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-neutral-100 motion-reduce:animate-[spin_1.5s_linear_infinite]"
              role="status"
            >
              <span class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"></span>
            </div>
          </div>
        )}
        <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 justify-items-center auto-cols-auto gap-x-56 lg:gap-x-24 gap-y-8 mb-32 mx-auto px-2">
          {palDataList?.map((animal, i) => (
            <SmallCard
              animal={animal}
              uid={uid}
              admin={false}
              updateCount={updateCount}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Matches;
