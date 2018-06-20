export interface JwtResponse {
  Id_CuentaAdmin?: string;
  NombreAdmin?: string;
  ApellidoPaterno?: string;
  ApellidoMaterno?: string;
  CorreoElectronico?: string;
  TipoCuenta?: string;
  Empresa?: string;
  CorreoEnvio?: string;
  ContraEnvio?: string;
  Fecha?: string;
  error?: string;
  respuesta?: string;
  data?: {
    iat?: string;
    jti?: string;
    iss?: string;
    nbf?: string;
    exp?: string;
    data?: {
      userId?:string;
      userName?: string;
    };
  };
  jwt?: string;
}
