const routes = (handler) => [
  {
    method: 'POST',
    path: '/playlists',
    handler: (request, h) => handler.createPlaylist(request, h),
    options: {
      auth: 'musicdb_jwt',
    },
  },
  {
    method: 'GET',
    path: '/playlists',
    handler: (request, h) => handler.getPlaylists(request, h),
    options: {
      auth: 'musicdb_jwt',
    },
  },
  {
    method: 'DELETE',
    path: '/playlists/{id}',
    handler: (request, h) => handler.deletePlaylistById(request, h),
    options: {
      auth: 'musicdb_jwt',
    },
  },
  // {
  //   method: 'POST',
  //   path: '/playlists/{id}/songs',
  //   handler: (request, h) => handler.create(request, h),
  // },
  // {
  //   method: 'GET',
  //   path: '/playlists/{id}/songs',
  //   handler: () => handler.get(),
  // },
  // {
  //   method: 'DELETE',
  //   path: '/playlists/{id}/songs',
  //   handler: (request, h) => handler.deleteById(request, h),
  // },
];

module.exports = routes;
