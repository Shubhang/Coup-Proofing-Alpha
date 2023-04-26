const scenarios = [
  {
    question: 'You are facing economic difficulties. What do you do?',
    option1: 'Increase military spending to coup-proof your regime.',
    option2: 'Invest in social programs to address public grievances.',
    effect1: { stability: -1, coupRisk: -1 },
    effect2: { stability: 1, coupRisk: 1 }
  },
  {
    question: 'There is a growing opposition movement. How do you respond?',
    option1: 'Crack down on dissent and arrest opposition leaders.',
    option2: 'Engage in dialogue and address their concerns.',
    effect1: { stability: -1, coupRisk: -1 },
    effect2: { stability: 1, coupRisk: 1 }
  },
  {
    question: 'A neighboring country is experiencing a military coup. What is your course of action?',
    option1: 'Increase surveillance and strengthen internal security forces.',
    option2: 'Offer diplomatic assistance to the neighboring country.',
    effect1: { stability: 0, coupRisk: -1 },
    effect2: { stability: 0, coupRisk: 1 }
  },
  {
    question: 'Corruption is rampant in your administration. How do you address it?',
    option1: 'Purge the government and replace corrupt officials with loyalists.',
    option2: 'Implement anti-corruption measures and strengthen rule of law.',
    effect1: { stability: 0, coupRisk: -1 },
    effect2: { stability: 1, coupRisk: 0 }
  },
  {
    question: 'Your military is demanding higher salaries and better equipment. What do you do?',
    option1: 'Meet their demands to maintain loyalty.',
    option2: 'Deny their demands, fearing they might pose a threat.',
    effect1: { stability: 0, coupRisk: -1 },
    effect2: { stability: -1, coupRisk: 1 }
  },
  {
    question: 'You have discovered a coup plot within your military. What is your reaction?',
    option1: 'Arrest the conspirators and replace them with loyalists.',
    option2: 'Engage in dialogue with the plotters to understand their grievances.',
    effect1: { stability: 1, coupRisk: -2 },
    effect2: { stability: 0, coupRisk: 0 }
  },
  {
    question: 'A terrorist organization is threatening your regime. How do you respond?',
    option1: 'Increase cooperation with the military to address the threat.',
    option2: 'Strengthen internal security forces to counter the threat.',
    effect1: { stability: 1, coupRisk: 1 },
    effect2: { stability: 1, coupRisk: -1 }
  },
  {
    question: 'Protests have erupted in a major city. What is your course of action?',
    option1: 'Deploy the military to suppress the protests.',
    option2: 'Address the protesters’ concerns through negotiation and reforms.',
    effect1: { stability: -1, coupRisk: 0 },
    effect2: { stability: 1, coupRisk: 0 }
  },
  {
    question: 'There is a power struggle within your ruling party. How do you handle it?',
    option1: 'Consolidate power by sidelining rivals and promoting loyalists.',
    option2: 'Encourage dialogue and compromise within the party.',
    effect1: { stability: 0, coupRisk: -1 },
    effect2: { stability: 1, coupRisk: 0 }
  },
  {
    question: 'Your regime is facing international pressure over human rights abuses. What do you do?',
    option1: 'Ignore the pressure and maintain strict control over the population.',
    option2: 'Implement reforms to improve the human rights situation.',
    effect1: { stability: -1, coupRisk: -1 },
    effect2: { stability: 1, coupRisk: 1 }
  },
  {
    question: 'Your intelligence service has uncovered a foreign plot to destabilize your regime. How do you respond?',
    option1: 'Increase internal security measures and target foreign agents.',
    option2: 'Strengthen diplomatic ties with allies to counter the foreign threat.',
    effect1: { stability: 1, coupRisk: -1 },
    effect2: { stability: 1, coupRisk: 0 }
  },
  {
    question: 'There is a risk of a popular uprising inspired by events in other countries. What is your reaction?',
    option1: 'Implement preemptive reforms to address public grievances.',
    option2: 'Strengthen security forces to suppress any potential uprisings.',
    effect1: { stability: 1, coupRisk: 1 },
    effect2: { stability: -1, coupRisk: -1 }
  },
  {
    question: 'Your country is experiencing an economic boom. How do you allocate resources?',
    option1: 'Invest in the military to secure your regime.',
    option2: 'Invest in infrastructure and public services to improve living standards.',
    effect1: { stability: 1, coupRisk: -1 },
    effect2: { stability: 2, coupRisk: 1 }
  },
  {
    question: 'A powerful general is becoming increasingly popular. What do you do?',
    option1: 'Promote the general to a higher position to secure their loyalty.',
    option2: 'Sideline the general to prevent them from becoming a threat.',
    effect1: { stability: 0, coupRisk: -1 },
    effect2: { stability: -1, coupRisk: 1 }
  },
  {
    question: 'Your country is involved in an international conflict. How do you ensure internal stability?',
    option1: 'Rally the population around the conflict and maintain strong military support.',
    option2: 'Focus on diplomatic solutions and address internal issues.',
    effect1: { stability: 1, coupRisk: 0 },
    effect2: { stability: 1, coupRisk: 1 }
  }
];



const scenarioElem = document.querySelector('.statement');
const option1Btn = document.getElementById('left-btn');
const option2Btn = document.getElementById('right-btn');
const timerElem = document.getElementById('time');
const endingElem = document.getElementById('ending');

let currentIndex = 0;
let timeLeft = 300;
let stability = 0;
let coupRisk = 0;

function setScenario(index) {
  if (index >= scenarios.length) {
    showEnding();
    return;
  }
  scenarioElem.textContent = scenarios[index].question;
  option1Btn.textContent = scenarios[index].option1;
  option2Btn.textContent = scenarios[index].option2;
}

function chooseOption(option) {
  const scenario = scenarios[currentIndex];
  const effect = scenario[`effect${option}`];
  stability += effect.stability;
  coupRisk += effect.coupRisk;
  currentIndex++;
  setScenario(currentIndex);
}

function showEnding() {
  scenarioElem.remove();
  option1Btn.remove();
  option2Btn.remove();

  if (stability > 0 && coupRisk <= 0) {
    endingElem.textContent = 'Your country remains stable and avoids a coup.';
  } else if (stability <= 0 && coupRisk <= 0) {
    endingElem.textContent = 'Your country faces economic and political challenges but avoids a coup.';
  } else if (stability > 0 && coupRisk > 0) {
    endingElem.textContent = 'Your country experiences a coup despite relative stability.';
  } else {
    endingElem.textContent = 'Your country collapses due to instability and a coup.';
  }

  endingElem.hidden = false;
}

// Timer countdown
function startTimer() {
  const interval = setInterval(() => {
    timeLeft--;
    timerElem.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(interval);
      showEnding();
    }
  }, 1000);
}

// Initialize game
function init() {
  setScenario(currentIndex);
  startTimer();

  option1Btn.addEventListener('click', () => {
    chooseOption(1);
  });

  option2Btn.addEventListener('click', () => {
    chooseOption(2);
  });
}

init();