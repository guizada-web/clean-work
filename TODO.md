# TODO: Implement Role-Based Authentication and UI

## Backend Changes
- [ ] Add requireAdmin middleware to obra delete and put routes in obraRoutes.js
- [ ] Insert admin user into database (username: cleanwork, password: cleanwork7, role: admin)

## Frontend Changes
- [ ] Create AuthContext in frontend/src/contexts/AuthContext.jsx for managing auth state
- [ ] Update frontend/src/pages/Login.jsx to use backend API instead of localStorage
- [ ] Update frontend/src/pages/Register.jsx to use backend API instead of localStorage
- [ ] Update frontend/src/services/api.js to include JWT token in headers
- [ ] Update frontend/src/components/MapView.jsx to conditionally show admin features (delete/update buttons) based on user role
- [ ] Update frontend/src/pages/Home.jsx to conditionally show delete button for demandas based on user role

## Testing
- [ ] Test login as admin: should see all functions
- [ ] Test login as user: should see everything but no delete/manage functions
- [ ] Test registration of new users
