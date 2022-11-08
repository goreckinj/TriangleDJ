# TriangleDJ

A Discord bot meant to play music, queue music and have an sqlite3 database to store individual user's custom playlists.

# Setup

## Windows

```bash
choco install ffmpeg
npm install opusscript

# make sure to download only ONE version of python. 
# Uninstall all version and reinstall one if needed.
# Can't have node-opus in node_modules folder (just .gitignore that)
```

## Linux (Ubuntu)

```bash
# Install dependencies
sudo apt-get install nodejs npm ffmpeg
sudo apt-get install npm
sudo apt-get install ffmpeg

# Go to repo directory with nodejs build
cd triangledj

# Install npm dependencies
npm install discord.js ytdl-core node-opus yt-search

# OPTIONAL - If node-opus does not work, try: npm install opusscript
# If both are installed, discord.js will use node-opus instead
```
