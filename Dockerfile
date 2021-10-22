FROM darwincruz/dummy-repo01:node15-clean AS BUILDER
RUN find / | grep pip

ENV NODE_TLS_REJECT_UNAUTHORIZED 0

WORKDIR /usr/src/stage

RUN apk add g++ make python

COPY package.json ./
COPY . .

RUN npm set strict-ssl false && npm -v && npm i \
    && cp ./patches/axios-utils.js ./node_modules/axios/lib/utils.js \
    && cp ./patches/axios-package.json ./node_modules/axios/package.json  
    # && rm -rf ./node_modules/ansi-regex \ 
    # && npm i ansi-regex@6.0.1 

FROM joncervantes08/dummy-repo01:clean-nonpm

WORKDIR /usr/src/app

COPY --from=0 /usr/src/stage .

COPY . .

EXPOSE 83

CMD [ "node", "boot" ]
