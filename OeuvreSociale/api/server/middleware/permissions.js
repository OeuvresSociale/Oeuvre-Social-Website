// Define permissions
const permissions = {
    createRequest: 'createRequest',
    editRequest: 'editRequest',
    deleteRequest: 'deleteRequest',
    // Add more permissions as needed
};

// Map roles to permissions
const rolePermissions = {
    admin: [permissions.createRequest, permissions.editRequest, permissions.deleteRequest],
    tresorier: [permissions.createRequest, permissions.editRequest],
    member: [permissions.createRequest],
    employee:[],
    
};

// Middleware to check permissions
function checkPermission(permission) {
    return (req, res, next) => {
        const userRole = req.user.role; 
        const userPermissions = rolePermissions[userRole];
        
        if (!userPermissions || !userPermissions.includes(permission)) {
            return res.status(403).json({ error: 'Forbidden: you do not have permission' });
        }

        next();
    };
}


module.exports={
    checkPermission,
    permissions
}
