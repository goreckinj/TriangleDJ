# TriangleDJ

###############################
WINDOWS:

choco install ffmpeg
npm install opusscript
make sure to download only ONE version of python. Unins-
tall all version and reinstall one if needed. Can't have nopde-opus in node_modules folder (just git ignore that)

###############################
UBUNTU:
# Install nodejs and npm
sudo apt-get install nodejs
sudo apt-get install npm

# Go to repo directory with nodejs build
cd triangledj

# Install ffmpeg
sudo apt-get install ffmpeg

# Install discord.js
npm install discord.js

# Install ytdl-core
npm install ytdl-core

# Install node-opus
npm install node-opus

# Install yt-search
npm install yt-search

# OPTIONAL - If node-opus does not work, try: npm install opusscript
# If both are installed, discord.js will use node-opus instead
