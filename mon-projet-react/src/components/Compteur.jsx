import { useState } from 'react';
import './Monstyle.css';

export default function Compteur() {
  const [compteur, setCompteur] = useState(0);

  return (
    <section id="center" className="carte compteur-section">
      <h3>Compteur</h3>
      <p className="compteur-display">
        Valeur actuelle : <span className="valeur-chiffre">{compteur}</span>
      </p>

      <div className="compteur-boutons">
        <button
          type="button"
          className="counter"
          // onClick={() => setCompteur(function (compteur) { return compteur + 1; })}
          onClick={() => {
            setCompteur(compteur + 1);
            console.log('Compteur incrémenté :', compteur + 1);
          }}
        >
          ➕ Incrémenter
        </button>

        <button
          type="button"
          className="counter"
          onClick={() => {
            setCompteur(compteur - 1);
            console.log('Compteur décrémenté :', compteur - 1);
          }}
        >
          ➖ Décrémenter
        </button>

        <button
          type="button"
          className="counter reset-btn"
          onClick={() => {
            setCompteur(0);
            console.log('Compteur réinitialisé :', 0);
          }}
        >
          🔄 Réinitialiser
        </button>
      </div>
    </section>
  );
}
