# Terabox-To-Telegram-Bot
An Simple Telegram Bot That Recives Terabox Link And Send The File Direclty To Telegram

# Bot Documentation

## Overview
This documentation provides information about the Telegram bot implemented in `main.py`. The bot facilitates the generation of direct links for various file types and sends them to users who are members of the specified channel.

## Prerequisites
Before using the bot, ensure the following requirements are met:
- Python 3.10 or higher
- Required Python packages installed (see `requirements.txt`)
- Telegram bot token obtained and set as environment variable `BOT_TOKEN`
- User must be a member, creator, or administrator of the specified channel (@pranavcodes) to use the bot.

## Usage

### 1. Start Command
- `/start`: Initiates the bot and welcomes the user. Checks if the user is a member of the specified channel.

### 2. File Requests
- Any other message triggers the `send_file` function.
- If the user is a member of the channel, the bot processes the request and generates a direct link for the file.
- The generated link is used to download the file, and the file is sent back to the user based on its type (photo, video, audio, or document).

## Functions

### 1. `start(message)`
- Handles the `/start` command.
- Welcomes the user if they are a member of the channel, else prompts them to join the channel and start again.

### 2. `checkuserinmychannel(user_id)`
- Checks if the user with the given `user_id` is a member, creator, or administrator of the specified channel.
- Returns `True` if the user is a member, otherwise `False`.

### 3. `send_file(message)`
- Handles any message other than the `/start` command.
- Processes the file request if the user is a member of the channel, else prompts them to join the channel.

### 4. `dowload_file(chat_id, file_link)`
- Downloads the file from the provided `file_link`.
- Determines the file type and sends it back to the user using appropriate Telegram API methods.
- Removes the downloaded file after sending.

### 5. `download_file(file_link)`
- Downloads the file from the provided `file_link`.
- Generates a random file name and saves the file locally.

### 6. `generate_link(file_link, chat_id)`
- Generates a direct link for the given `file_link` using an external API.
- Returns the direct link or sends an error message and returns `None` in case of an error.

## Docker Configuration

The provided `Dockerfile` sets up the environment for the bot:
1. Uses the official Python 3.10 image.
2. Sets the working directory to `/app`.
3. Copies the entire application code into the container.
4. Installs the required Python packages.
5. Specifies the command to run the `main.py` script when the container starts.

To build and run the Docker container, execute the following commands:
```bash
docker build -t your_image_name .
docker run -d your_image_name

