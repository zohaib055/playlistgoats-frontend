/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import Theme from "../components/theme";
import ArtistList from "../components/stats/artist.component";

const SavedPlaylistsPage = () => {
  return (
    <>
      <Theme>
        <ArtistList />
      </Theme>
    </>
  );
};

export default SavedPlaylistsPage;
