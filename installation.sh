#!/bin/sh
cat netflex.sql | mysql -u root -p
cd backend
node json_to_db.js
npm install
cd ..
cd frontend
npm install