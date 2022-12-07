import React from "react";
import { useApp } from "../../hooks/app";
import { makeStyles } from "@mui/styles";
import { Typography } from "@mui/material";
import Appbar from "../../components/appbar/Appbar";
import PageHeader from "../../components/page-header/PageHeader";

const useStyles = makeStyles({
  container: {
    gap: 10,
    marginTop: 30,
    display: "flex",
    flexDirection: "column",
  },
  image: {
    width: 200,
    borderRadius: 100,
    border: "1px solid #574fd7",
  },
});

const Home: React.FC = () => {
  const classes = useStyles();
  const { school } = useApp();

  return (
    <>
      <Appbar title="Início" />
      <PageHeader
        title={school?.name || "Escola"}
        description={`Confira as informações sobre a ${school?.name}`}
      />

      <div className={classes.container}>
        <img src={school?.brand} alt="brand" className={classes.image} />
        <Typography>
          Nome: <b>{school?.name}</b>
        </Typography>
        <Typography>
          CNPJ: <b>{school?.document}</b>
        </Typography>
        <Typography>
          Endereço:{" "}
          <b>
            {school?.address}, {school?.city}, {school?.state},{" "}
            {school?.country}
          </b>
        </Typography>
        <Typography>
          CEP: <b>{school?.zipcode}</b>
        </Typography>
      </div>
    </>
  );
};

export default Home;
