ALU Files Manager

ALU Files Manager is an intuitive and efficient file management solution designed to simplify file organization and enhance accessibility. Tailored for students, faculty, and staff of the African Leadership University (ALU), it is built with scalability and performance in mind.

---
Key Features
1. File Upload and Download: Easily upload files to the system and retrieve them whenever necessary.  
2. Categorization: Sort files by categories, users, or custom tags for quick access.  
3. Search Functionality: Use advanced search tools to locate files by keywords, type, or category.  
4. User Access Control: Implement role-based permissions to ensure files are only accessible to authorized users.  
5. Versioning: Track file changes and maintain version history.  
6. Cloud Storage Integration: Optional support for cloud services like Google Drive or Dropbox.  

---

Technologies Utilized
- Backend: Python and FastAPI.  
- Frontend: React.js or a combination of HTML, CSS, and JavaScript.  
- Database: PostgreSQL (or an alternative of your choice).  
- Authentication: OAuth2 or JWT for secure access.  
- Cloud Storage: Optional integration with Amazon S3.  
- Containerization: Docker for simplified deployment and scalability.

---

Setup Instructions
Follow these steps to install and run the project locally:

Clone the Repository
```bash
git clone https://github.com/takurandoro/alu-files_manager.git
cd alu-files_manager
```

Create a Virtual Environment
```bash
python -m venv env
source env/bin/activate   # On Windows: `env\Scripts\activate`
```

Install Project Dependencies
```bash
pip install -r requirements.txt
```

Configure the Database
1. Install PostgreSQL and set it up.  
2. Create a database for the project.  
3. Update the `DATABASE_URL` in the `.env` file with your database configuration.

Run Migrations
```bash
alembic upgrade head
