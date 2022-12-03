import React from "react";
import SidebarItem from "../SidebarItem";
import { Collapse } from "@mui/material";
import { useSidebar } from "../hook/useSidebar";
import SidebarItemExpendable from "../SidebarItemExpendable";
import { LibraryBooks, Note, Person } from "@mui/icons-material";

const Registration: React.FC = () => {
  const { handleCollapseClick, collapsible } = useSidebar();

  return (
    <>
      <SidebarItemExpendable
        onClick={() => handleCollapseClick("registration")}
        icon={<LibraryBooks style={{ color: "#fff" }} />}
        text="Cadastros"
        opened={collapsible.registration}
      />
      <Collapse in={collapsible.registration}>
        <SidebarItem nested={5} to="/class" icon={<Person />} text="Turma" />

        <SidebarItem
          icon={<Person />}
          text="Alunos"
          to="/students"
          nested={5}
        />

        <SidebarItem
          nested={5}
          to="/teachers"
          icon={<Person />}
          text="Professores"
        />

        <SidebarItem
          nested={5}
          to="/report-card"
          icon={<Note />}
          text="Boletim"
        />
      </Collapse>
    </>
  );
};

export default Registration;
