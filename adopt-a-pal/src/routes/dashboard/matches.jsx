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

        <div className="grid 2xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 justify-items-center mb-32 md:mx-0 mx-8">
          {loading && (
            <div
              class="ml-[50vw] mt-[10vh] h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-neutral-100 motion-reduce:animate-[spin_1.5s_linear_infinite]"
              role="status"
            >
              <span class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"></span>
            </div>
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
