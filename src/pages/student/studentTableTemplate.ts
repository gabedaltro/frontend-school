import { TableTemplate } from "../../types/tableTemplate";

export const studentTableTemplate: TableTemplate[] = [
  {
    id: "id",
    description: "ID",
    originalId: "id",
    width: 100,
  },
  {
    id: "name",
    description: "Nome",
    originalId: "name",
    width: 200,
  },
  {
    id: "document",
    description: "Documento",
    originalId: "document",
    width: 130,
  },
  {
    id: "registration_number",
    description: "Número do Registro",
    originalId: "registration_number",
    width: 130,
    notSearchable: true,
  },
  {
    id: "module",
    description: "Módulo",
    originalId: "module",
    width: 60,
  },
];
