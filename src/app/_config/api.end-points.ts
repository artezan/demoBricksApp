const urlAPI = 'http://chobezin.com/php/CondominiosAdmin/';
const condoGet = 'mostrarCondominios.php?json=';
const propietariesGet = 'mostrarPropietarios.php?json=';
const apartGet = 'mostrarDepas.php?json=';
const renterGet = 'mostrarInquilinos.php?json=';
const paymentsGet = 'mostrarPagos.php?json=';
const providerGet = 'mostrarProveedores.php?json=';
const servicesGet = 'mostrarServicios.php?json=';
const expensesGet = 'mostrarEgresos.php?json=';

export const END_POINT = Object.freeze({
  CONDO_GET: urlAPI + condoGet,
  PROPIETARIES_GET: urlAPI + propietariesGet,
  APART_GET: urlAPI + apartGet,
  RENTER_GET: urlAPI + renterGet,
  PAYMENTS_GET: urlAPI + paymentsGet,
  PROVIDER_GET: urlAPI + providerGet,
  SERVICE_GET: urlAPI + servicesGet,
  EXPENSES_GET: urlAPI + expensesGet,
});
