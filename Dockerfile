FROM node:10-alpine

RUN yarn add react-scripts

WORKDIR /code

COPY package.json /code/package.json
RUN yarn
RUN mv /code/node_modules /node_modules

COPY . /code

CMD ["npm","start"]
