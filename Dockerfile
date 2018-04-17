FROM node as build
COPY . .
RUN npm install
RUN npm run build
RUN npm install -g serve
EXPOSE 5000
CMD [ "serve", "-s", "build" ]