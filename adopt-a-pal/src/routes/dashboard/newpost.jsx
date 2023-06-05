import { React, useEffect, useState } from "react";
import FadeAnimation from "../../modules/FadeAnimation";
import "../../styles.css";

function NewPost({ show, showNewPost, handleUpdate }) {
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  const [name, setName] = useState(null);
  const [species, setSpecies] = useState(null);
  const [breed, setBreed] = useState(null);
  const [dispositionAnimals, setDispositionAnimals] = useState(false);
  const [dispositionChildren, setDispositionChildren] = useState(false);
  const [dispositionLeash, setDispositionLeash] = useState(false);
  const [pics, setPics] = useState([]);
  const [availability, setAvailability] = useState(null);

  const createNewPet = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("species", species);
      formData.append("breed", breed);
      formData.append("disposition_animals", dispositionAnimals);
      formData.append("disposition_children", dispositionChildren);
      formData.append("disposition_leash", dispositionLeash);
      formData.append("availability", availability);

      pics.forEach((pic, index) => {
        formData.append(`pics[${index}]`, pic);
      });

      console.log("formdata:", formData);
      const response = await fetch("/api/animals", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const confirmation = await response.json();
        console.log("SUCCESS = ", confirmation);
        showNewPost();
        handleUpdate(confirmation);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  };

  if (!show) return null;

  return (
    <>
      <div className="fixed z-50 inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
        <FadeAnimation show={show}>
          <div className="modal modal-open">
            <div className="modal-box w-11/12 max-w-xl bg-white opacity-95 px-16 py-8">
              <h3 className="font-bold text-2xl text-brown">New Post</h3>

              <form className="py-4 space-y-2" onSubmit={createNewPet}>
                {/* NAME - TEXT INPUT */}
                <div className="form-control w-full max-w-md">
                  <label className="label">
                    <span className="label-text">Pet's Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="ex. Dobby"
                    className="input input-bordered w-full max-w-xl bg-white capitalize"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                {/* SPECIES - DROPDOWN SELECT */}
                <div className="form-control w-full max-w-md">
                  <label className="label">
                    <span className="label-text">Animal Type</span>
                  </label>
                  <select
                    value={species}
                    onChange={(e) => setSpecies(e.target.value)}
                    className="select select-bordered bg-white"
                  >
                    <option disabled selected>
                      Select...
                    </option>
                    <option value="dog">Dog</option>
                    <option value="cat">Cat</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* BREED - TEXT INPUT */}
                <div className="form-control w-full max-w-md">
                  <label className="label">
                    <span className="label-text">Breed</span>
                  </label>
                  <input
                    type="text"
                    placeholder="ex. Mini Pinscher"
                    className="input input-bordered w-full max-w-xl bg-white capitalize"
                    onChange={(e) => setBreed(e.target.value)}
                  />
                </div>

                {/* AVAILABILITY - DROPDOWN SELECT */}
                <div className="form-control w-full max-w-md">
                  <label className="label">
                    <span className="label-text">Availability</span>
                  </label>
                  <select
                    value={availability}
                    onChange={(e) => setAvailability(e.target.value)}
                    className="select select-bordered bg-white"
                  >
                    <option disabled selected>
                      Select...
                    </option>
                    <option value="Available">Available</option>
                    <option value="Not Available">Not Available</option>
                    <option value="Pending">Pending</option>
                    <option value="Adopted">Adopted</option>
                  </select>
                </div>

                {/* PHOTO - FILE INPUT */}
                <div className="form-control w-full max-w-md gap-4">
                  <label className="label">
                    <span className="label-text">Upload Photo</span>
                  </label>

                  <input
                    type="file"
                    className="file-input file-input-bordered file-input-sm w-full max-w-lg bg-white text-sm"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      setPics((prevPics) => [...prevPics, file]);
                    }}
                  />
                  <input
                    type="file"
                    className="file-input file-input-bordered file-input-sm w-full max-w-lg bg-white text-sm"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      setPics((prevPics) => [...prevPics, file]);
                    }}
                  />
                  <input
                    type="file"
                    className="file-input file-input-bordered file-input-sm w-full max-w-lg bg-white text-sm"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      setPics((prevPics) => [...prevPics, file]);
                    }}
                  />
                </div>

                {/* DISPOSITIONS - TOGGLE */}
                <div className="flex flex-col">
                  <div className="form-control w-full">
                    <label className="cursor-pointer label">
                      <span className="label-text">Good with Children</span>
                      <input
                        type="checkbox"
                        className="toggle toggle-lg toggle-success"
                        onChange={() =>
                          setDispositionChildren(!dispositionChildren)
                        }
                      />
                    </label>
                  </div>

                  <div className="form-control w-full">
                    <label className="cursor-pointer label">
                      <span className="label-text">Good with Other Pets</span>
                      <input
                        type="checkbox"
                        className="toggle toggle-lg toggle-success"
                        onChange={() =>
                          setDispositionAnimals(!dispositionAnimals)
                        }
                      />
                    </label>
                  </div>

                  <div className="form-control w-full">
                    <label className="cursor-pointer label">
                      <span className="label-text">Must Be Leashed</span>
                      <input
                        type="checkbox"
                        className="toggle toggle-lg toggle-success"
                        onChange={() => setDispositionLeash(!dispositionLeash)}
                      />
                    </label>
                  </div>
                </div>
              </form>

              {/* CALL TO ACTION BUTTON */}
              <div className="modal-action">
                <button
                  onClick={() => {
                    showNewPost();
                  }}
                  className="btn text-brown"
                >
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={createNewPet}>
                  {loading ? (
                    <div
                      class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-neutral-100 motion-reduce:animate-[spin_1.5s_linear_infinite]"
                      role="status"
                    >
                      <span class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"></span>
                    </div>
                  ) : (
                    <span className="text-white">Create</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </FadeAnimation>
      </div>
    </>
  );
}

export default NewPost;
