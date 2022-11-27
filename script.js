const loginSection = document.querySelector('.login-section');
const login = document.querySelector('.login');
const noMetamask = document.querySelector('.no-metamask');
const walletSection = document.querySelector('.wallet-section');
const address = document.querySelector('.address');
const network = document.querySelector('.network');

if (window.ethereum) {
  getAddress();
} else {
  login.setAttribute('disabled', true);
  noMetamask.classList.remove('hide');
}

login.addEventListener('click', () => {
  getAddress();
});

ethereum.on('chainChanged', (chainId) => {
  window.location.reload();
});

async function getAddress() {
  const response = await ethereum.request({ method: 'eth_requestAccounts' });
  address.innerHTML = response[0];

  updateNetwork(ethereum.networkVersion);

  walletSection.classList.remove('hide');
  loginSection.classList.add('hide');
}

function updateNetwork(chainId) {
  let networkName;

  // More networks can be added
  if (chainId === '1') {
    networkName = 'Ethereum Main Network';
  } else if (chainId === '3') {
    networkName = 'Ropsten Test Network';
  } else if (chainId === '4') {
    networkName = 'Rinkeby Test Network';
  } else if (chainId === '5') {
    networkName = 'Goerli Test Network';
  } else if (chainId === '42') {
    networkName = 'Kovan Test Network';
  } else if (chainId === '11155111') {
    networkName = 'Sepolia Test Network';
  } else if (chainId) {
    networkName = null;
  }

  if (networkName === null) {
    network.innerHTML = `Network unknown (ID: ${chainId})`;
  } else if (networkName) {
    network.innerHTML = networkName;
  }
}
