# FASE 0 — Base sólida (check rápido)

Antes de auth, asegúrate de tener:

Express + TS andando

MySQL con pool

Estructura tipo:

routes

controllers

services

👉 Pregunta para vos:

¿Dónde pondrías la lógica de login: route, controller o service?
(Spoiler mental: no en la route).

## 🧩 FASE 1 — Modelo de Usuario (sin auth todavía)

Nada de tokens aún.

Objetivo

Tener usuarios persistidos.

Cosas a pensar:

Tabla users

Campos mínimos:

id

email (único)

password (⚠️ todavía no plain text)

created_at

👉 Preguntas guía:

¿Por qué el email debería ser UNIQUE a nivel DB y no solo en código?

¿El password se guarda como string común?

## 🧩 FASE 2 — Registro (register)

Acá empieza la magia.

Flujo mental:

Llega email + password

Validás datos

Hasheás password

Guardás usuario

Respondés algo seguro

👉 Preguntas clave:

¿En qué capa debería vivir el hash?

¿Qué NO deberías devolver nunca en la response?

¿Qué pasa si el email ya existe?

💡 Tip: acá NO usás JWT todavía.

## 🧩 FASE 3 — Login

Autenticación real.

Flujo:

Buscar usuario por email

Comparar password vs hash

Si coincide → OK

Si no → error genérico

👉 Pensalo bien:

¿Conviene decir “email incorrecto” o “credenciales inválidas”?

¿Por qué?

## 🧩 FASE 4 — JWT (identidad)

Ahora sí, identidad sin estado.

Conceptos:

Token ≠ sesión

El token representa quién sos, no qué podés hacer

👉 Preguntas guía:

¿Qué info mínima pondrías en el payload?

¿Dónde guardás el secret?

¿Cuánto debería durar un token en desarrollo?

## 🧩 FASE 5 — Middleware de autenticación

Acá el backend se pone serio.

Objetivo

Proteger rutas.

Flujo mental:

Leer header Authorization

Verificar token

Extraer usuario

Dejar pasar o cortar

👉 Preguntas:

¿Qué hace el middleware si no hay token?

¿Dónde guarda el user para que lo use el controller?

¿El middleware debería hablar con la DB?

## 🧩 FASE 6 — Ruta protegida

Probar que todo funcione.

Ejemplo conceptual:

/profile

/tasks

👉 Desafío:

Hacer una ruta que sin token falla y con token funciona.

🧠 Regla de oro durante todo el proceso

Si te preguntás:

“¿Esto va en la route o en el service?”

La respuesta casi siempre es:
👉 service