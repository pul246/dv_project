import React from "react";
import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import TopSongChart from "./TopSongChart";
import TopArtistsChart from "./TopArtistsChart";

const Home = () => {
  const [trending_artists, setTrendingArtists] = useState([]);
  const [overview, setOverview] = useState([]);
  const [trending_tracks, setTrendingTracks] = useState([]);
  const [totalSongs, setTotalSongs] = useState(0);
  const [totalArtists, setTotalArtists] = useState(0);
  const [totalAlbums, setTotalAlbums] = useState(0);

  useEffect(() => {
    fetch("//localhost:3001/metadata")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((jsonResponse) => {
        setTotalSongs(jsonResponse.TotalSongs);
        setTotalArtists(jsonResponse.TotalArtists);
        setTotalAlbums(jsonResponse.TotalAlbums);
        
      });

    fetch("//localhost:3001/top-artists/10")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((jsonResponse) => {
        // Create an Index column for the data
        jsonResponse.forEach((element, index) => {
          element.Index = index + 1;
        });
        setTrendingArtists(jsonResponse);
      });

    fetch("//localhost:3001/params")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((jsonResponse) => {
        setOverview(jsonResponse);
      });

    fetch("//localhost:3001/top-tracks/10")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((jsonResponse) => {
        // Create an Index column for the data
        jsonResponse.forEach((element, index) => {
          element.Index = index + 1;
        });
        setTrendingTracks(jsonResponse);
      });
  }, []);

  return (
    <>
      <div className="antialiased bg-black w-full min-h-screen text-slate-300 relative py-4 px-6">
        <div className="grid grid-cols-12 mx-auto gap-2 sm:gap-4 md:gap-6 lg:gap-10 xl:gap-10 mx-5 my-10 px-2">
          <Navbar />
          <div id="content" className="bg-white/10 col-span-9 rounded-lg p-6">
            {overview.length > 0 && (
              <div id="24h">
                <h1 className="font-bold py-4 text-xl">
                  Count of Genres of Songs
                </h1>
                <div
                  id="stats"
                  className="grid gird-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {overview.map((ov) => (
                    <div className="bg-black/60 to-white/5 p-6 rounded-lg">
                      <div className="flex flex-row space-x-4 items-center">
                        <div id="stats-1">
                          <img src={"music.png"} className="w-10 h-10" alt="" />
                        </div>
                        <div>
                          <p className="text-indigo-300 text-sm font-medium uppercase leading-4">
                            {ov.key}
                          </p>
                          <p className="text-white font-bold text-2xl inline-flex items-center space-x-2">
                            <span>{ov.value}</span>
                            <span>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-6 h-6"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
                                />
                              </svg>
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* --------------------------------- */}
            {/* Trending Artists */}
            {/* --------------------------------- */}

            <main>
              <div className="pt-6 px-0">
                {trending_tracks && (
                  <>
                    <div className="w-full grid grid-cols-1 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
                      <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 col-span-2">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex-shrink-0">
                            <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">
                              Top 10 Songs
                            </span>
                            <h3 className="text-base font-normal text-gray-500 pl-1">
                              Best Performing Songs
                            </h3>
                          </div>
                        </div>
                        <div id="main-chart">
                          <TopSongChart />
                        </div>
                      </div>
                      <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 col-span-2">
                        <div className="mb-4 flex items-center justify-between">
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                              Top 10 Songs List
                            </h3>
                            <span className="text-base font-normal text-gray-500">
                              This is a list of top performing songs
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col mt-8">
                          <div className="overflow-x-auto rounded-lg">
                            <div className="align-middle inline-block min-w-full">
                              <div className="shadow overflow-hidden sm:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200">
                                  <thead className="bg-gray-50">
                                    <tr>
                                      <th
                                        scope="col"
                                        className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                      >
                                        Index
                                      </th>
                                      <th
                                        scope="col"
                                        className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                      >
                                        Track
                                      </th>
                                      <th
                                        scope="col"
                                        className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                      >
                                        Artist
                                      </th>
                                      <th
                                        scope="col"
                                        className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                      >
                                        YouTube Link
                                      </th>
                                      <th
                                        scope="col"
                                        className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                      >
                                        Spotify Streams
                                      </th>
                                      <th
                                        scope="col"
                                        className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                      >
                                        Youtube Views
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody className="bg-white">
                                    {trending_tracks.map((track) => (
                                      <tr>
                                        <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
                                          {track.Index}
                                        </td>
                                        <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
                                          {track.Track}
                                        </td>
                                        <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                                          {track.Artist}
                                        </td>
                                        <a
                                          href={track.Url_youtube}
                                          target="_blank"
                                          rel="noreferrer"
                                        >
                                          <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                                            {track.Url_youtube}
                                          </td>
                                        </a>
                                        <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
                                          {track.Stream}
                                        </td>
                                        <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
                                          {track.Views}
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
                <div className="mt-4 w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">
                          {totalSongs}
                        </span>
                        <h3 className="text-base font-normal text-gray-500">
                          Total Songs
                        </h3>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">
                          {totalArtists}
                        </span>
                        <h3 className="text-base font-normal text-gray-500">
                          Total Artists
                        </h3>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">
                          {totalAlbums}
                        </span>
                        <h3 className="text-base font-normal text-gray-500">
                          Total Albums
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </main>
            {trending_artists && (
              <>
                <div className="w-full grid grid-cols-1 xl:grid-cols-4 2xl:grid-cols-4 gap-4 my-4">
                  <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 col-span-2">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex-shrink-0">
                        <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">
                          Top 10 Artists
                        </span>
                        <h3 className="text-base font-normal text-gray-500 pl-1">
                          Best Performing Artists
                        </h3>
                      </div>
                    </div>
                    <div id="main-chart">
                      <TopArtistsChart />
                    </div>
                  </div>
                  <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 col-span-2">
                    <div className="mb-4 flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          Top 10 Artists
                        </h3>
                        <span className="text-base font-normal text-gray-500">
                          This is a list of top performing artists
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col mt-8">
                      <div className="overflow-x-auto rounded-lg">
                        <div className="align-middle inline-block min-w-full">
                          <div className="shadow overflow-hidden sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                              <thead className="bg-gray-50">
                                <tr>
                                  <th
                                    scope="col"
                                    className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                  >
                                    Index
                                  </th>
                                  <th
                                    scope="col"
                                    className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                  >
                                    Artist
                                  </th>
                                  <th
                                    scope="col"
                                    className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                  >
                                    Top Track
                                  </th>
                                  <th
                                    scope="col"
                                    className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                  >
                                    Spotify Streams
                                  </th>
                                  <th
                                    scope="col"
                                    className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                  >
                                    Youtube Views
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="bg-white">
                                {trending_artists.map((artist) => (
                                  <tr>
                                    <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
                                      {artist.Index}
                                    </td>
                                    <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
                                      {artist.Artist}
                                    </td>
                                    <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                                      {artist.Track}
                                    </td>
                                    <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
                                      {artist.Stream}
                                    </td>
                                    <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
                                      {artist.Views}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
