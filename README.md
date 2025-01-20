# **Conversor de Monedas**

## **Descripción**
Este repositorio contiene **dos versiones del conversor de monedas**:

1. **Versión Frontend**: Hecha con **React** y **TypeScript**, que envía solicitudes a una **API** creada con **Java** para obtener el resultado de la conversión.
2. **Versión Backend**: Hecha solo con **Java**, más cercana a lo requerido por el challenge.

### **Intenciones de desarrollo**
- **Primera versión**: Desplegar y compartir con otros estudiantes de **Alura**.
- **Segunda versión**: Cumplir con los requisitos del challenge y practicar más codificación en **Java**.

## **Cómo Usar**


### **Primera Versión**
Solo basta con abrir el enlace y comenzar a usar la app: https://wiusgh.github.io/AluraChallengeConversorDeMonedas/

#### **Características**
- **Interfaz sencilla y responsiva**.
- El **frontend** está desplegado en Github utilizando Github Pages.
- El **backend** está desplegado en Render utilizando Docker.
- Un **select** para seleccionar la divisa de origen.
- Un **select** para seleccionar la divisa de destino.
- Un **input** para ingresar el monto a convertir.
- Un **input** de solo lectura para ver el resultado de la conversión.
- **Manejo de errores** para:
  - Permitir solo el ingreso de valores numéricos.
  - Permitir solo un punto para ingresar valores decimales.
  - Asegurar que el monto no esté vacío o su valor sea 0.
- **Mensajes estilo modal** para informar al usuario sobre valores inválidos.

### **Segunda Versión**
Es necesario descargar el repositorio, abrir la carpeta **"challenge-de-alura"** y ejecutar el código en **IntelliJ** o **Visual Studio Code**.

#### **Características**
- Muestra un **menú** de bienvenida que indica cómo usar el programa.
- Solicita al usuario que ingrese:
  - La **divisa de origen**.
  - El **monto a convertir**.
  - La **divisa de destino**.
- Utiliza el paquete **"import java.util.Currency"** para obtener una lista de todas las divisas existentes, asegurando que el usuario pueda ingresar cualquier divisa válida.
- **Manejo de errores** para validar:
  - Cada valor solicitado antes de continuar.
  - Evitar errores por valores erróneos o inexistentes.
- Permite salir escribiendo **"salir"** desde cualquier parte del menú.
- Convierte los valores ingresados a mayúsculas o minúsculas según sea necesario para evitar errores.

---

**Hecho por** Wilscónidel Yánez.
