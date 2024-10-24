import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  return (
    <footer data-aos="fade-up" className="bg-white text-slate-900 py-6">
      <div className="container mx-auto text-center">
        <div className="mt-4 flex justify-center space-x-4">
          <a
            href="https://www.instagram.com/esther.rc.arte/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-900 hover:text-gray-400"
          >
            <FontAwesomeIcon icon={faInstagram} size="2x" />
          </a>

          <a
            href="https://api.whatsapp.com/send?phone=5521987943518"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-900 hover:text-gray-400"
          >
            <FontAwesomeIcon icon={faWhatsapp} size="2x" />
          </a>

          <a
            href="mailto:esther.cerqueira@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-900 hover:text-gray-400"
          >
            <FontAwesomeIcon icon={faEnvelope} size="2x" />
          </a>
        </div>

        <p className='mt-4'>
          Para <strong>encomendas</strong> ou mais <strong>informações</strong>, mande-me uma <strong>mensagem</strong>!
        </p>

        <hr className="border-t border-slate-600 my-4" />
        <p>
          Developed with 🖤 for {''}
          <a
            href="https://www.linkedin.com/in/matheusslimabm/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline"
          >
            Matheus Lima
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
