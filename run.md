# To Run
From the project root run `podman-compose up --build`

For clean build `podman-compose up --build --force-recreate --no-cache`

To clean up containers, images, and volumes run `podman-compose down -v --rmi all`

# To Add Test Users
In development, add the test users to new database using `podman exec workout-tracker_backend_1 uv run python testusers.py`

The container name may be different. Run `podman ps` to identify the container name.

# Access in the browser
Click the link to access in browser.
[http://localhost:3000](http://localhost:3000)