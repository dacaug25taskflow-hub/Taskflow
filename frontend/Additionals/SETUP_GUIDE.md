# Taskflow Project Setup Guide

This guide will help you set up and run the Taskflow project, which consists of:
- **Spring Boot Services** (Java): Auth Service, Admin Services, Manager Service, Team Leader Service
- **.NET Service** (C#): Employee Service
- **React Frontend**: React application

## Prerequisites

1. **Java Development Kit (JDK) 21**
   - Download from: https://www.oracle.com/java/technologies/downloads/#java21
   - Or use OpenJDK: https://adoptium.net/
   - Verify installation: `java -version`

2. **.NET SDK 8.0**
   - Download from: https://dotnet.microsoft.com/download/dotnet/8.0
   - Verify installation: `dotnet --version`

3. **Maven** (or use Maven Wrapper included in projects)
   - Download from: https://maven.apache.org/download.cgi
   - Or use the included `mvnw` wrapper scripts
   - Verify installation: `mvn --version`

4. **MySQL Database**
   - Download from: https://dev.mysql.com/downloads/mysql/
   - Create database: `taskflowdb`
   - Default connection: `localhost:3306`, user: `root`, password: `root`
   - Run the SQL scripts: `taskflowdb.sql` or `taskflowdb_migration.sql`

5. **Node.js and npm** (for React frontend)
   - Download from: https://nodejs.org/
   - Verify installation: `node --version` and `npm --version`

## VS Code Extensions Setup

The project includes a `.vscode/extensions.json` file that recommends the following extensions:

### Required Extensions:

1. **Java Extension Pack** (`vscjava.vscode-java-pack`)
   - Includes: Language Support, Debugger, Test Runner, Maven, Project Manager, Visual Studio Code Launcher

2. **Spring Boot Extensions**:
   - `vscjava.vscode-spring-boot-dashboard`
   - `vscjava.vscode-spring-boot`
   - `vscjava.vscode-spring-initializr`

3. **.NET Extensions**:
   - `ms-dotnettools.csharp`
   - `ms-dotnettools.csdevkit`
   - `ms-dotnettools.vscode-dotnet-runtime`

4. **Frontend Extensions**:
   - `esbenp.prettier-vscode`
   - `dbaeumer.vscode-eslint`

### Installing Extensions:

1. Open VS Code in the project root
2. Press `Ctrl+Shift+X` to open Extensions view
3. VS Code will prompt you to install recommended extensions
4. Click "Install All" or install them individually

Alternatively, you can install via command line:
```powershell
code --install-extension vscjava.vscode-java-pack
code --install-extension vscjava.vscode-spring-boot-dashboard
code --install-extension vscjava.vscode-spring-boot
code --install-extension ms-dotnettools.csharp
code --install-extension ms-dotnettools.csdevkit
code --install-extension ms-dotnettools.vscode-dotnet-runtime
code --install-extension esbenp.prettier-vscode
code --install-extension dbaeumer.vscode-eslint
```

## Project Structure

```
Taskflowwww/
├── Backend/
│   ├── authservice/          (Port: 8080)
│   ├── admin_services/       (Port: 8081)
│   ├── manager_service/     (Port: 8082)
│   └── team-leader_service/  (Port: 8083)
├── employee_service/         (.NET 8.0)
├── frontend/reactapp/        (React App)
└── .vscode/                  (VS Code configuration)
```

## Running the Services

### 1. Start MySQL Database

Make sure MySQL is running and the `taskflowdb` database exists.

### 2. Start Spring Boot Services

Each Spring Boot service can be run using Maven wrapper:

**Auth Service (Port 8080):**
```powershell
cd Backend\authservice
.\mvnw.cmd spring-boot:run
```

**Admin Services (Port 8081):**
```powershell
cd Backend\admin_services
.\mvnw.cmd spring-boot:run
```

**Manager Service (Port 8082):**
```powershell
cd Backend\manager_service
.\mvnw.cmd spring-boot:run
```

**Team Leader Service (Port 8083):**
```powershell
cd Backend\team-leader_service
.\mvnw.cmd spring-boot:run
```

### 3. Start .NET Employee Service

```powershell
cd employee_service\employee_service
dotnet run
```

The service will start on the port configured in `launchSettings.json` (typically `http://localhost:5000` or `https://localhost:5001`).

### 4. Start React Frontend

```powershell
cd frontend\reactapp
npm install
npm start
```

The frontend will start on `http://localhost:3000`.

## Configuration

### Database Connection

All services connect to MySQL database:
- **Host**: localhost
- **Port**: 3306
- **Database**: taskflowdb
- **Username**: root
- **Password**: root

To change these settings:
- **Spring Boot**: Edit `src/main/resources/application.properties` in each service
- **.NET**: Edit `appsettings.json` or `appsettings.Development.json`

### Port Configuration

- Auth Service: 8080
- Admin Services: 8081
- Manager Service: 8082
- Team Leader Service: 8083
- Employee Service: Check `launchSettings.json`
- React Frontend: 3000

## Troubleshooting

### Java/Maven Issues

1. **Maven not found**: Use the Maven wrapper (`mvnw.cmd`) included in each Spring Boot project
2. **Java version**: Ensure JDK 21 is installed and configured
3. **Build errors**: Run `mvn clean install` to rebuild dependencies

### .NET Issues

1. **SDK not found**: Install .NET SDK 8.0
2. **NuGet restore**: Run `dotnet restore`
3. **Build errors**: Run `dotnet build` to see detailed errors

### Database Issues

1. **Connection refused**: Ensure MySQL is running
2. **Database not found**: Create the `taskflowdb` database and run the SQL migration scripts
3. **Authentication failed**: Check username/password in configuration files

### VS Code Issues

1. **Extensions not loading**: Restart VS Code after installing extensions
2. **Java language server**: Wait for the Java extension to download dependencies (first time only)
3. **OmniSharp not starting**: Check .NET SDK installation and restart VS Code

## Fixed Issues

The following issues have been resolved:

1. ✅ Fixed Spring Boot version from 4.0.1/4.0.2 to 3.3.5 (stable version)
2. ✅ Fixed incorrect dependency `spring-boot-starter-webmvc` → `spring-boot-starter-web`
3. ✅ Fixed test dependencies to use `spring-boot-starter-test`
4. ✅ Added missing connection string in .NET `appsettings.json`
5. ✅ Fixed namespace inconsistency in `EmployeeTaskService`
6. ✅ Created VS Code extensions.json with recommended extensions
7. ✅ Created VS Code settings.json with Java and C# configuration

## Next Steps

1. Install all recommended VS Code extensions
2. Ensure MySQL database is set up and running
3. Start all backend services
4. Start the React frontend
5. Access the application at `http://localhost:3000`

For API documentation:
- Spring Boot services: `http://localhost:{port}/swagger-ui.html` (if Swagger is enabled)
- .NET service: `http://localhost:{port}/swagger` (in development mode)
