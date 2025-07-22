FROM node:24-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install --frozen-lockfile

COPY . .

ENV VITE_API_BASE_URL=%%VITE_API_BASE_URL%%

RUN npm run build

FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

RUN apk add --no-cache sed
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Define o script como o ponto de entrada do contêiner
ENTRYPOINT ["/entrypoint.sh"]

EXPOSE 80
