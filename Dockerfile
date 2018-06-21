FROM node:alpine
ADD ./webpack /siep-gw/
WORKDIR /siep-gw/

RUN npm install

RUN wget https://github.com/almasaeed2010/AdminLTE/archive/v2.4.3.zip && unzip v2.4.3.zip -d ./static && rm v2.4.3.zip
RUN mv ./static/AdminLTE-2.4.3 ./static/adminlte

RUN npm run build

CMD ["npm","run","server"]
