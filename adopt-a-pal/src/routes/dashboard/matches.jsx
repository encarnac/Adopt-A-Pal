import SmallCard from '../../components/SmallCard';

function Matches(props) {
  // TO DO: GET DATA FROM API
  const { palDataList } = props;
  

  return (
    <>
      <div className="w-[1280px] flex flex-col mt-36 mb-10 mx-auto justify-center ">
        {/* PAGE TITLE */}
        <div className="mb-8 text-start text-2xl font-bold text-brown">
          Your Matches
        </div>
        
        
        <div className="grid grid-cols-4 gap-8 mb-32">
          {palDataList?.map((animal, i) => (
            <SmallCard animal={animal} />
          ))}
        </div>
      </div>
    </>
  );

}

export default Matches;
