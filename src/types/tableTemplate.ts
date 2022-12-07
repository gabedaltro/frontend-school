export interface TableTemplate {
  id: string;
  description: string;
  originalId: string;
  width: number;
  notSearchable?: boolean;
  notFilterable?: boolean;
  notShow?: boolean;
  dataType?: 'number' | 'string';
}
