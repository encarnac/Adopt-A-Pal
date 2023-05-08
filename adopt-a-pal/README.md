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
        navigate to api folder,
        activate virtual environment 
            cd api
            source env/bin/activate
            pip install -r requirements.txt
            cd ..
            yarn start-api

    to start server:
        cd api
        source env/bin/activate
        pip install -r requirements.txt
        cd ..
        gunicorn -b :5000 api.main:app



----- Run on Windows -----

    to start just front-end:
        yarn start

    to start just back-end:
        navigate to api folder,
        activate virtual environment 
            cd api
            .\env\Scripts\activate
            pip install -r requirements.txt
            cd ..
            yarn start-api

    to start server:
        cd api
        .\env\Scripts\activate
        pip install -r requirements.txt
        cd ..
        waitress-serve --listen=*:5000 api.main:app