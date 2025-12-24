source "$(dirname "$0")/dependencies.sh"
cd /home/$USER/pwhui;
docker build -t nginx .; 
docker run --name pwhui -d \
  --network parisworkhub \
  -p 80:80 -p 443:443 \
  -e DOMAIN="parisworkhub.eu" \
  -e EMAIL="thiercelin.loic1@gmail.com" \
  -v /etc/letsencrypt:/etc/letsencrypt \
  nginx;