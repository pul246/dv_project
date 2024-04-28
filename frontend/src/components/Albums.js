import React, { useState } from "react";
import Navbar from "./Navbar";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
} from "recharts";
const Albums = () => {
  const DataFormater = (number) => {
    if (number > 1000000000) {
      return (number / 1000000000).toString() + "B";
    } else if (number > 1000000) {
      return (number / 1000000).toString() + "M";
    } else if (number > 1000) {
      return (number / 1000).toString() + "K";
    } else {
      return number.toString();
    }
  };
  const style = {
    top: "50%",
    right: 100,
    transform: "translate(0, -50%)",
    lineHeight: "24px",
    color: "#000",
  };

  const [alb, setAlb] = useState("none");
  const [album, setAlbum] = useState([]);
  const [albumlength, setAlbumlength] = useState(0);
  const [albumstreams, setAlbumstreams] = useState(0);
  const [albumviews, setAlumnviews] = useState(0);
  const [albumcomments, setAlbumcomments] = useState(0);
  function getAlbumn() {
    if (alb === "none" || alb === "") {
      alert("Please enter an album name");
      return;
    }
    fetch("//localhost:3001/album/" + alb)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((jsonResponse) => {
        console.log(jsonResponse);
        if (jsonResponse.length === 0) {
          alert("Album not found");
          setAlbum([]);
          return;
        }

        // Adding random fill colors to the data
        // jsonResponse.forEach((element) => {
        //   element.fill = "#" + Math.floor(Math.random() * 16777215).toString(16);
        // });

        jsonResponse.forEach((element) => {
          element.name = element.Track;
        });

        setAlbum(jsonResponse);
        // Sum the Duration_ms column for the data
        let sum = 0;
        jsonResponse.forEach((element) => {
          sum += element.Duration_ms;
        });
        sum = sum / 60000;
        sum = Math.round((sum + Number.EPSILON) * 100) / 100;
        setAlbumlength(sum);

        // Sum the Stream column for the data
        sum = 0;
        jsonResponse.forEach((element) => {
          sum += element.Stream;
        });
        setAlbumstreams(sum);

        // Sum the Views column for the data
        sum = 0;
        jsonResponse.forEach((element) => {
          sum += element.Views;
        });
        setAlumnviews(sum);

        // Sum the Comments column for the data
        sum = 0;
        jsonResponse.forEach((element) => {
          sum += element.Comments;
        });
        setAlbumcomments(sum);
      });
  }

  function handleChange(event) {
    setAlb(event.target.value);
  }

  return (
    <>
      <div className="antialiased bg-black w-full min-h-screen text-slate-300 relative py-4 px-6">
        <div className="grid grid-cols-12 mx-auto gap-2 sm:gap-4 md:gap-6 lg:gap-10 xl:gap-10 mx-5 my-10 px-2">
          <Navbar />
          <div id="content" className="bg-white/10 col-span-9 rounded-lg p-6">
            <h1 className="font-bold py-4 uppercase">
              Search an Album's Statistics
            </h1>
            <div className="-space-x-2 mx-auto w-max relative">
              <input
                className="peer bg-white h-10 md:h-14 pl-14 text-xl font-semibold text-blue-700 focus:bg-gray-200 outline-none caret-blue-700"
                type="text"
                id="input_album"
                onChange={handleChange}
              />
              <svg
                className="w-5 absolute top-1/2 -translate-y-1/2 left-5 fill-blue-700 peer-focus-within:fill-blue-900"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path d="M500.3 443.7l-119.7-119.7c27.22-40.41 40.65-90.9 33.46-144.7C401.8 87.79 326.8 13.32 235.2 1.723C99.01-15.51-15.51 99.01 1.724 235.2c11.6 91.64 86.08 166.7 177.6 178.9c53.8 7.189 104.3-6.236 144.7-33.46l119.7 119.7c15.62 15.62 40.95 15.62 56.57 0C515.9 484.7 515.9 459.3 500.3 443.7zM79.1 208c0-70.58 57.42-128 128-128s128 57.42 128 128c0 70.58-57.42 128-128 128S79.1 278.6 79.1 208z" />
              </svg>

              <button
                onClick={() => getAlbumn()}
                className="bg-blue-800 hover:bg-blue-900 text-white font-semibold text-lg h-14 px-10 md:px-12 border rounded-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-900 focus:ring-offset-2 focus:ring-offset-white"
              >
                Go
              </button>
            </div>
            {album.length !== 0 && (
              <>
                <div id="24h" className="my-5">
                  <h1 className="font-bold py-4 uppercase">Album Statistics</h1>
                  <div
                    id="stats"
                    className="grid gird-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  >
                    <div className="bg-black/60 to-white/5 p-6 rounded-lg">
                      <div className="flex flex-row space-x-4 items-center">
                        <div id="stats-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-10 h-10 text-white"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                            />
                          </svg>
                        </div>
                        <div>
                          <p className="text-indigo-300 text-sm font-medium uppercase leading-4">
                            Total Songs
                          </p>
                          <p className="text-white font-bold text-2xl inline-flex items-center space-x-2">
                            <span>{album.length}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-black/60 p-6 rounded-lg">
                      <div className="flex flex-row space-x-4 items-center">
                        <div id="stats-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-10 h-10 text-white"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </div>
                        <div>
                          <p className="text-teal-300 text-sm font-medium uppercase leading-4">
                            Album Length (minutes)
                          </p>
                          <p className="text-white font-bold text-2xl inline-flex items-center space-x-2">
                            <span>{albumlength}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-black/60 p-6 rounded-lg">
                      <div className="flex flex-row space-x-4 items-center">
                        <div id="stats-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-10 h-10 text-white"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                            />
                          </svg>
                        </div>
                        <div>
                          <p className="text-blue-300 text-sm font-medium uppercase leading-4">
                            Spotify Streams
                          </p>
                          <p className="text-white font-bold text-2xl inline-flex items-center space-x-2">
                            <span>{albumstreams}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-black/60 p-6 rounded-lg">
                      <div className="flex flex-row space-x-4 items-center">
                        <div id="stats-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-10 h-10 text-white"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </div>
                        <div>
                          <p className="text-teal-300 text-sm font-medium uppercase leading-4">
                            Youtube Views
                          </p>
                          <p className="text-white font-bold text-2xl inline-flex items-center space-x-2">
                            <span>{albumviews}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-black/60 p-6 rounded-lg">
                      <div className="flex flex-row space-x-4 items-center">
                        <div id="stats-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-10 h-10 text-white"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </div>
                        <div>
                          <p className="text-teal-300 text-sm font-medium uppercase leading-4">
                            Total Comments (Yt)
                          </p>
                          <p className="text-white font-bold text-2xl inline-flex items-center space-x-2">
                            <span>{albumcomments}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 mt-10">
                  {/* Likes Bar Plot */}
                  <div className="flex flex-col space-y-4 bg-white text-black m-4">
                    <h1 className="font-bold p-4 uppercase">Likes Plot</h1>
                    <ResponsiveContainer width="100%" height={500}>
                      <BarChart
                        width={800}
                        height={400}
                        data={album}
                        margin={{
                          top: 20,
                          right: 20,
                          left: 20,
                          bottom: 20,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                          dataKey="Track"
                          textAnchor="end"
                          angle={-90}
                          interval={0}
                          height={150}
                          dx={-10}
                          dy={10}
                          // Shorten the tick name
                          tickFormatter={(tick) =>
                            tick.length > 10 ? `${tick.slice(0, 10)}...` : tick
                          }
                        />

                        <YAxis
                          label={{
                            value: "Likes",
                            angle: -90,
                            position: "insideLeft",
                            offset: -35,
                          }}
                          tickFormatter={DataFormater}
                        />
                        <Tooltip />
                        <Legend
                          verticalAlign="bottom"
                          height={36}
                          textAnchor="end"
                        />
                        <Bar dataKey="Likes" fill="#55555" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Views Bar Plot */}

                  <div className="flex flex-col space-y-4 bg-white text-black mx-4 m-4">
                    <h1 className="font-bold p-4 uppercase">Views Plot</h1>
                    <ResponsiveContainer width="100%" height={500}>
                      <BarChart
                        width={800}
                        height={400}
                        data={album}
                        margin={{
                          top: 20,
                          right: 20,
                          left: 20,
                          bottom: 20,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                          dataKey="Track"
                          textAnchor="end"
                          angle={-90}
                          interval={0}
                          height={150}
                          dx={-10}
                          dy={10}
                          // Shorten the tick name
                          tickFormatter={(tick) =>
                            tick.length > 10 ? `${tick.slice(0, 10)}...` : tick
                          }
                        />

                        <YAxis
                          label={{
                            value: "Views",
                            angle: -90,
                            position: "insideLeft",
                            offset: -35,
                          }}
                          tickFormatter={DataFormater}
                        />
                        <Tooltip />
                        <Legend
                          verticalAlign="bottom"
                          height={36}
                          textAnchor="end"
                        />
                        <Bar dataKey="Views" fill="#55555" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                {/* Streams Radial Plot */}

                <div className="flex flex-col space-y-4 bg-white text-black m-4">
                  <h1 className="font-bold p-4 uppercase">
                    Streams Radial Plot
                  </h1>
                  <ResponsiveContainer width="100%" height={800}>
                    <RadialBarChart
                      cx="35%"
                      cy="50%"
                      innerRadius="20%"
                      outerRadius="80%"
                      barSize={20}
                      data={album}
                    >
                      <RadialBar
                        minAngle={15}
                        label={{ position: "insideStart", fill: "#fff" }}
                        background
                        clockWise
                        dataKey="Stream"
                      />
                      <Legend
                        iconSize={10}
                        layout="vertical"
                        verticalAlign="middle"
                        wrapperStyle={style}
                      />
                    </RadialBarChart>
                  </ResponsiveContainer>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Albums;
