import { useState } from "react";
import axios from "axios";
import style from "./Converter.module.css";
import { FaRegGrinWink } from "react-icons/fa";

const Converter = () => {
  // Agregar variables para manipular el estado y enviar datos a la API
  const [value, setValue] = useState("");
  const [firstCurrency, setFirstCurrency] = useState("EUR");
  const [result, setResult] = useState((0.0).toPrecision(3));
  const [secondCurrency, setSecondCurrency] = useState("USD");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const regEx = /^[0-9]*\.?[0-9]*$/;
  // Lista de las divisas más comunes y sus símbolos
  const currencies: { [key: string]: string } = {
    USD: "$",
    EUR: "€",
    GBP: "£",
    ARS: "$",
    BOB: "Bs",
    BRL: "R$",
    CLP: "$",
    COP: "$",
    CRC: "₡",
    CUP: "₱",
    DOP: "RD$",
    PEN: "S/",
    VEF: "Bs",
    GTQ: "Q",
    HNL: "L",
    MXN: "$",
    NIO: "C$",
    PAB: "B/.",
    PYG: "₲",
    UYU: "$U",
    VES: "Bs",
    JPY: "¥",
    AUD: "A$",
    CAD: "C$",
    CNY: "¥",
    CHF: "CHF",
    INR: "₹",
    RUB: "₽",
    ZAR: "R",
    KRW: "₩",
    HKD: "HK$",
    SGD: "S$",
    NZD: "NZ$",
    SEK: "kr",
    NOK: "kr",
    DKK: "kr",
    PLN: "zł",
    TRY: "₺",
    HUF: "Ft",
    IDR: "Rp",
    ILS: "₪",
    MYR: "RM",
    THB: "฿",
    PHP: "₱",
    CZK: "Kč",
    VND: "₫",
    EGP: "£",
    SAR: "﷼",
    NGN: "₦",
    KWD: "د.ك",
    AED: "د.إ",
    QAR: "﷼",
    JOD: "د.ا",
  };

  // Función para solo permitir valores numéricos y un punto
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (regEx.test(inputValue)) {
      setError("");
      if (value[0] === "0") {
        setValue(inputValue);
      }
      setValue(inputValue);
    } else {
      setError("Solo se permiten números y un solo punto para los decimales");
    }
  };

  // Funciones para cambiar el símbolo de las divisas
  const handleFirstCurrencyChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setError("");
    setFirstCurrency(e.target.value);
  };

  const handleSecondCurrencyChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setError("");
    setSecondCurrency(e.target.value);
  };

  // Funcion que envía información a la API para hacer la conversión
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value === "" || isValueZero(value)) {
      setError("Ingresa un valor");
      return;
    } else {
      setError("");
    }
    const form = e.target as HTMLFormElement;
    const inputValue = (form.elements[0] as HTMLInputElement).value;

    setLoading(true);

    try {
      const response = await axios.post(
        "https://currencyconverterapi-xyih.onrender.com/convert",
        {
          fromCurrency: firstCurrency,
          toCurrency: secondCurrency,
          amount: inputValue,
        }
      );
      setResult(
        response.data.convertedAmount
          .toFixed(2)
          .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
      );
    } catch (error) {
      console.error("Error in Axios request:", error);
    } finally {
      setLoading(false);
    }
  };

  // Función para verificar si el valor es cero
  const isValueZero = (value: string) => {
    for (let i = 0; i < value.length; i++) {
      if (value[i] !== "0" && value[i] !== ".") {
        return false;
      }
    }
    return true;
  };

  return (
    <div className={style.converter}>
      {/* Muestra mensaje mientras se realiza la solicitud a la API */}
      {error && (
        <div className={style.error}>
          <p>{error}</p>
        </div>
      )}
      {loading ? (
        <div className={style.loading}>
          <h4>Cargando...</h4>
        </div>
      ) : (
        <div className={style.formContainer}>
          <div>
            <form onSubmit={handleSubmit}>
              <div className={style.inputContainer1}>
                <input
                  className={style.input}
                  type="text"
                  value={value}
                  placeholder={currencies[firstCurrency]}
                  onChange={handleChange}
                />
                <select
                  value={firstCurrency}
                  onChange={handleFirstCurrencyChange}
                >
                  {Object.keys(currencies).map((currency) => (
                    <option key={currency} value={currency}>
                      {currency}
                    </option>
                  ))}
                </select>
              </div>
              <div className={style.inputContainer2}>
                <input
                  className={style.input + " " + style.output}
                  type="text"
                  readOnly
                  value={currencies[secondCurrency] + " " + result}
                />
                <select
                  value={secondCurrency}
                  onChange={handleSecondCurrencyChange}
                >
                  {Object.keys(currencies).map((currency) => (
                    <option key={currency} value={currency}>
                      {currency}
                    </option>
                  ))}
                </select>
              </div>
              <input className={style.submit} type="submit" value="Convertir" />
            </form>
          </div>
          <div className={style.message}>
            <p>
              El servidor se apaga temporalmente por inactividad y podría tardar
              un par de minutos en reactivarse pero después de la primera
              solicitud podrás hacer conversiones casi al instante.
            </p>
            <span>
              <FaRegGrinWink />
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Converter;
