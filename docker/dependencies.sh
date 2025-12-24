# Ask if user wants to use backend dependencies
read -p "Do you want to start backend dependencies? (auth, booking, tell)? [y/N] " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
  echo "Skipping backend dependencies."
  exit 0
fi

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
  echo "Docker is not installed."
  read -p "Would you like to install Docker? [y/N] " -n 1 -r
  echo
  if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "Installing Docker..."
    curl -fsSL https://get.docker.com -o get-docker.sh
    sudo sh get-docker.sh
    sudo usermod -aG docker $USER
    rm get-docker.sh
    echo "Docker installed successfully. Please log out and back in for group changes to take effect."
    exit 0
  else
    echo "Docker is required to run backend services. Exiting."
    exit 1
  fi
fi

# Check if backend projects exist
MISSING_DEPS=()
[ ! -d "/home/$USER/auth" ] && MISSING_DEPS+=("auth")
[ ! -d "/home/$USER/booking" ] && MISSING_DEPS+=("booking")
[ ! -d "/home/$USER/tell" ] && MISSING_DEPS+=("tell")

if [ ${#MISSING_DEPS[@]} -gt 0 ]; then
  echo "Missing backend dependencies: ${MISSING_DEPS[*]}"
  read -p "Would you like to clone the missing repositories? [y/N] " -n 1 -r
  echo
  if [[ $REPLY =~ ^[Yy]$ ]]; then
    for dep in "${MISSING_DEPS[@]}"; do
      echo "Cloning $dep..."
      cd /home/$USER
      git clone "https://github.com/thiercelin-loic/$dep.git" || echo "Failed to clone $dep"
    done
    echo "Dependencies cloned. You may need to configure them before starting."
  else
    echo "Cannot start services without all dependencies. Exiting."
    exit 1
  fi
fi

# Check and configure .env files
DEPS=("auth" "booking")
for dep in "${DEPS[@]}"; do
  if [ -d "/home/$USER/$dep" ] && [ ! -f "/home/$USER/$dep/.env" ]; then
    echo "Missing .env file for $dep"
    read -p "Would you like to create .env file for $dep? [y/N] " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
      echo "Configuring $dep environment..."
      read -p "Use default values? [Y/n] " -n 1 -r
      echo
      if [[ $REPLY =~ ^[Nn]$ ]]; then
        read -p "MYSQL_HOST [database]: " MYSQL_HOST
        MYSQL_HOST=${MYSQL_HOST:-database}
        read -p "MYSQL_PORT [3306]: " MYSQL_PORT
        MYSQL_PORT=${MYSQL_PORT:-3306}
        read -p "MYSQL_USERNAME [root]: " MYSQL_USERNAME
        MYSQL_USERNAME=${MYSQL_USERNAME:-root}
        read -sp "MYSQL_PASSWORD [password]: " MYSQL_PASSWORD
        echo
        MYSQL_PASSWORD=${MYSQL_PASSWORD:-password}
        read -p "NODE_ENV [production]: " NODE_ENV
        NODE_ENV=${NODE_ENV:-production}
        read -p "PORT [3000]: " PORT
        PORT=${PORT:-3000}
      else
        MYSQL_HOST="database"
        MYSQL_PORT="3306"
        MYSQL_USERNAME="root"
        MYSQL_PASSWORD="password"
        NODE_ENV="production"
        PORT="3000"
      fi
      
      cat > "/home/$USER/$dep/.env" << EOF
MYSQL_HOST=$MYSQL_HOST
MYSQL_PORT=$MYSQL_PORT
MYSQL_USERNAME=$MYSQL_USERNAME
MYSQL_PASSWORD=$MYSQL_PASSWORD
MYSQL_DATABASE=$dep
NODE_ENV=$NODE_ENV
PORT=$PORT
EOF
      echo ".env file created for $dep."
    else
      echo "Warning: $dep may not work without .env configuration."
    fi
  fi
done

# Start backend services
cd /home/$USER/auth;
docker compose up -d;
cd /home/$USER/booking;
docker compose up -d;
cd /home/$USER/tell;
docker compose up -d;
echo "Backend services started."