import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.*;

import com.google.gson.Gson;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;

public class Main {
    public static void main(String[] args) {
        // Iniciolizar variables necesarias para el programa
        Scanner scanner = new Scanner(System.in);
        String monedaOrigen;
        double monto;
        String monedaDestino;
        Gson gson = new Gson();
        // Obtener lista de divisas existentes
        Set<Currency> listaDeDivisas = Currency.getAvailableCurrencies();

        // Etiqueta del loop principal para salir desde loops anidados
        outerLoop:
        while (true) {
            // Mensaje de bienvenida
            System.out.println("""
                    ***¡Bienvenido/a al conversor de divisas!***
                    Instrucciones: Ingresa la divisa de origen, el monto y la divisa de destino.
                    (USD) Dólar estadounidense
                    (EUR) Euro
                    (GBP) Libra esterlina
                    (MXN) Peso mexicano
                    (COP) Peso Colombiano
                    (ARS) Peso argentino
                    (CLP) Peso chileno
                    (PEN) Sol peruano
                    (JPY) Yen japonés
                    (KRW) Won sur-coreano
                    (CNY) Yuan chino
                    
                    Ingresa la divisa de origen:
                    """);
            // Bucles anidados para asegurarse que cada dato ingresado por el usuario esté correcto
            while (true) {
                monedaOrigen = scanner.nextLine().toUpperCase();
                String finalMonedaOrigen = monedaOrigen;
                // Verificar que el valor de monedaOrigen exista dentro de la listaDeDivisas
                if (listaDeDivisas.stream().anyMatch(c -> c.getCurrencyCode().equals(finalMonedaOrigen))) {
                    break;
                } else if (monedaOrigen.equals("SALIR")){
                    System.out.println("¡Hasta luego! Gracias por usar mi conversor de divisas.");
                    break outerLoop;
                } else {
                    System.out.println("Ingresa una opción válida");
                }
            }
            while (true) {
                try {
                    System.out.println("Ingresa el monto que quieres convertir: ");
                    String montoString = scanner.nextLine();
                    if (montoString.equalsIgnoreCase("SALIR")) {
                        System.out.println("¡Hasta luego! Gracias por usar mi conversor de divisas.");
                        break outerLoop;
                    }
                    monto = Double.parseDouble(montoString);
                    if (monto > 0) {
                        break;
                    } else {
                        System.out.println("Ingresa un monto positivo");
                    }
                } catch (NumberFormatException e) {
                    System.out.println("Ingresa un valor numérico");
                }
            }
            while (true) {
                System.out.println("Ingresa la divisa de destino: ");
                monedaDestino = scanner.nextLine().toUpperCase();
                String finalMonedaDestino = monedaDestino;
                if (listaDeDivisas.stream().anyMatch(c -> c.getCurrencyCode().equals(finalMonedaDestino))) {
                    break;
                } else if (monedaDestino.equals("SALIR")){
                    System.out.println("¡Hasta luego! Gracias por usar mi conversor de divisas.");
                    break outerLoop;
                }else {
                    System.out.println("Ingresa una opción válida");
                }
            }
            // Crear una instancia de la clase Solicitud
            Solicitud solicitud = new Solicitud();
            String resultado = solicitud.solicitud(monedaOrigen);

            try {
                // Convertir el JSON en un objeto de tipo Moneda
                Moneda moneda = gson.fromJson(resultado, Moneda.class);
                double tasa = moneda.conversion_rates().get(monedaDestino);
                // Obtener resultado de la multiplicación de la tasa y el monto
                double resultadoFinal = monto * tasa;
                // Formatear el resultado con dos decimales
                DecimalFormat formato = new DecimalFormat("#,##0.00");
                String resultadoFinalFormateado = formato.format(resultadoFinal);
                System.out.println("""
                        Divisa de origen:\s""" + monedaOrigen + """
                        \nDivisa de destino:\s""" + monedaDestino + """
                        \nMonto:\s""" + monto + """
                        \nTasa:\s""" + tasa + """
                        \nTotal:\s""" + resultadoFinalFormateado + """
                        """);
                try {
                    File file = new File("Historial-de-conversiones.txt");
                    Date fecha = new Date();
                    SimpleDateFormat formateador = new SimpleDateFormat("dd/MM/yyyy");
                    String fechaFormateada = formateador.format(fecha);
                    FileWriter escritor = new FileWriter(file, true);
                    escritor.write("""
                            Fecha de la conversión:\s""" + fechaFormateada + """
                            \nDivisa de origen:\s""" + monedaOrigen + """
                            \nDivisa de destino:\s""" + monedaDestino + """
                            \nMonto:\s""" + monto + """
                            \nTasa:\s""" + tasa + """
                            \nTotal:\s""" + resultadoFinalFormateado + """
                            \n
                            """);
                    escritor.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }

                System.out.println("Deseas hacer otra conversión? (si/no): ");
                String continuar = scanner.nextLine().toLowerCase();
                while (true) {
                    if (continuar.equals("no") || continuar.equals("n") || continuar.equals("salir")) {
                        System.out.println("¡Hasta luego! Gracias por usar mi conversor de divisas.");
                        break outerLoop;
                    } else if (continuar.equals("si") || continuar.equals("s")) {
                        break;
                    } else {
                        System.out.println("Ingresa una opción válida");
                        continuar = scanner.nextLine().toLowerCase();
                    }
                }
                System.out.println(resultadoFinal);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        // Cerrar escáner
        scanner.close();
    }
}