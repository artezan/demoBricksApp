export interface Ingress {
  Id_Inquilino?: string;
  NombreInquilino?: string;
  ApellidoPaterno?: string;
  ApellidoMaterno?: string;
  Id_Rentado?: string;
  Id_Depa?: string;
  Direccion?: string;
  Interior?: string;
  Concepto?: string;
  FechaRegistro?: string;
  HoraRegistro?: string;
  FechaPagado?: string;
  HoraPagado?: string;
  Total?: string;
  Periodo?: string;
  Pagado?: string;
  Id_Pago?: string;
  NumeroRecibo?: string;
  SaldoAnteriorDepa?: string;
  SaldoDepartamento?: string;
  NumeroCheque?: string;
  EsParcialOFiniquito?: string;
  error?;
  Mes?;
  Year?;
}
