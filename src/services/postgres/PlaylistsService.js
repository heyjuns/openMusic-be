// eslint-disable-next-line import/no-extraneous-dependencies
const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const AuthorizationError = require('../../exceptions/AuthorizationError');
const { playlistDBtoModel } = require('../../utils');

class PlaylistsService {
  constructor() {
    this.pool = new Pool();
  }

  async createPlaylist({ name, owner }) {
    const id = `playlist-${nanoid(16)}`;
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;
    const query = {
      text: 'INSERT INTO Playlists VALUES($1, $2, $3, $4, $5) RETURNING id',
      values: [id, name, owner, createdAt, updatedAt],
    };

    const result = await this.pool.query(query);

    if (!result.rows[0].id) {
      throw new InvariantError('Playlist gagal ditambahkan');
    }

    return result.rows[0].id;
  }

  async getPlaylists(id) {
    const query = {
      text: `SELECT playlists.id, playlists.name, users.username AS owner
             FROM playlists
             JOIN users ON playlists.owner = users.id
             WHERE playlists.owner = $1`,
      values: [id],
    };
    const result = await this.pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Playlist tidak ditemukan');
    }

    return result.rows.map(playlistDBtoModel);
  }

  async deletePlaylistById(id) {
    const query = {
      text: 'DELETE FROM playlists WHERE id = $1 RETURNING id',
      values: [id],
    };

    const result = await this.pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Playlist gagal dihapus. Id tidak ditemukan');
    }
  }

  async addSongToPlaylist({ playlistId, songId }) {
    const id = `song-${nanoid(16)}`;
    const query = {
      text: `WITH song_check AS (
               SELECT id FROM songs WHERE id = $1
             )
             INSERT INTO playlist_songs (id, playlist_id, song_id)
             SELECT $2, $3, id FROM song_check
             RETURNING id`,
      values: [songId, id, playlistId],
    };

    const result = await this.pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Lagu tidak ditemukan atau gagal ditambahkan ke playlist');
    }
  }

  async getSongsFromPlaylist({ credentialId, playlistId }) {
    const queryPlaylist = {
      text: `SELECT playlists.id, playlists.name, users.username AS owner
             FROM playlists
             JOIN users ON playlists.owner = users.id
             WHERE playlists.owner = $1 AND playlists.id = $2`,
      values: [credentialId, playlistId],
    };

    const querySongs = {
      text: `SELECT songs.id, songs.title, songs.performer
             FROM songs
             JOIN playlist_songs ON playlist_songs.song_id = songs.id
             WHERE playlist_songs.playlist_id = $1`,
      values: [playlistId],
    };

    const [resultPlaylist, resultSongs] = await Promise.all([
      this.pool.query(queryPlaylist),
      this.pool.query(querySongs),
    ]);

    if (!resultPlaylist.rows.length) {
      throw new NotFoundError('Playlist tidak ditemukan');
    }

    return {
      ...playlistDBtoModel(resultPlaylist.rows[0]),
      songs: resultSongs.rows,
    };
  }

  async deleteSongFromPlaylistById(id) {
    const query = {
      text: 'DELETE FROM Playlist_songs WHERE song_id = $1 RETURNING id',
      values: [id],
    };
    console.log(query);
    const result = await this.pool.query(query);

    if (!result.rows.length) {
      throw new InvariantError('Song Playlist gagal dihapus. Id tidak ditemukan');
    }
  }

  async verifyPlaylistOwner(id, owner) {
    const query = {
      text: 'SELECT * FROM playlists WHERE id = $1',
      values: [id],
    };
    const result = await this.pool.query(query);
    if (!result.rows.length) {
      throw new NotFoundError('Playlist tidak ditemukan');
    }
    const playlist = result.rows[0];
    if (playlist.owner !== owner) {
      throw new AuthorizationError('Anda tidak berhak mengakses resource ini');
    }
  }
}

module.exports = PlaylistsService;
