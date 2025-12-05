import React from 'react';

export default function HomeScreen({ navigate }) {
  return (
    <div style={{ textAlign: 'center', margin: '50px' }}>
      <h1>Le Village Numérique Résistant</h1>
      <p>
        Découvrez comment les établissements scolaires peuvent tenir tête aux Big Tech, à la manière d’Astérix contre l’Empire numérique !
      </p>
      <button onClick={() => navigate('scenario')} style={{ margin: '10px', padding: '10px 20px' }}>
        Commencer le scénario
      </button>
      <button onClick={() => navigate('info')} style={{ margin: '10px', padding: '10px 20px' }}>
        En savoir plus sur NIRD
      </button>
    </div>
  );
}
