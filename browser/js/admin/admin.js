app.config(function ($stateProvider) {
    $stateProvider.state('admin', {
        url: '/admin',
        templateUrl: 'js/admin/admin.html'
    });
});

// Product management
//  Create and edit products with name, description, price and one or more photos
//  Create categories for items, each item can have multiple categories
//  Manage the availability of a product. If a product is no longer available, users will not see it while browsing, but they can view the product detail page if they've ordered it previously or have a direct link. On that product detail page, it should say "Currently Unavailable"
//  Add/remove categories from items
// Order management
//  View a list of all orders
//  Filter orders by status (Created, Processing, Cancelled, Completed)
//  Change the status of the order (Created -> Processing, Processing -> Cancelled || Completed)
//  View details of a specific order
// User management
//  Promote other user accounts to have admin status
//  Delete a user
//  Trigger password reset for a user (next time they successfully log in—with their old password—they are prompted for a new one)