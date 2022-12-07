export function getTemplateColumns(tableTemplate: Array<any>): string {
  let template = "";
  tableTemplate.forEach((item) => {
    template = template + item.width + "px ";
  });
  return template;
}
