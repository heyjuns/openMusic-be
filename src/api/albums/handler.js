class AlbumsHandler {
  constructor(service, validator, storageService) {
    this.service = service;
    this.validator = validator;
    this.storageService = storageService;
  }

  async create(request, h) {
    this.validator.validateAlbumPayload(request.payload);
    const { name, year } = request.payload;

    const albumId = await this.service.createAlbum({ name, year });

    const response = h.response({
      status: 'success',
      message: 'Album berhasil ditambahkan',
      data: {
        albumId,
      },
    });
    response.code(201);
    return response;
  }

  // eslint-disable-next-line no-unused-vars
  async getById(request, h) {
    const { id } = request.params;
    const album = await this.service.getAlbumById(id);
    return {
      status: 'success',
      data: {
        album,
      },
    };
  }

  // eslint-disable-next-line no-unused-vars
  async putById(request, h) {
    this.validator.validateAlbumPayload(request.payload);
    const { id } = request.params;

    await this.service.editAlbumById(id, request.payload);

    return {
      status: 'success',
      message: 'Album berhasil diperbarui',
    };
  }

  // eslint-disable-next-line no-unused-vars
  async deleteById(request, h) {
    const { id } = request.params;
    await this.service.deleteAlbumById(id);

    return {
      status: 'success',
      message: 'Album berhasil dihapus',
    };
  }

  async postUploadImageHandler(request, h) {
    const { cover } = request.payload;
    const { id } = request.params;
    console.log(id);
    this.validator.validateImageHeaders(cover.hapi.headers);

    const filename = await this.storageService.writeFile(cover, cover.hapi);
    const fileLocation = `http://${process.env.HOST}:${process.env.PORT}/upload/images/${filename}`;
    console.log(fileLocation);

    const responseUpdateId = await this.service.updateAlbumCoverById(id, fileLocation);
    console.log(responseUpdateId);

    const response = h.response({
      status: 'success',
      message: 'Gambar berhasil diunggah',
    });
    response.code(201);
    return response;
  }
}

module.exports = AlbumsHandler;
