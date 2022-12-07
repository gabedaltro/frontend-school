import { TableTemplate } from "../../types/tableTemplate";

export const teacherTableTemplate: TableTemplate[] = [
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
    id: "academic_title",
    description: "Registro Acadêmico",
    originalId: "academic_title",
    width: 130,
    notSearchable: true,
  },
  {
    id: "discipline_teaches",
    description: "Disciplina",
    originalId: "discipline_teaches",
    width: 60,
  },
];
