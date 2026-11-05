# ALMA — Frontend de e-commerce

Frontend React con Redux Toolkit, conectado a la API Spring Boot del proyecto `TPO-API-E-commerce-estetica`.

## Desarrollo local

1. Iniciá el backend en `http://localhost:8080`.
2. Desde esta carpeta, instalá dependencias con `npm install` si todavía no lo hiciste.
3. Ejecutá `npm run dev` y abrí `http://localhost:5173`.

Vite reenvía las solicitudes `/api` al backend en el puerto `8080`. Para validar el frontend, usá `npm run build` y `npm run lint`.

## Funcionalidades conectadas

- Registro e inicio de sesión con JWT; el token se envía en el encabezado `Authorization: Bearer`.
- Catálogo y categorías desde la API.
- Perfil, carrito y favoritos asociados a la cuenta y sincronizados desde Redux con el backend.
- Confirmación de compra persistida como pedido; el backend valida el stock, calcula el envío y descuenta existencias.
- El carrito de invitado se conserva localmente; el carrito de cada cuenta se persiste en el backend.

## Endpoints de cuenta utilizados

| Método | Endpoint | Uso |
|---|---|---|
| `POST` | `/api/auth/register` | Crear cuenta |
| `POST` | `/api/auth/login` | Iniciar sesión |
| `GET` | `/api/auth/me` | Cargar perfil |
| `GET`, `PUT` | `/api/carrito` | Consultar y guardar carrito |
| `GET`, `PUT` | `/api/favoritos` | Consultar y guardar favoritos |
| `GET`, `POST` | `/api/pedidos` | Consultar pedidos y confirmar una compra |
