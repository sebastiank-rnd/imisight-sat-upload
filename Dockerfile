FROM node:10.6.0

#sudo
RUN apt-get update && apt-get install -y sudo && rm -rf /var/lib/apt/lists/*

ENV DIRPATH /opt/imisight-sat-upload
WORKDIR .

# CONFD
ADD https://github.com/kelseyhightower/confd/releases/download/v0.16.0/confd-0.16.0-linux-amd64 /opt/confd/bin/confd
RUN chmod +x /opt/confd/bin/confd
ENV PATH="$PATH:/opt/confd/bin"

COPY ./src/assets/confd/*.toml /etc/confd/conf.d/
COPY ./src/assets/confd/*.tmpl /etc/confd/templates/

WORKDIR ${DIRPATH}

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# add `${DIRPATH}/node_modules/.bin` to $PATH
ENV PATH $PATH:${DIRPATH}/node_modules/.bin

# If you are building your code for production
# RUN npm install --only=produ
# RUN npm i npm@latest -g
RUN npm install -g @angular/cli@6.0.8
# RUN npm install node-sass
RUN npm install


COPY . ${DIRPATH}
RUN chmod +x ${DIRPATH}/run.sh

CMD [ "./run.sh" ]
