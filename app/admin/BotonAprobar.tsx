'use client';

type Props = {
  id: number;
  whatsapp: string | null;
  aprobar: (id: number) => Promise<void>;
};

export default function BotonAprobar({ id, whatsapp, aprobar }: Props) {
  function manejarClick() {
    if (whatsapp) {
      const mensaje = '¡Hola! Tu perfil en nutricionistasencostarica.com ha sido actualizado con la información que enviaste \u{1F389} ¡Gracias por unirte!';
      window.open(`https://wa.me/${whatsapp}?text=${encodeURIComponent(mensaje)}`, '_blank', 'noopener,noreferrer');
    }
    aprobar(id);
  }

  return (
    <button
      onClick={manejarClick}
      style={{ background: '#4ECECE', color: '#003333', border: 'none', borderRadius: '10px', padding: '10px 20px', fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit' }}
    >
      Aprobar
    </button>
  );
}