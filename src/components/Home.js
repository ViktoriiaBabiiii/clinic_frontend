import React from 'react';
import PageComponent from './PageComponent';
import './Home.css';

function Home() {
  return (
    <PageComponent title="Ласкаво просимо до нашої клініки!">
      <div className="hero">
        <h2>Догляд, якому Ви можете довіряти</h2>
      </div>
      <div className="content">
        <p>Наша клініка пропонує висококваліфіковані послуги у сфері охорони здоров'я з сучасним обладнанням і досвідченими фахівцями. Ми гарантуємо індивідуальний підхід та уважне ставлення до кожного пацієнта.</p>
        <a href="/appointment" className="appointment-btn">Записатися на прийом</a>
      </div>
      <div class="stats">
        <div>Понад 20,000 задоволених пацієнтів</div>
        <div>100+ висококваліфікованих лікарів</div>
     <div>50+ спеціалізованих відділень</div>
      </div>
    </PageComponent>
  );
}

export default Home;
