# Session-Based Authentication Demo

## Cloning the repository

```bash
git clone https://github.com/knthgrb/session-based_authentication-demo-MERN-Stack.git

cd session-based_authentication-demo-MERN-Stack

```

## Running the Application

**(SUBJECT TO CHANGE DUE TO DOCKERIZATION)**

**Frontend**

1. Navigate to the `frontend/` directory.

```bash
cd frontend
```

2. Install dependencies.

```bash
npm install
```

3. Run the command:

```bash
npm run dev
```

**Backend**

1. Go to [mongodb.com](URL)
2. Create a cluster.
3. Go back to your code editor and navigate to `backend/` directory.
4. Install dependencies.

```bash
npm install
```

5. Create a `.env` file at the root directory and add the following:

```env
MONGO_CONNECTION_STRING = "<your mongo connection string from mongoDB (cluster you created)>"
PORT = 5001
SESSION_SECRET = "<your session sescret>"
```

6. Run command:

```bash
npm start
```
