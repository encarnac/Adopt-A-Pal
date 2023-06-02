import { React, useEffect, useState } from "react";

function FilterBar( {handleAnimalUrl} ) {
  // Changes the search paramters
  // const handleAnimalUrl = handleAnimalUrlprops.handleAnimalUrl;

  // Search Query Paramaters
  const [dateRange, setDateRange] = useState("");
  const [species, setSpecies] = useState('');
  const [breed, setBreed] = useState('');

  const [dispositionAnimals, setDispositionAnimals] = useState('');
  const [activeAnimalBtn, setActiveAnimalBtn] = useState(false);
  const handleDispAnimals = () => {
    setActiveAnimalBtn(!activeAnimalBtn);
    dispositionAnimals === true
      ? setDispositionAnimals("")
      : setDispositionAnimals(true);
  };

  const [dispositionChildren, setDispositionChildren] = useState('');
  const [activeChildBtn, setActiveChildBtn] = useState(false);
  const handleDispChildren = () => {
    setActiveChildBtn(!activeChildBtn);
    dispositionChildren === true
      ? setDispositionChildren("")
      : setDispositionChildren(true);
  };


  const handleSearch = (event) => {
    event.preventDefault();
    handleAnimalUrl(`/api/animals?species=${species}&breed=${breed}&disposition_animals=${dispositionAnimals}&disposition_children=${dispositionChildren}`);
  }

  return (
    <>
      <form onSubmit={handleSearch}>
        <div className="join justify-start flex flex-row space-x-2 mb-8">
          {/* DATE POSTED - DROP DOWN SELECT */}
          <select className="select bg-white border-primary opacity-50 text-brown join-item">
            <option disabled selected>
              Date Posted
            </option>
            <option>Any Date</option>
            <option>&lt; 1 week</option>
            <option>&lt; 1 month</option>
            <option>&lt; 6 months</option>
          </select>

          {/* SPECIES - DROP DOWN SELECTES */}
          <select
            value={species}
            onChange={(e) => setSpecies(e.target.value)}
            className="select bg-white border-primary opacity-50 text-brown join-item"
          >
            <option disabled selected>
              Species
            </option>
            <option value="">All</option>
            <option value="cat">Cat</option>
            <option value="dog">Dog</option>
            <option value="other">Other</option>
          </select>

          {/* DISPOSITIONS - BUTTONS  */}
          <button
            onClick={handleDispChildren}
            className={
              activeChildBtn
                ? "btn bg-success opacity-70 text-white normal-case hover:bg-success hover:text-white hover:opacity-50 join-item"
                : "btn bg-white border-primary opacity-50 text-brown normal-case hover:bg-success hover:text-white join-item"
            }
          >
            Kid Friendly
          </button>
          <button
            onClick={handleDispAnimals}
            className={
              activeAnimalBtn
                ? "btn bg-success opacity-70 text-white normal-case hover:bg-success hover:text-white hover:opacity-50 join-item"
                : "btn bg-white border-primary opacity-50 text-brown normal-case hover:bg-success hover:text-white join-item"
            }
          >
            Animal Friendly
          </button>

          {/* BREED - TEXT INPUT */}
          <div>
            <div>
              <input
                className="input input-bordered border-primary bg-white opacity-50 text-brown text-sm join-item "
                placeholder="Breed"
                onChange={(e) => setBreed(e.target.value)}
              />
            </div>
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            className="btn btn-primary text-white join-item"
          >
            Search
          </button>
        </div>
      </form>
    </>
  );
}

export default FilterBar;
