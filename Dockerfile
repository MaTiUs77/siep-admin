FROM node:alpine
ADD ./webpack /siep-gw/
WORKDIR /siep-gw/

RUN npm install --only=dev

RUN wget https://github.com/almasaeed2010/AdminLTE/archive/v2.4.3.zip && unzip v2.4.3.zip -d ./dist && rm v2.4.3.zip
RUN mv ./dist/AdminLTE-2.4.3 ./dist/adminlte

#RUN npm run build

CMD ["npm","run","server"]
