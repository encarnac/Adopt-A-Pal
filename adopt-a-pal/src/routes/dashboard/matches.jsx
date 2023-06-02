import SmallCard from '../../components/SmallCard';

function Matches({ palDataList, loading }) {
  

  return (
    <>
      <div className="w-[70vw] flex flex-col mt-36 mb-10 mx-auto justify-center ">
        {/* PAGE TITLE */}
        <div className="mb-8 text-start text-2xl font-bold text-brown indicator">
          <span className="indicator-item badge badge-secondary">
            {palDataList.length}
          </span>
          Your Matches
        </div>

        <div className="grid grid-cols-4 gap-8 mb-32">
          {loading && (
            <div className="loading loading-spinner loading-lg"></div>
          )}
          {palDataList?.map((animal, i) => (
            <SmallCard animal={animal} />
          ))}
        </div>
      </div>
    </>
  );

}

export default Matches;
