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
  {
    method: 'POST',
    path: '/playlists/{id}/songs',
    handler: (request, h) => handler.addSong(request, h),
    options: {
      auth: 'musicdb_jwt',
    },
  },
  {
    method: 'GET',
    path: '/playlists/{id}/songs',
    handler: (request, h) => handler.getSongsFromPlaylistHandler(request, h),
    options: {
      auth: 'musicdb_jwt',
    },
  },
  {
    method: 'DELETE',
    path: '/playlists/{id}/songs',
    handler: (request, h) => handler.deleteSongFromPlaylistByIdHandler(request, h),
    options: {
      auth: 'musicdb_jwt',
    },
  },
];

module.exports = routes;
