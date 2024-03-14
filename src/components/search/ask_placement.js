import React, { useEffect, useState,useRef } from "react";
import Modal from "react-modal";
import SpotifyService from "../../services/spotify.services";
import ArtistService from "../../services/artist.service";
import { ToastContainer, toast } from 'react-toastify';


const AskForPlacementModal = (props) => {
  const [albums, setAlbums] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [loadingTracks, setLoadingTracks] = useState(false);
  const [loadingAlbums, setLoadingAlbums] = useState(false);

  const [album_id, setAlbumId] = useState(null);

  const [track_id, setTrackId] = useState(null);

  const [track_name, setTrackName] = useState(null);

  const [loading,setLoading] = useState(false);

  const wasCalled = useRef(false);

  console.log("=== Placement modal ===");

  console.log(props);

  useEffect(() => {

    if(wasCalled.current) return;
    wasCalled.current = true;

    const init = async () => {
      // check if video already included in playlist

      setLoadingAlbums(true);

      const _albums = await SpotifyService.getAlbums();

      if (_albums?.data?.results) {
        setAlbums(_albums?.data?.results);
      }
      setLoadingAlbums(false);
    };

    init();
  }, [props]);

  const getTracks = async (id) => {
    setLoadingTracks(true);

    const _tracks = await SpotifyService.getAlbumsTracks({
      album_id: id,
    });

    console.log(_tracks?.data?.results);

    setTracks(_tracks?.data?.results);

    setLoadingTracks(false);
  };

  const askPlacement = () => {

    setLoading(true);

    console.log("=== Submitting ===");
    console.log(track_id,track_name);

    ArtistService.newRequest(
      props.data.playlist_id,
      props.data.playlist_reference[0],
      props.data.playlist_name,
      track_id,
      track_name
    ).then(
      () => {
        setLoading(false);
        props.setPlacementModal();
        toast.success(`Song name "${track_name}" has been submitted for placement.`)
      },
      (error) => {
        setLoading(false);
        props.setPlacementModal();
        toast.error(error)
      }
    );
  };

  return (
    <React.Fragment>
      <>
        <div
          class={`modal ${props.placementModal ? "fade show" : ""}`}
          id="staticBackdrop"
          data-bs-keyboard="true"
          data-bs-backdrop="static"
          tabindex="-1"
          aria-labelledby="staticBackdropLabel"
          style={{ display: "block", background: "#00000073" }}
          aria-hidden="true"
        >
          <div class="modal-dialog modal-lg mt-6" role="document">
            <div class="modal-content border-0">
              <div class="position-absolute top-0 end-0 mt-3 me-3 z-index-1">
                <button
                  onClick={() => {
                    props.setPlacementModal();
                  }}
                  class="btn-close btn btn-sm btn-circle d-flex flex-center transition-base"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body p-0">
                <div class="bg-light rounded-top-lg py-3 ps-4 pe-6">
                  <h4 class="mb-1" id="staticBackdropLabel">
                    ASK FOR PLACEMENT
                  </h4>
                </div>
                <div class="p-4">
                  <div class="row">
                    <div class="col-lg-9">
                      <div class="d-flex">
                        <form class="col-lg-10 form-inline text-left">
                          <div class="form-group mt-3 mb-4">
                            <label class="text-left">Choose Album</label>
                            <div class="col-lg-10">
                              <select
                                onChange={async (e) => {
                                  setAlbumId(e.target.value);
                                  await getTracks(e.target.value);
                                }}
                                className="form-control"
                              >
                                <option selected disabled>
                                  {" "}
                                  {loadingAlbums ? "Loading..." : "Choose"}{" "}
                                </option>
                                {albums?.length > 0 ? (
                                  <>
                                    {albums.map((x) => {
                                      return (
                                        <>
                                          <option value={x?.id}>
                                            {x?.name}
                                          </option>
                                        </>
                                      );
                                    })}
                                  </>
                                ) : (
                                  <></>
                                )}
                              </select>
                            </div>
                          </div>
                          <div class="form-group">
                            <label class="text-left">Choose Track</label>
                            <div class="col-lg-10 form-group">
                              <select
                                onChange={(e) => {
                                  setTrackId(e.target.value);

                                  const _track_name = e.target[e.target.selectedIndex].getAttribute('data-track-name');
                                  
                                  console.log(_track_name);

                                  setTrackName(_track_name)
                                }}
                                className="form-control"
                              >
                                <option selected disabled value={0}>
                                  {" "}
                                  {loadingTracks ? "Loading..." : "Choose"}{" "}
                                </option>

                                {tracks?.length > 0 ? (
                                  <>
                                    {tracks.map((x) => {
                                      return (
                                        <>
                                          <option value={x?.id} data-track-name={x?.name}>
                                            {x?.name}
                                          </option>
                                        </>
                                      );
                                    })}
                                  </>
                                ) : (
                                  <></>
                                )}
                              </select>{" "}
                            </div>
                          </div>

                          <div className="form-group">
                            <button
                              onClick={() => {
                                askPlacement();
                              }}
                              disabled={loading}
                              className="mt-5 not_requested btn w-50 rounded-pill d-block badge-soft-warning  text-truncate mt-2 mb-2"
                              type="button"
                              style={{ fontSize: 14 }}
                            >
                              {loading ? (
                                <>
                                  <div class="spinner-border" role="status">
                                    <span class="sr-only">Loading...</span>
                                  </div> 
                                </>
                              ):(

                                <>
                                   Ask For Placement
                                </>
                              )}
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </>
    </React.Fragment>
  );
};

export default AskForPlacementModal;
