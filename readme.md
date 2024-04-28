# Backend Setup
Assumtion: cwd is the `backend` directory inside the root of the project.
Please download the dataset from (https://www.kaggle.com/datasets/salvatorerastelli/spotify-and-youtube) and save it in (`backend/data`) folder with the name of the CSV file as (`Spotify_Youtube.csv`)
## Approach 1: Conda
1. Install Conda (https://docs.conda.io/en/latest/miniconda.html)
2. Create a new conda environment: `conda create --prefix ./env python=3.10.0 numpy pandas fastapi uvicorn`
3. Activate the conda environment: `conda activate ./env`
4. Run the backend: `python -m uvicorn main:app --reload --port 3001`; Ensure that port 3001 is not used by other processes.

## Approach 2: Virtualenv
1. Install Python 3.10.0
2. Create a new virtualenv: `python3 -m venv ./env`
3. Activate the virtualenv: `source ./env/bin/activate`
4. Install dependencies: `pip install -r backend/requirements.txt`

# Frontend Setup
Assumtion: cwd is the `frontend` directory inside the root of the project.
1. Install Node.js (https://nodejs.org/en/download/)
2. Install dependencies: `npm install`
3. Run the frontend: `npm start`

# Other Information
## Backend
- The backend is written in Python 3.10.0 using FastAPI.
- The backend is hosted on local server for purpose of demonstration.

## Frontend
- The frontend is written in JavaScript using React.
- The frontend is hosted on local server for purpose of demonstration.

## Git Links
1. (https://github.com/pul246/dv_project)

