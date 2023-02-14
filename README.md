# Módulo de Gestión de Usuarios de Sistema Bancario de Rick and Morty

Este es un módulo de gestión de usuarios que permite a los personajes de la serie Rick and Morty acceder a un sistema bancario. El módulo utiliza Supabase para la autenticación y autorización de usuarios, e incluye opciones de inicio de sesión y cierre de sesión a través de redes sociales.

Cada usuario tiene una relación con las siguientes tablas:

- Cuentas bancarias
- Préstamos

Los usuarios pueden realizar operaciones bancarias, incluyendo depósitos, retiros y transferencias de dinero a otros usuarios. También pueden pagar sus cuotas mensuales o hacer abonos a sus préstamos. Las notificaciones se disparan en tiempo real para informar a los usuarios de cualquier cambio en su cuenta bancaria.

Toda la información que no esté disponible en el API de Rick and Morty, como cuentas bancarias, préstamos, pagos y cuotas, se maneja con archivos JSON perfectamente estructurados y documentados sobre cómo utilizarlos.

Para iniciar el módulo, simplemente clone el repositorio y siga las instrucciones de instalación. Asegúrese de leer la documentación para comprender cómo utilizar todas las funcionalidades del módulo.

## Instrucciones de Instalación

1. Clone el repositorio en su computadora local.
2. Configure Supabase para la autenticación y autorización de usuarios.
3. Configure las tablas de cuentas bancarias y préstamos en Supabase.
4. Cargue los archivos JSON de cuentas bancarias, préstamos, pagos y cuotas en el sistema.
5. Inicie el servidor y abra la página web para acceder al módulo.

## Documentación

Consulte la documentación proporcionada en la carpeta "docs" para comprender cómo utilizar todas las funcionalidades del módulo, incluyendo la autenticación de usuarios, las operaciones bancarias y las notificaciones en tiempo real. Además, se proporciona información detallada sobre cómo estructurar y utilizar los archivos JSON para gestionar la información de cuentas bancarias, préstamos y pagos.
