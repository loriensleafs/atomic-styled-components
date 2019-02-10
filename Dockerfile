FROM node:11.9.0

RUN yarn add react-scripts

COPY . ./

RUN yarn

CMD ["yarn","start"]
