docker stop auth.api auth.database booking.api booking.database pwhui;
docker rm -f auth.api auth.database booking.api booking.database pwhui;
docker rmi -f booking-app auth-app nginx mysql;

clear;
cd /root/auth; docker compose down;
cd /root/booking; docker compose down;
clear;

rm -rf /root/pwhui /root/auth /root/booking;
docker system prune -a;
clear;

docker ps --all;
docker images;
clear;

git clone http://github.com/thiercelin-loic/pwhui;
git clone http://github.com/thiercelin-loic/auth;
git clone http://github.com/thiercelin-loic/booking;
clear;

cd /root/pwhui;
docker build -t nginx .; docker run --name pwhui -d -p 80:80 nginx;
clear;