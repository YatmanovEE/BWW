FROM  node:12

RUN git clone --branch iisoftkzn https://github.com/YatmanovEE/BWW.git

WORKDIR /BWW

RUN npm run install-all
RUN npm run build --prefix client

EXPOSE 80

CMD [ "npm", "run", "server" ] 
