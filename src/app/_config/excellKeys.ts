export const ExcellKeys: { name: string; keys: string[] }[] = [
  {
    name: 'Condominio',
    keys: [
      'Direccion',
      'ciudad',
      'Colonia',
      'Saldo',
      'Banco',
      'Cuenta',
      'NumRecibo'
    ]
  },
  {
    name: 'Propietarios',
    keys: [
      'Propietario',
      'nombre',
      'apellidoP',
      'apellidoM',
      'correoPropietario',
      'telefonoDepa',
      'telefonoCel',
      'telefonoOficina'
    ]
  },
  {
    name: 'Departamentos',
    keys: [
      'Propietario',
      'Interior',
      'DiaExtemporaneo',
      'CuotaMensual',
      'CuotaExtraordinario',
      'LugaresEstacionamiento',
      'SaldoDepartamento',
      'Referencia'
    ]
  }
];
