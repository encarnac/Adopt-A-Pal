import { React, useState } from "react";
import SmallCard from "../../components/SmallCard";

function Matches({ palDataList, loading, uid }) {
  return (
    <>
      <div className="w-[70vw] flex flex-col flex-wrap mt-28 mb-10 mx-auto justify-center ">
        {/* PAGE TITLE */}
        <div className="mb-8 text-start text-2xl font-bold text-brown indicator">
          <span className="indicator-item badge badge-secondary">
            {palDataList.length}
          </span>
          Your Matches
        </div>

        <div className="grid 2xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 justify-items-center mb-32 md:mx-0 mx-8">
          {loading && (
            <div className="loading loading-spinner loading-lg"></div>
          )}
          {palDataList?.map((animal, i) => (
              <SmallCard animal={animal} uid={uid} admin={false} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Matches;
