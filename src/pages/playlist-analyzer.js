/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import Theme from "../components/theme";
import Analytics from "../components/analytics.component";
import { useParams } from "react-router-dom";


const AnalyticsPage = () => {

  const { id } = useParams();

  return (
    <>
      <Theme>
        <Analytics playlist_id={id} />
      </Theme>
    </>
  );
};

export default AnalyticsPage;
