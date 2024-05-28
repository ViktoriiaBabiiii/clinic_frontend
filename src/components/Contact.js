import React from 'react';
import PageComponent from './PageComponent';
import './Contact.css';
import mapImage from '../images/map.png'; // Make sure this path is correct

function Contact() {
  return (
    <PageComponent title="Контакти">
      <div className="contact-content">
        <section className="contact-info">
          <h2>Зв'яжіться з нами</h2>
          <p>Якщо у вас є питання або ви хочете записатися на прийом, будь ласка, зв'яжіться з нами через наведені контакти або відвідайте нашу клініку особисто. Ми відкриті <b>з понеділка по п'ятницю з 8:00 до 18:00.</b> Також доступні термінові консультації у вихідні.</p>
          <ul>
            <li>Телефон: +380 12 345 6789</li>
            <li>Email: info@nasha-klinika.com</li>
            <li>Адреса: вул. Головна, 24, Київ, Україна</li>
          </ul>
          <img src={mapImage} alt="Office Location" className="contact-image"/>
        </section>
      </div>
    </PageComponent>
  );
}

export default Contact;
