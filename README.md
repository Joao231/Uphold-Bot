# Crypto Bot

Crypto Bot is a Node.js application that monitors cryptocurrency prices and generates alerts for price oscillations.

## Prerequisites

Before running the bot, ensure you have the following installed on your system:

- Node.js (v20 or later)
- npm (Node Package Manager)
- Docker (if running the Dockerized version)
- PostgreSQL (if using the database integration)

## Setup

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd Uphold
2. **Install dependencies:**

   ```bash
   npm install
3. **Set up the database (if using database integration):**
   
   - Install PostgreSQL and create a database.
   - Update the database connection configuration in src/db/dbConfig.js with your PostgreSQL credentials.
   - Run the dbSetup script to create a table alerts to store alert information.
   ```bash
   node dbSetup.js
4. **Build the Docker image (if using Docker):**

   ```bash
   docker build -t uphold-bot-image .
## Configuration

The bot can be configured using command-line arguments or environment variables:
- **Pairs**: Comma-separated list of currency pairs to monitor.
- **Interval**: Fetch interval in seconds.
- **Percentage**: Price oscillation percentage threshold.

## Running the Bot

1. **Without Docker:**

    Run the bot using Node.js:
   ```bash
   node src/index.js --pairs="BTC-USD,ETH-USD" --interval=5 --percentage=0.01
2. **With Docker:**

   Run the Docker container:
   ```bash
   docker run --name uphold-bot uphold-bot-image -e RUNNING_IN_DOCKER=true --pairs="BTC-USD,ETH-USD" --interval=5 --percentage=0.01
## Test the Bot

1. **All 3 tests**

    Tests:
   ```bash
   cd test
   npx jest
## USAGE

The bot will monitor the specified currency pairs and generate alerts when price oscillations exceed the configured threshold. Alerts are logged to the console and stored in the database if database integration is enabled.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

