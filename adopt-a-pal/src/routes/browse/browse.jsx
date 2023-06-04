import { React, useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import NavBar from "../../components/navbar";
import Footer from "../../components/footer";
import FilterBar from "../../components/filterbar";
import CarouselCard from "../../components/CarouselCard";
import UseUserPals from "../../modules/UseUserPals";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  EffectCoverflow,
  Navigation,
  A11y,
} from "swiper";


import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/scrollbar";


function Browse(props) {
  const [loading, setLoading] = useState(true);
  // Get list of user's pals to be used as filter
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const userID = decoded.id;
  const userUrl = `/api/users/${userID}`;
  const userData = UseUserPals(userUrl);
  const userPals = userData.pals?.map((strID) => parseInt(strID));

  const [animals, setAnimals] = useState(null); // Contains raw animal data returned
  const [filteredAnimals, setFilteredAnimals] = useState(null); // Contains animal data filtered by userPals

  // API call to handle query params
  const [animalUrl, setAnimalUrl] = useState("/api/animals");
  const handleAnimalUrl = (e) => {
    setAnimalUrl(e);
  };

  // Handles API GET fetch request to get raw animal data from db
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(animalUrl);

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const animalData = await response.json();

        setAnimals(animalData);

        console.log("ANIMALS = ", animals);
      } catch (error) {
        throw new Error(error.message);
      }
    };
    fetchData();
  }, [animalUrl]);

  // Removes animals returned from db if already in userPals
  useEffect(() => {
    const filterData = () => {
      if (userData && userPals && userPals.length > 0) {
        const filteredAnimalData = animals.filter(
          (animal) => !userPals.includes(animal.id)
        );
        setFilteredAnimals(filteredAnimalData);
      } else {
        setFilteredAnimals(animals);
      }
      setLoading(false);
    };
    filterData();
    console.log("FILTERED ANIMALS = ", filteredAnimals);
  }, [animals]);

  return (
    <>
      <NavBar currentPage={"browse"} />

      {/* ---- STATIC TOP HALF OF PAGE */}
      <div className="w-[80vw] flex flex-col mt-28 mb-10 mx-auto px-12 justify-center ">
        {/* PAGE TITLE */}
        <div className="mb-8 text-start text-2xl font-bold text-brown">
          Browse Pets
        </div>

        {/* FILTER AND SEARCH BAR*/}
        <FilterBar handleAnimalUrl={handleAnimalUrl} admin={false} />

        <div className="p-2 mx-auto text-[16px] font-medium text-taupe">
          Returned {filteredAnimals?.length} results
        </div>
      </div>

      {/* ---- SWIPER SPANS WHOLE SCREEN */}
      <div className="w-screen flex flex-row justify-center">
        {loading ? (
          <div
            class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-neutral-100 motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status"
          >
            <span class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"></span>
          </div>
        ) : (
          <Swiper
            className="swiper_container flex flex-row h-full w-full z-50 mb-28 justify-start content-center"
            grabCursor={true}
            centeredSlides={true}
            effect={"coverflow"}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 3,
            }}
            modules={[Navigation, EffectCoverflow, A11y]}
            spaceBetween={.1}
            slidesPerView={2.3}
            pagination={{ el: ".swiper-pagination", clickable: true }}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
              clickable: true,
            }}
            initialSlide={1}
          >
            {filteredAnimals?.map((animal, i) => (
              <SwiperSlide>
                <CarouselCard animal={animal} userID={userID} />
              </SwiperSlide>
            ))}

            {/* BUTTON SLIDER CONTROLLERS*/}
            <div className="slider-controler">
              <div className="swiper-button-prev slider-arrow ml-12 shadow-md hover:shadow-xl">
                <ion-icon name="arrow-back-outline"></ion-icon>
              </div>
              <div className="swiper-button-next slider-arrow mr-12 shadow-md hover:shadow-xl">
                <ion-icon name="arrow-forward-outline"></ion-icon>
              </div>
            </div>
          </Swiper>
        )}
      </div>
      {/* </div> */}

      <Footer />
    </>
  );
}

export default Browse;
