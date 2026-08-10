import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Aviso Legal | Nutricionistas en Costa Rica',
  description: 'Aviso legal de nutricionistasencostarica.com.',
};

export default function AvisoLegal() {
  return (
    <div style={{ minHeight: '100vh', background: '#F3F0FF', fontFamily: "'Mulish', system-ui, sans-serif", color: '#10004C' }}>
      <div style={{ maxWidth: '780px', margin: '0 auto', padding: '60px 24px' }}>
        <Link href="/" style={{ color: '#7370E0', textDecoration: 'none', fontWeight: 700, fontSize: '15px' }}>
          ← Volver al inicio
        </Link>

        <h1 style={{ fontSize: '32px', fontWeight: 800, margin: '24px 0 32px', lineHeight: 1.2 }}>
          Aviso Legal
        </h1>

        <h2 style={{ fontSize: '20px', fontWeight: 800, marginTop: '32px' }}>Naturaleza del sitio</h2>
        <p style={{ fontSize: '15px', lineHeight: 1.75 }}>
          nutricionistasencostarica.com (en adelante, &quot;el Sitio&quot;) es operado por{' '}
          <strong>[Nombre de la entidad legal operadora — pendiente]</strong>. Es, por el momento, un servicio de publicidad gratuito para profesionales en nutrición registrados en el Colegio de Profesionales en Nutrición de Costa Rica (CPN, anteriormente conocido como Colegio de Nutricionistas de Costa Rica), dirigido al público general que busca este tipo de servicios profesionales.
        </p>
        <p style={{ fontSize: '15px', lineHeight: 1.75 }}>
          El Sitio no presta servicios de nutrición, no emplea nutricionistas, y no participa como parte en la relación profesional que eventualmente se establezca entre un usuario y un nutricionista listado.
        </p>
        <p style={{ fontSize: '15px', lineHeight: 1.75 }}>
          En caso de que en el futuro se incorporen tarifas por servicios adicionales (por ejemplo, los niveles &quot;Contacto&quot; o &quot;Premium&quot; descritos en el Sitio), este Aviso Legal será actualizado para reflejar la naturaleza onerosa de dichos servicios específicos, manteniéndose gratuito el listado básico salvo que se indique lo contrario.
        </p>

        <h2 style={{ fontSize: '20px', fontWeight: 800, marginTop: '32px' }}>No constituye consejo médico o nutricional</h2>
        <p style={{ fontSize: '15px', lineHeight: 1.75 }}>
          La información contenida en el Sitio tiene fines exclusivamente publicitarios y de promoción de profesionales en nutrición. Nada en este Sitio constituye, ni debe interpretarse como, consejo médico, nutricional, diagnóstico o tratamiento. Cualquier decisión relacionada con su salud o alimentación debe consultarse directamente con un profesional en nutrición debidamente incorporado al CPN.
        </p>

        <h2 style={{ fontSize: '20px', fontWeight: 800, marginTop: '32px' }}>Origen y exactitud de los datos</h2>
        <p style={{ fontSize: '15px', lineHeight: 1.75 }}>
          Parte de la información publicada en el Sitio (nombre, apellidos, número de carné y especialidad, cuando aplique) proviene de una recopilación de datos públicos del registro del CPN. El Sitio hace su mejor esfuerzo por mantener esta información actualizada, pero no garantiza la exactitud, vigencia o integridad de los datos publicados. El CPN es la única fuente oficial y autoritativa sobre el estado de incorporación de un profesional. Ante cualquier duda sobre la condición de un profesional, se recomienda al usuario verificar directamente con el CPN.
        </p>

        <h2 style={{ fontSize: '20px', fontWeight: 800, marginTop: '32px' }}>Inclusión en el directorio no implica respaldo ni relación comercial</h2>
        <p style={{ fontSize: '15px', lineHeight: 1.75 }}>
          La aparición de un profesional en el listado gratuito del Sitio no implica que dicho profesional haya solicitado su inclusión, revisado su perfil, ni establecido relación comercial alguna con el Sitio. Esta información se publica en virtud de su carácter de registro público, con el único fin de facilitar su búsqueda por parte del usuario.
        </p>
        <p style={{ fontSize: '15px', lineHeight: 1.75 }}>
          Los perfiles bajo las modalidades &quot;Contacto&quot; o &quot;Premium&quot; sí corresponden a profesionales que han solicitado activamente dicha visibilidad adicional, según se explica en la sección &quot;Niveles de visibilidad&quot;.
        </p>

        <h2 style={{ fontSize: '20px', fontWeight: 800, marginTop: '32px' }}>Verificación de incorporación al Colegio</h2>
        <p style={{ fontSize: '15px', lineHeight: 1.75 }}>
          El Sitio no publica el estado de incorporación (activo, suspendido, u otro) de los profesionales listados. Esta información es de carácter interno del CPN. Se recomienda a todo usuario verificar directamente ante el Colegio de Profesionales en Nutrición de Costa Rica (CPN) si un profesional se encuentra activo y habilitado para ejercer, antes de contratar sus servicios.
        </p>
        <p style={{ fontSize: '15px', lineHeight: 1.75 }}>
          Para una guía sobre qué significa estar colegiado y cómo verificarlo, puede consultar nuestra página{' '}
          <Link href="/colegio-de-nutricionistas-costa-rica" style={{ color: '#7370E0', fontWeight: 700 }}>
            &quot;¿Qué es el Colegio de Nutricionistas de Costa Rica?&quot;
          </Link>
        </p>

        <h2 style={{ fontSize: '20px', fontWeight: 800, marginTop: '32px' }}>Niveles de visibilidad (Contacto y Premium)</h2>
        <p style={{ fontSize: '15px', lineHeight: 1.75 }}>
          Los niveles &quot;Contacto&quot; y &quot;Premium&quot; son espacios de mayor visibilidad dentro del Sitio. Actualmente, la asignación de estos niveles no genera cobro alguno. El Sitio se reserva el derecho de establecer tarifas por estos espacios en el futuro, una vez definido el marco legal y tributario correspondiente, momento en el cual este Aviso Legal será actualizado para reflejar dicha relación comercial.
        </p>
        <p style={{ fontSize: '15px', lineHeight: 1.75 }}>
          La presencia de un profesional en estos niveles, sea de forma gratuita u onerosa, no constituye una recomendación, calificación de calidad, ni garantía de resultados por parte del Sitio. Se trata únicamente de un espacio de mayor exposición dentro del directorio. El Sitio no garantiza un número mínimo de contactos, consultas o clientes derivados de la adquisición de estos niveles.
        </p>

        <h2 style={{ fontSize: '20px', fontWeight: 800, marginTop: '32px' }}>Enlaces y contactos a terceros</h2>
        <p style={{ fontSize: '15px', lineHeight: 1.75 }}>
          El Sitio puede incluir enlaces a WhatsApp, redes sociales u otros sitios web de los profesionales listados. Estos enlaces y datos de contacto se publican únicamente cuando el profesional correspondiente ha otorgado su autorización previa y por escrito para ello. El Sitio no es responsable por el contenido, disponibilidad, ni políticas de privacidad de dichos canales de terceros, ni por la calidad o resultado de las comunicaciones que se den por esos medios.
        </p>

        <h2 style={{ fontSize: '20px', fontWeight: 800, marginTop: '32px' }}>Limitación de responsabilidad</h2>
        <p style={{ fontSize: '15px', lineHeight: 1.75 }}>
          En la máxima medida permitida por la legislación costarricense, nutricionistasencostarica.com no será responsable por daños directos, indirectos, incidentales o consecuentes derivados del uso del Sitio, de la información publicada, o de la relación que el usuario establezca con cualquier profesional listado.
        </p>

        <h2 style={{ fontSize: '20px', fontWeight: 800, marginTop: '32px' }}>Legislación aplicable y jurisdicción</h2>
        <p style={{ fontSize: '15px', lineHeight: 1.75 }}>
          Este Aviso Legal se rige por las leyes de la República de Costa Rica. Cualquier controversia derivada del uso del Sitio se someterá a los tribunales competentes de Costa Rica.
        </p>
        <p style={{ fontSize: '15px', lineHeight: 1.75 }}>
          Antes de acudir a la vía judicial, se invita al usuario a contactar al Sitio para intentar resolver cualquier inconformidad de manera directa y de buena fe.
        </p>

        <h2 style={{ fontSize: '20px', fontWeight: 800, marginTop: '32px' }}>Modificaciones</h2>
        <p style={{ fontSize: '15px', lineHeight: 1.75 }}>
          El Sitio podrá modificar este Aviso Legal en cualquier momento, particularmente al incorporar nuevos servicios o niveles de pago. Se recomienda revisar esta sección periódicamente.
        </p>

        <h2 style={{ fontSize: '20px', fontWeight: 800, marginTop: '32px' }}>Contacto</h2>
        <p style={{ fontSize: '15px', lineHeight: 1.75, marginBottom: '40px' }}>
          Para consultas sobre este Aviso Legal, puede escribir a: <strong>[correo de contacto pendiente]</strong>
        </p>
      </div>
    </div>
  );
}