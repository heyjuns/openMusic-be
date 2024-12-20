class PlaylistsHandler {
  constructor(service, validator) {
    this.service = service;
    this.validator = validator;
  }

  async createPlaylist(request, h) {
    this.validator.validatePlaylistPayload(request.payload);
    const { name } = request.payload;
    const { id: owner } = request.auth.credentials;
    const playlistId = await this.service.createPlaylist({ name, owner });

    const response = h.response({
      status: 'success',
      message: 'Playlist berhasil ditambahkan',
      data: {
        playlistId,
      },
    });
    response.code(201);
    return response;
  }

  // eslint-disable-next-line no-unused-vars
  async getPlaylists(request, h) {
    const { id: owner } = request.auth.credentials;

    const playlists = await this.service.getPlaylists(owner);
    return {
      status: 'success',
      data: {
        playlists,
      },
    };
  }

  // eslint-disable-next-line no-unused-vars
  async deletePlaylistById(request, h) {
    const { id } = request.params;
    const { id: credentialId } = request.auth.credentials;
    await this.service.verifyPlaylistOwner(id, credentialId);
    await this.service.deletePlaylistById(id);

    return {
      status: 'success',
      message: 'Playlist berhasil dihapus',
    };
  }
}

module.exports = PlaylistsHandler;
