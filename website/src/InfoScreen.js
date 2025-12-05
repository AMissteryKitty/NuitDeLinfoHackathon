import React from 'react';

export default function InfoScreen({ navigate }) {
  return (
    <div style={{ textAlign: 'center', margin: '50px' }}>
      <h2>À propos du NIRD</h2>
      <p>
        Le NIRD (Numérique Inclusif, Responsable et Durable) permet aux établissements scolaires de gagner en autonomie et de lutter contre l’obsolescence numérique.
      </p>
      <a href="https://nird.forge.apps.education.fr/" target="_blank" rel="noreferrer">
        Visiter le site officiel
      </a>
      <br />
      <button onClick={() => navigate('home')} style={{ marginTop: '20px', padding: '10px 20px' }}>
        Retour à l'accueil
      </button>
    </div>
  );
}
