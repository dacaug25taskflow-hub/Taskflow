# TaskFlow - Implementation Status

## Completed

### Profile
- Profile fetches from database for all roles (Admin, Manager, Team Leader, Employee)
- Fixed Manager/TL User entities with Role relation for profile display
- Employee API uses uid from request (no hardcoded DEV_UID)
- Employee API URL: http (not https) for localhost

### Manager
- **Dashboard**: Projects list → click project → create personal tasks, editable Kanban
- **Projects**: Create tasks for Team Leaders, view-only Kanban (TL tasks)
- **Create Team**: Sidebar section – domain-specific teams, assign Team Leader
- Admin comment shown with project details
- Project deadline used for task dates
- Get team leaders, create team with domain + TL

### Team Leader
- **Dashboard**: Kanban of tasks assigned by Manager (editable)
- Removed "Tasks Overview – Features coming soon"
- **Queries**: Select Task (assigned by manager) instead of Project, with manager name
- Projects section: Kanban for project tasks

### Employee
- **Dashboard**: Only assigned tasks, click task → Kanban
- Removed My Tasks from sidebar
- **Queries**: Dropdowns for Team name, Task name, Manager name (from DB)
- Get query options API for raise-query form

### Backend
- Manager: GET /tasks/manager/{uid}, PUT /tasks/{id}/status, GET /team/team-leaders, POST /team/create
- TL: GET /tasks/assigned/{tlUid}
- Employee: GET /tasks/query-options?uid=X, uid param for tasks/queries/status
- Team entity: domain_id
- Project entity: comment, domain relation

### Database Migration (taskflowdb_migration.sql)
- team.domain_id
- task.parent_task_id
- team_member table
- query.task_id
- query.responded_by_uid

---

## How to Run

1. Start MySQL, run `taskflowdb.sql`, then `taskflowdb_migration.sql`
2. Start Auth (8080), Admin (8081), Manager (8082), TL (8083), Employee (7123)
3. Run frontend: `npm start` in frontend/reactapp
