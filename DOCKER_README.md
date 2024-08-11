## Running the Project in Docker

Follow these steps to run the project within a Docker container:

1. **Prerequisites**

   - Ensure Docker is installed on your system. You can verify it by running:
     ```
     docker --version
     ```

2. **Clone the Repository**

   - Clone the project using:
     ```
     git clone https://github.com/Jay98patel/innoscripta-Task.git
     ```

3. **Navigate to the Project Directory**

   - Change your current directory to the project:
     ```
     cd innoscripta-Task
     ```

4. **Build the Docker Image**

   - Build the Docker image using:
     ```
     docker build -t my-news-app .
     ```

5. **Run the Container**

   - Start the container with:
     ```
     docker run -p 3000:3000 --name my-react-container my-news-app
     ```

6. **Access the Application**

   - Open your browser and visit:
     ```
     http://localhost:3000
     ```

7. **Stop the Container**

   - To stop the running container, execute:
     ```
     docker stop my-react-container
     ```

8. **Restart the Container**

   - If needed, restart the container with:
     ```
     docker start my-react-container
     ```

9. **Remove the Container**

   - To remove the container once done, use:
     ```
     docker rm my-react-container
     ```

10. **Clean Up Images**
    - Optionally, remove the Docker image if no longer needed with:
      ```
      docker rmi my-news-app
      ```

This guide will help you set up and run the project easily using Docker.
