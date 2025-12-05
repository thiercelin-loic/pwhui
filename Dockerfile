FROM node:lts-slim AS build
WORKDIR /src
RUN npm install -g @angular/cli
COPY . ./
RUN npm ci
RUN ng build --configuration=production

FROM nginx:stable AS final
# Install openssl and certbot
RUN apt-get update && apt-get install -y openssl certbot && rm -rf /var/lib/apt/lists/*

# Create directory for ACME challenge
RUN mkdir -p /var/www/certbot

# Generate self-signed certificate (fallback)
RUN mkdir -p /etc/nginx/certs && \
    openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -keyout /etc/nginx/certs/privkey.pem \
    -out /etc/nginx/certs/fullchain.pem \
    -subj "/C=US/ST=State/L=City/O=Organization/CN=localhost"

EXPOSE 80 443
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /src/dist/pwhui/browser /app

COPY docker/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
