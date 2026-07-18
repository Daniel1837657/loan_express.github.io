export type LoanProduct = {
  id: string;
  name: string;
  min: number;
  max: number;
  terms: number[];
  rate: number;
};

export type EstadoSolicitud =
  | "borrador"
  | "enviada"
  | "documentacion_pendiente"
  | "en_revision"
  | "aprobada"
  | "rechazada"
  | "cancelada";
