/* eslint-disable camelcase */
const albumDBtoModel = ({
  id,
  name,
  year,
  // created_at,
  // updated_at,
}) => ({
  id,
  name,
  year,
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

module.exports = { albumDBtoModel, songDBtoModel };
