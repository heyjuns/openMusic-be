/* eslint-disable camelcase */
const albumDBtoModel = ({
  id,
  name,
  year,
  cover,
  // created_at,
  // updated_at,
}) => ({
  id,
  name,
  year,
  coverUrl: cover,
  // createdAt: created_at,
  // updatedAt: updated_at,
});

const songDBtoModel = ({
  id,
  title,
  year,
  performer,
  genre,
  duration,
  album_id,
  // created_at,
  // updated_at,
}) => ({
  id,
  title,
  year,
  performer,
  genre,
  duration,
  albumId: album_id,
  // createdAt: created_at,
  // updatedAt: updated_at,
});

const playlistDBtoModel = ({
  id,
  name,
  owner,
}) => ({
  id,
  name,
  username: owner,
});

module.exports = { albumDBtoModel, songDBtoModel, playlistDBtoModel };
