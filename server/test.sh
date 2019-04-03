git clone https://github.com/KevinDelcourt/cho7.git -b redux-form;
cd cho7/server;
yarn;
echo '{
    "host":"192.168.99.100",
    "port":"3306",
    "user":"root",
    "database":"cho7"
    }' > db/db-identifiants.json
node server.js;