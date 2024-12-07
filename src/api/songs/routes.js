const routes = (handler) => [
  {
    method: 'POST',
    path: '/songs',
    handler: (request, h) => handler.create(request, h),
  },
  {
    method: 'GET',
    path: '/songs',
    handler: () => handler.get(),
  },
  {
    method: 'GET',
    path: '/songs/{id}',
    handler: (request, h) => handler.getById(request, h),
  },
  {
    method: 'PUT',
    path: '/songs/{id}',
    handler: (request, h) => handler.putById(request, h),
  },
  {
    method: 'DELETE',
    path: '/songs/{id}',
    handler: (request, h) => handler.deleteById(request, h),
  },
];

module.exports = routes;
