/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useRef, useEffect, useState } from "react";
import SpotifyService from "../services/spotify.services";

import Footer from "./footer.component";

import ProgressBar from "@ramonak/react-progress-bar";

import _ from "lodash";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import BarChart from "./charts/BarChart";

Chart.register(CategoryScale);

const Analytics = (props) => {
  const [data, setData] = useState({});

  const [id, setID] = useState(null);

  const [error, setError] = useState(false);

  const [loading, setLoading] = useState(null);

  const getStats = async () => {
    const playlist_id = props?.playlist_id || id;
    console.log("Playlist Id: ",playlist_id)
    if (!playlist_id) {
      setError(true);
      setLoading(false);
      return;
    } else {
      setError(false);
    }

    setLoading(true);

    const response = await SpotifyService.getAnalytics(playlist_id);

    if (response.data?.error === true) {
      setError(true);
    } else {
      setData(response.data);
    }

    console.log(response);

    setLoading(false);
  };

  useEffect(() => {
    if (props && props.playlist_id) {
      getStats();
    }
  }, [props]);

  const formatFollowers = (num) => {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1).replace(/\.0$/, "") + "G";
    }
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
    }
    return num;
  };

  return (
    <>
      <div class="row mb-3">
        <div class="col">
          <div class="card bg-100 shadow-none border">
            <div class="row gx-0 flex-between-center">

            </div>
          </div>

          <div class="container">
            <div class="row">
              <div class="panel-heading mt-5 text-center mb-4">
                {" "}
                <h4>PlaylistGOATS Bot Detection System</h4>
                <p class="white">
                  Access Comprehensive Spotify Playlist Data and Analytics for Informed Insights.
                </p>

                {props && props.playlist_id && (
                <>
                  <div class="text-gray playlist-url">
                    <strong>Playlist URL:</strong>&nbsp;
                    <a rel="noreferrer" al href={`https://open.spotify.com/playlist/${props.playlist_id}`} target="_blank">https://open.spotify.com/p/{Math.random().toString(36).slice(2, 8)}</a>
                  </div>
                </>
              )}

              
              </div>

              
              


              {error && (
                <div class="alert alert-danger" role="alert">
                  <strong>Invalid URL : </strong> Please paste a correct
                  spotfify playlist url
                </div>
              )}

              <div className="panel-body mb-6">

                {!props?.playlist_id && (
                  <>
                    <p className="text-white">Enter Playlist ID</p>
                    <div class="search">
                      <input
                        type="text"
                        placeholder="Paste a Spotify playlist link"
                        name="search"
                        onChange={(e) => {
                          try {
                            setError(false);
                            const playlist_id = new URL(e.target.value).pathname
                              .split("/")
                              .pop();
                            setID(playlist_id);
                          } catch (e) {
                            setError(true);
                          }
                        }}
                      />
                      <button
                        disabled={loading}
                        type="button"
                        onClick={getStats}
                      >
                        <i class="fa fa-search"></i>
                      </button>
                    </div>
                  </>
                )}

                {loading && (
                  <span className="pt-4 loading-text">
                    One moment, our digital detectives are digging deep for the details! ...{" "}
                    <div class="spinner-border spinner-loader" role="status">
                      <span class="sr-only">Loading...</span>
                    </div>
                  </span>
                )}
              </div>
              {Object.keys(data).length ? (
                <>
                  <div class="col">
                    <img
                      alt="User Pic"
                      src={data?.image_url}
                      id="profile-image1"
                      class="img-circle img-responsive image-playlist"
                    />
                  </div>
                  <div class="col">
                    <h4>{data?.playlist_name}</h4>

                    <button
                      type="button"
                      class="btn btn-sm btn-primary m-right-5"
                    >
                      Followers :
                      <span class="badge badge-light">{data?.followers}</span>
                    </button>

                    <button type="button" class="btn btn-sm btn-danger">
                      Total Tracks :
                      <span class="badge badge-light">{data?.tracks}</span>
                    </button>

                    <br />

                    <div className="col mt-5">
                      <strong>Last Updated: </strong> {data?.last_updated}
                      <br /> <br />
                      <strong>Popular Repeated Artist: </strong>{" "}
                      {data?.popular_artist}
                      <br /> <br />
                      <strong className="mt-3">Playlist Popularity:</strong>
                      <ProgressBar
                        className="mt-3"
                        completed={data?.popularity}
                        maxCompleted={100}
                      />
                    </div>
                  </div>

                  {data?.botted ? (
                    <>
                      <div
                        className="mt-5 alert alert-danger d-flex align-items-center"
                        role="alert"
                      >
                        <div>
                           Our system just called out a curator for doing the robot – but not in a good way! Based on the data it seems it’s botted. 
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div
                        className="mt-5 alert alert-success d-flex align-items-center"
                        role="alert"
                      >
                        <div>
                          ✅ Bot-Free: Based on the data, we have no evidence to believe this playlist is botted.
                        </div>
                      </div>
                    </>
                  )}

                  {/* <div className="mt-5">
                     <FollowersChart />
                  </div> */}

                  <div className="row mt-5">
                    <h4> Top Artists </h4>
                    <table class="table mt-3">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Name</th>
                          <th scope="col">Followers</th>
                          <th scope="col">Playlist Repeatition</th>
                          <th scope="col">Popularity</th>
                          <th scope="col">Monthly Listeners</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data?.top_artists.map((artist, i) => {
                          return (
                            <>
                              <tr>
                                <th scope="row">{i + 1}</th>
                                <td>{artist.name}</td>
                                <td>
                                  {formatFollowers(artist.followers.total)}
                                </td>
                                <td>{artist.repeat_count}</td>
                                <td>
                                  <ProgressBar
                                    completed={artist.popularity}
                                    maxCompleted={100}
                                    labelSize="10px"
                                    labelClassName="label-css"
                                    className="progress-wrapper"
                                  />
                                </td>
                                <td>{artist?.listeners}</td>
                              </tr>
                            </>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  <hr />

                  <div className="row mt-3">
                    <div>
                      <h3>Playlist Tracks Analysis</h3>
                      <div style={{ maxWidth: "800px" }} className="mt-4">
                        {data.audio_analysis.map((x) => {
                          return (
                            <>
                              <strong>
                                {" "}
                                {x.type.charAt(0).toUpperCase() +
                                  x.type.slice(1)}
                                : {x[x.type]}/{x.type === "tempo" ? 200 : 100}
                              </strong>

                              <ProgressBar
                                className={`mt-3 mb-5`}
                                completed={x[x.type]}
                                maxCompleted={x.type === "tempo" ? 200 : 100}
                                bgColor={
                                  x.type === "happy"
                                    ? "#FAA7FF"
                                    : x.type === "danceability"
                                    ? "#FF666B"
                                    : x.type === "energy"
                                    ? "#1DB954"
                                    : x.type === "acousticness"
                                    ? "E5CAA9"
                                    : x.type === "instrumentalness"
                                    ? "#A80A34"
                                    : x.type === "liveness"
                                    ? "#A29EFF"
                                    : x.type === "speechiness"
                                    ? "#fffbbc"
                                    : x.type === "tempo"
                                    ? "#ff5a52"
                                    : ""
                                }
                                isLabelVisible={false}
                              />
                            </>
                          );
                        })}
                      </div>

                      <BarChart
                        chartData={{
                          labels: [
                            "Happiness",
                            "Danceability",
                            "Energy",
                            "Acousticness",
                            "Instrumentalness",
                            "Liveness",
                            "Speechiness",
                            "Tempo",
                          ],
                          datasets: [
                            {
                              backgroundColor: [
                                "rgb(250, 167, 255)",
                                "rgb(255, 102, 107)",
                                "rgb(29, 185, 84)",
                                "rgb(224, 224, 222)",
                                "rgb(168, 10, 52)",
                                "rgb(162, 158, 255)",
                                "rgb(255, 251, 188)",
                                "rgb(255, 90, 82)",
                              ],
                              data: data.audio_analysis.map((x) => x[x.type]),
                            },
                          ],
                        }}
                      />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <p>
                    {error
                      ? "No information found for the playlist. Please check the playlist id"
                      : ""}
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Analytics;
