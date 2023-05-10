--- Get latest dependencies ---
    npm install

Before Starting, run latest build.
to create latest build (use win if on windows, unix for unix systems): 
    yarn create-app-win
or
    yarn create-app-unix


----- Run on Unix -----

    to start just front-end:
        yarn start

    to start just back-end:
        activate virtual environment 
            source env/bin/activate
            pip install -r requirements.txt
            yarn start-api

    to start server:
        source env/bin/activate
        pip install -r requirements.txt
        gunicorn -b :5000 main:app



----- Run on Windows -----
    to start just front-end:
        yarn start

    to start just back-end:
        navigate to api folder,
        activate virtual environment 
            .\env\Scripts\activate
            pip install -r requirements.txt
            yarn start-api

    to start server:
        .\env\Scripts\activate
        pip install -r requirements.txt
        waitress-serve --listen=*:5000 main:app