FROM dhi.io/node:22-alpine3.23-dev AS base-image

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build -- --configuration production

FROM nginx:stable-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=base-image /app/dist/mtg-project/browser /usr/share/nginx/html/trigger-check/

EXPOSE 80
CMD [ "nginx", "-g", "daemon off;" ]


