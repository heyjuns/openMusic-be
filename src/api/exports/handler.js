class ExportsHandler {
  constructor(service, validator, rabbitService) {
    this.service = service;
    this.validator = validator;
    this.rabbitService = rabbitService;
  }

  async postExportNotesHandler(request, h) {
    this.validator.validateExportNotesPayload(request.payload);
    const { id: credentialId } = request.auth.credentials;
    const { id } = request.params;
    await this.service.verifyPlaylistOwner(id, credentialId);

    const message = {
      userId: request.auth.credentials.id,
      targetEmail: request.payload.targetEmail,
      id,
    };
    console.log(message);
    await this.rabbitService.sendMessage('export:playlists', JSON.stringify(message));

    const response = h.response({
      status: 'success',
      message: 'Permintaan Anda dalam antrean',
    });
    response.code(201);
    return response;
  }
}

module.exports = ExportsHandler;
