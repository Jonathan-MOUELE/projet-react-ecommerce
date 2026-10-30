export default function BarreRecherche({ valeur, onChange, onEffacer, inputRef }) {
  return (
    <div style={{ display: "flex", gap: "8px", margin: "16px 0" }}>
      <input
        ref={inputRef}
        type="text"
        placeholder='Rechercher un produit… (raccourci clavier "/")'
        value={valeur}
        onChange={(e) => onChange(e.target.value)}
        style={{
          flex: 1,
          padding: "10px 14px",
          borderRadius: "6px",
          border: "1px solid #cbd5e1",
          fontSize: "1rem",
        }}
      />
      <button
        type="button"
        className="counter reset-btn"
        onClick={onEffacer}
        disabled={!valeur}
        style={{ opacity: !valeur ? 0.6 : 1 }}
      >
        Effacer
      </button>
    </div>
  );
}
