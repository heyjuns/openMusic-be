const routes = (handler) => [
  {
    method: 'POST',
    path: '/users',
    handler: (request, h) => handler.create(request, h),
  },
  {
    method: 'GET',
    path: '/users/{id}',
    handler: (request, h) => handler.getById(request, h),
  },
];

module.exports = routes;
