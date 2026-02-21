# Running the Application in Development

# Environment

For both the front-end and the back-end, copy the `.env_sample` file to `.env` and change values as needed.

# Start Backend

```bash
cd backend
uv run testusers.py
uv run uvicorn main:app --reload
```

# Start Frontend

```bash
cd frontend
npm install
npm run dev -- --port 3000 --host
```
