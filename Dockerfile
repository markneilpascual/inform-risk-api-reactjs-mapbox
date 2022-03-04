# pull the official base image
FROM node:16.13.1-alpine
# set working direction
WORKDIR /app
# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH
# install application dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent
RUN npm install react-scripts@4.0.3 -g --silent

ENV HOST "0.0.0.0"
ENV PORT 3000
EXPOSE 3000

# add app
COPY . ./
# start app
CMD ["npm", "start"]
