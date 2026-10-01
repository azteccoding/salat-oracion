import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Icon from "@/components/Icon";
import { JUTBA_PATH, esViernes } from "@/constants/jutbas";
import styles from "@/styles/site/Jutba.module.css";

// Botón flotante de audífonos en el inicio. Solo aparece los viernes (hora de México).
// El día se revisa en el navegador: el inicio se guarda ya armado y no sabe qué día es.
// Para probarlo otro día en tu computadora: http://localhost:3000/?probar=1
const BotonJutba = () => {
  const { query } = useRouter();
  const [visible, setVisible] = useState(false);
  const probar = process.env.NODE_ENV === "development" && query.probar === "1";

  useEffect(() => {
    setVisible(probar || esViernes());
  }, [probar]);

  if (!visible) return null;

  return (
    <Link href={probar ? `${JUTBA_PATH}?probar=1` : JUTBA_PATH} className={styles.flotante} data-no-print>
      <Icon name="headphones" size={22} />
      <span>Juṭba del viernes</span>
    </Link>
  );
};

export default BotonJutba;
