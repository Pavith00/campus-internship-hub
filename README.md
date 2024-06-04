# University InternshipHub

Welcome to University InternshipHub, a platform designed to streamline the internship placement process for campus students, companies, and administrators.

## Abstract

The "University InternshipHub" project aims to enhance and simplify the internship placement process for students, companies, and administrators within the university ecosystem. By providing a user-friendly platform powered by the latest technology, the system facilitates seamless communication and interaction among these key stakeholders.

Students can create profiles, specify job preferences, and benefit from automatic job searching functionalities tailored to their preferences. Additionally, quizzes are available to help students enhance their job application skills, with marks reflecting their competencies. Mentor videos covering essential topics such as CV writing and interview preparation further support student development.

Organizations can easily post available internships, manage applications, and maintain profiles from anywhere. Administrators play a crucial role in creating quizzes and mentorship videos, overseeing system maintenance, and managing other administrative tasks.

## Technologies Used

### Frontend
- **React**: Utilized for interface programming, React's component-based design and virtual DOM enable swift UI rendering and enhance user interaction.
- **Bootstrap CSS Library**: Provides pre-defined elements and reactive grid systems for frontend styling and layout design, ensuring responsiveness across various platforms and screen sizes.

### Backend
- **Spring Boot**: Serves as the core web application framework for building RESTful APIs and managing business data. Its convention-over-configuration approach simplifies backend development and deployment.
- **MongoDB**: Acts as the NoSQL database for storing and organizing user data, internship information, applications, and educational resources. MongoDB's flexibility and scalability make it ideal for managing diverse data types and sizes.

### Version Control
- **GitHub**: Used for collaborative development and code management, GitHub facilitates group work, tracks project changes, and manages code repositories efficiently. Features like issue tracking and pull requests streamline collaboration and code review processes.

## Folder Structure

- `.idea`: IntelliJ IDEA project files
- `internshipHub`: Main project directory
  - `src`: Source code directory
    - `main`: Main application code
      - `java/com/example/internshipHub`: Java source files
        - `Controller`: Contains controller classes
        - `Service`: Contains service classes
        - `config`: Configuration files
        - `exception`: Exception handling classes
        - `model`: Data model classes
        - `repository`: Repository classes
        - `security`: Security-related classes
        - `InternshipHubApplication.java`: Main application entry point
      - `resources`: Resource files
    - `test/java/com/example/internshipHub`: Test source files
  - `public`: Public assets directory
  - `src`: React frontend source code
    - `Component`: Reusable components
    - `Pages`: Application pages
      - Various subdirectories for specific functionalities (e.g., `AdminRegistration`, `CVUpload`, `Chatbot`, etc.)
  - `README.md`: Project README file
  - Other project-related files (`.gitignore`, `package-lock.json`, `package.json`, etc.)
 
## Screenshots
| ![Screenshot 1](https://github.com/Pavith00/campus-internship-hub/assets/113990110/2ec1c5b7-6a36-4c00-a008-7d9f383f2836) | ![Screenshot 2](https://github.com/Pavith00/campus-internship-hub/assets/113990110/4cb3abb3-624d-4e17-a210-51550d42a739) |
|-----------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------|
| Home page                                                                                                                  | Available jobs                                                                                                              |

| ![Screenshot 3](https://github.com/Pavith00/campus-internship-hub/assets/113990110/57db0b14-4b04-4502-93f1-2e7ab40bbb78) | ![Screenshot 4](https://github.com/Pavith00/campus-internship-hub/assets/113990110/c65e253a-94f6-45cc-b055-674c87a6abf2) |
|-----------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------|
| Login page                                                                                                                 | Create an Account                                                                                                           |

| ![Screenshot 5](https://github.com/Pavith00/campus-internship-hub/assets/113990110/9627e1f6-b230-4fbb-81d1-2ab6ab242eac) | ![Screenshot 6](https://github.com/Pavith00/campus-internship-hub/assets/113990110/289e0794-1159-442d-b6f9-875f18bf2e30) |
|-----------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------|
| Available Videos                                                                                                           | Available Quizzes                                                                                                           |

| ![Screenshot 7](https://github.com/Pavith00/campus-internship-hub/assets/113990110/0d79cd7a-44b5-4c5f-a158-abc3af6fd415) | ![Screenshot 8](https://github.com/Pavith00/campus-internship-hub/assets/113990110/723ba966-a0dc-45f4-a467-aeaae4b92275) |
|-----------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------|
| Company Profile                                                                                                            | Candidate Details                                                                                                           |

| ![Screenshot 9](https://github.com/Pavith00/campus-internship-hub/assets/113990110/b974e2bd-ac56-4fac-b3b7-f0591d5cba68) | ![Screenshot 10](https://github.com/Pavith00/campus-internship-hub/assets/113990110/dc552e6b-e8c5-48f6-97eb-b15ba466b58a) |
|------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------|
| Apply for a job                                                                                                            | Download CV                                                                                                                  |


## Contributors

The University InternshipHub project was made possible by the contributions of the following individuals:
- [Ridmi Yashoda](https://github.com/Riyash99): Company profile function and CV upload function.
- [Shakya](Link to Contributor 2's GitHub profile): Description of their contribution.
- [Pavithra Ramanayake](https://github.com/Pavith00): Student profile function and Automatic job searching function


## Getting Started

To get started with the University InternshipHub platform, follow these steps:
1. Clone the repository from GitHub.
2. Set up the backend using Spring Boot and MongoDB.
3. Configure the frontend with React.
4. Start the application and begin using the platform to streamline internship placement processes.

## Conclusion

University InternshipHub aims to revolutionize the internship placement experience by providing an intuitive platform for students, companies, and administrators. By leveraging modern technologies and fostering seamless communication, the platform enhances collaboration and simplifies the internship placement process within the university ecosystem.
