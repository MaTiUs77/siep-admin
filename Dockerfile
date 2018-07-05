FROM node:alpine
ADD ./webpack /siep-admin/
WORKDIR /siep-admin/

RUN npm install

CMD ["sh","/siep-admin/docker_init.sh"]

