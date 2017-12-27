FROM node:8.4.0

ENV HOME=/home/app

COPY package.json yarn.lock $HOME/irango_frontend/

WORKDIR $HOME/irango_frontend

RUN npm install --silent --progress=false

COPY . $HOME/irango_frontend

CMD ["npm", "start"]