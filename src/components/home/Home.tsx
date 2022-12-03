import React from "react";
import Appbar from "../appbar/Appbar";
import { Typography } from "@mui/material";
import PageHeader from "../page-header/PageHeader";
import { makeStyles } from "@mui/styles";

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

  return (
    <div>
      <Appbar title="Início" />
      <PageHeader
        title="Escola Facs"
        description="Confira as informações sobre a Escola Facs"
      />

      <div className={classes.container}>
        <img src="/assets/brand.png" alt="brand" className={classes.image} />
        <Typography>
          Nome: <b>Escola Facs</b>
        </Typography>
        <Typography>
          CNPJ: <b>00.000.000/0001-00</b>
        </Typography>
        <Typography>
          Endereço: <b>Rua XXXXX, Nº 3, Salvador, Bahia.</b>
        </Typography>
      </div>
    </div>
  );
};

export default Home;
