import React, { useState } from 'react';

export default function Scenario({ navigate }) {
  const [step, setStep] = useState(1);

  const nextStep = () => setStep(step + 1);

  return (
    <div style={{ textAlign: 'center', margin: '50px' }}>
      {step === 1 && <p>Astérix doit choisir une stratégie pour réduire la dépendance numérique de son village...</p>}
      {step === 2 && <p>Option 1 : Installer Linux sur les ordinateurs de l'école.</p>}
      {step === 3 && <p>Option 2 : Promouvoir le réemploi et les logiciels libres.</p>}
      {step > 3 && <p>Bravo ! Vous avez aidé le village à devenir résistant !</p>}

      {step <= 3 ? (
        <button onClick={nextStep} style={{ marginTop: '20px', padding: '10px 20px' }}>Suivant</button>
      ) : (
        <button onClick={() => navigate('home')} style={{ marginTop: '20px', padding: '10px 20px' }}>Retour à l'accueil</button>
      )}
    </div>
  );
}
