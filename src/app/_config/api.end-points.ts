const urlAPI = 'http://chobezin.com/php/CondominiosAdmin/';
const condoGet = 'mostrarCondominios.php?json=';
const condoNew = 'registrarCondominio.php?json=';
const condoEdit = 'modificarCondominio.php?json=';
const propietariesGet = 'mostrarPropietarios.php?json=';
const propietariesNew = 'registrarPropietario.php?json=';
const propietariesEdit = 'modificarPropietario.php?json=';
const apartGet = 'mostrarDepas.php?json=';
const apartNew = 'registrarDepa.php?json=';
const apartEdit = 'modificarDepartamento.php?json=';
const renterGet = 'mostrarInquilinos.php?json=';
const renterNew = 'registrarInquilino.php?json=';
const renterEdit = 'editarInquilino.php?json=';
const paymentsGet = 'mostrarPagos.php?json=';
const providerGet = 'mostrarProveedores.php?json=';
const providerNew = 'registrarProveedor.php?json=';
const providerEdit = 'modificarProveedor.php?json=';
const servicesGet = 'mostrarServicios.php?json=';
const servicesNew = 'registrarServicio.php?json=';
const servicesEdit = 'modificarServicio.php?json=';
const egressGet = 'mostrarEgresos.php?json=';
const egressFixed = 'registrarEgreso.php?json=';
const egressVar = 'registrarServicioVariable.php?json=';

export const END_POINT = ({
  // condo
  CONDO_GET: urlAPI + condoGet,
  CONDO_NEW: urlAPI + condoNew,
  CONDO_EDIT: urlAPI + condoEdit,
  // pro
  PROPIETARIES_GET: urlAPI + propietariesGet,
  PROPIETARIES_NEW: urlAPI + propietariesNew,
  PROPIETARIES_EDIT: urlAPI + propietariesEdit,
  // apart
  APART_GET: urlAPI + apartGet,
  APART_NEW: urlAPI + apartNew,
  APART_EDIT: urlAPI + apartEdit,
  // renter
  RENTER_GET: urlAPI + renterGet,
  RENTER_NEW: urlAPI + renterNew,
  RENTER_EDIT: urlAPI + renterEdit,
  // payment ingress
  PAYMENTS_GET: urlAPI + paymentsGet,
  // provider
  PROVIDER_GET: urlAPI + providerGet,
  PROVIDER_NEW: urlAPI + providerNew,
  PROVIDER_EDIT: urlAPI + providerEdit,
  // service
  SERVICE_GET: urlAPI + servicesGet,
  SERVICE_NEW: urlAPI + servicesNew,
  SERVICE_EDIT: urlAPI + servicesEdit,
  // egress
  EGRESS_GET: urlAPI + egressGet,
  EGRESS_FIXED: urlAPI + egressFixed,
  EGRESS_VAR: urlAPI + egressVar,
});
