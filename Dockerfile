FROM node:18.14.2
WRKDIR /apps
ADD . .
RUN npm install
CMD ['node','server.js']