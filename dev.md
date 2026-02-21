# Running the Application in Development

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
