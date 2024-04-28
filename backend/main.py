#
# Description: This is the main file for the backend of the application. It is
#              responsible for starting the FastAPI server and handling all
#              requests.
#

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd

app = FastAPI()

# No CORS is needed since the frontend and backend are hosted on the same domain.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Welcome to the backend of the application!"}

@app.get("/top-tracks/{count}")
async def top_releases(count: int):
    df = pd.read_csv("data/Spotify_Youtube_cleaned.csv")
    df = df.sort_values(by="Stream", ascending=False)
    df = df.head(count)
    df = df[["Artist", "Url_youtube", "Stream", "Views", "Track"]]
    df = df.to_dict(orient="records")
    return df

@app.get("/params")
async def params():
    data = pd.read_csv("data/Spotify_Youtube_cleaned.csv")
    ret_data = {}
    # Count the number of rows having dancability value > 0.5
    ret_data["Danceability"] = len([i for i in data['Danceability'].values.tolist() if i > 0.5])

    # Count the number of rows having energy value > 0.5
    ret_data["Energy"] = len([i for i in data['Energy'].values.tolist() if i > 0.5])

    # Count the number of rows having loudness value > 0.5
    ret_data["Loudness"] = len([i for i in data['Loudness'].values.tolist() if i > 0.5])

    # Count the number of rows having speechiness value > 0.5
    ret_data["Speechiness"] = len([i for i in data['Speechiness'].values.tolist() if i > 0.5])

    # Count the number of rows having acousticness value > 0.5
    ret_data["Acousticness"] = len([i for i in data['Acousticness'].values.tolist() if i > 0.5])

    # Count the number of rows having instrumentalness value > 0.5
    ret_data["Instrumentalness"] = len([i for i in data['Instrumentalness'].values.tolist() if i > 0.5])

    # Count the number of rows having liveness value > 0.5
    ret_data["Liveness"] = len([i for i in data['Liveness'].values.tolist() if i > 0.5])

    # Count the number of rows having valence value > 0.5
    ret_data["Valence"] = len([i for i in data['Valence'].values.tolist() if i > 0.5])
    
    # Convert the data to a list of dictionaries
    data_f = list()
    for key in ret_data:
        data_f.append({'key': key, 'value': ret_data[key]})

    return data_f

@app.get("/top-artists/{count}")
async def top_artists(count: int):
    df_org = pd.read_csv("data/Spotify_Youtube_cleaned.csv")
    df = pd.read_csv("data/Spotify_Youtube_cleaned.csv")
    df = df.groupby("Artist").sum()
    df = df.sort_values(by="Stream", ascending=False)
    df = df.head(count)
    df["Artist"] = df.index
    
    # Extract only the top track for each artist
    df = df.reset_index(drop=True)

    # Get the top track for each artist
    top_tracks = list()

    for artist in df["Artist"].values.tolist():
        top_tracks.append(df_org[df_org["Artist"] == artist]["Track"].values.tolist()[0])
        
    print(top_tracks[0])
    df["Track"] = top_tracks

    df = df[["Artist", "Stream", "Views", "Track"]]
    df = df.to_dict(orient="records")
    return df

@app.get("/album/{name}")
async def album(name: str):
    df = pd.read_csv("data/Spotify_Youtube_cleaned.csv")
    df = df[df["Album"] == name]
    # df = df[["Artist", "Url_youtube", "Stream", "Views", "Track"]]
    df = df.to_dict(orient="records")
    if(len(df) == 0):
        return []
    return df

@app.get("/metadata")
async def metadata():
    # Get total songs total artists and total albums
    df = pd.read_csv("data/Spotify_Youtube_cleaned.csv")
    ret_data = {}
    ret_data["TotalSongs"] = len(df)
    ret_data["TotalArtists"] = len(df["Artist"].unique())
    ret_data["TotalAlbums"] = len(df["Album"].unique())
    return ret_data