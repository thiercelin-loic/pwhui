cd /home/$USER/auth;
docker compose up -d;
cd /home/$USER/booking;
docker compose up -d;
cd /home/$USER/pwhui;
npm start;
