import random
from locust import HttpUser, task, between

class EcommerceUser(HttpUser):
    """
    Simulates user traffic to the containerized static web application.
    Tests static asset delivery, caching, and server concurrency handling.
    """
    # Wait between 1 and 3 seconds between tasks per simulated user
    wait_time = between(1, 3)

    @task(5)
    def load_homepage(self):
        """Simulate a user accessing the index page."""
        self.client.get("/", name="1. Homepage (index.html)")

    @task(3)
    def load_css(self):
        """Simulate loading the main stylesheet."""
        self.client.get("/styles.css", name="2. Stylesheet (styles.css)")

    @task(3)
    def load_javascript(self):
        """Simulate loading the application logic script."""
        self.client.get("/app.js", name="3. JS Script (app.js)")

    @task(2)
    def load_images(self):
        """Simulate fetching static images."""
        # Try requesting sample image paths if available
        self.client.get("/images/", name="4. Images Directory")

    @task(1)
    def check_health(self):
        """Simulate container health check request."""
        self.client.get("/health", name="5. Health Check (/health)")

    def on_start(self):

        """Action performed when a virtual user is initialized."""
        pass
