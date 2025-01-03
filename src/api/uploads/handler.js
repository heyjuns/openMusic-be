class UploadsHandler {
  constructor(service, validator) {
    this.service = service;
    this.validator = validator;
  }

  async postUploadImageHandler(request, h) {
    const { cover } = request.payload;
    console.log(cover);
    this.validator.validateImageHeaders(cover.hapi.headers);

    const filename = await this.service.writeFile(cover, cover.hapi);

    const response = h.response({
      status: 'success',
      data: {
        fileLocation: `http://${process.env.HOST}:${process.env.PORT}/upload/images/${filename}`,
      },
    });
    response.code(201);
    return response;
  }
}

module.exports = UploadsHandler;
