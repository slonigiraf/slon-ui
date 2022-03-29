# Recommendation letter example UI

This UI shows how to create a recommendation letter that is backed by tokens that can be slashed from referee in a case of fraud.

The UI was built on top of a [Substrate Front End Template](https://github.com/substrate-developer-hub/substrate-front-end-template).

## Using The UI

### Installation

```bash
# Clone the repository
git clone https://github.com/slonigiraf/recommendation-letter-example-ui.git
cd recommendation-letter-example-ui
yarn install
```
### Testing

```bash
cd recommendation-letter-example-ui
yarn test
```

### Usage

- Start a locally running node of [recommendation-letter-example-node](https://github.com/slonigiraf/recommendation-letter-example-node)

- Start the template in development mode:

```bash
yarn start
```

- Or in production mode:

```bash
yarn build
```

and open `build/index.html` in your favorite browser.

### UI workflow

#### As a referee

- Select a referee's account from the account selector (right top corner). We selected ALICE.
- Tap the "Referee tab"
- Type text of a recommendation letter, paste a public key of worker and an amount of token to stake on the recommendation.
- Click the "Create" button.

<table><tbody><tr><td><img alt="1 step" src="https://github.com/slonigiraf/recommendation-letter-example-ui/blob/main/ui-examples/1.png?raw=true" width="500"></tr></td></tbody></table>

- Show the QR code to the worker (or take a photo / screenshot of the QR code to show later, for example, if you test this repo from a single computer you will need this QR code on the next step)

<table><tbody><tr><td><img alt="2 step" src="https://github.com/slonigiraf/recommendation-letter-example-ui/blob/main/ui-examples/2.png?raw=true" width="500"></tr></td></tbody></table>

#### As a worker

- Select a worker's account from the account selector (right top corner). We selected BOB.
- Tap the "Worker tab" and then the "Add letter about me" button

<table><tbody><tr><td><img alt="3 step" src="https://github.com/slonigiraf/recommendation-letter-example-ui/blob/main/ui-examples/3.png?raw=true" width="500"></tr></td></tbody></table>

- Scan the QR-code that the referee showed to you

<table><tbody><tr><td><img alt="4 step" src="https://github.com/slonigiraf/recommendation-letter-example-ui/blob/main/ui-examples/4.png?raw=true" width="500"></tr></td></tbody></table>

- See that the letter was uploaded to your account

<table><tbody><tr><td><img alt="5 step" src="https://github.com/slonigiraf/recommendation-letter-example-ui/blob/main/ui-examples/5.png?raw=true" width="500"></tr></td></tbody></table>

- Tap on the recommendation letter to show it to an employer
- If the employer wants to re-examine your skill mentioned in the letter, paste the employer's public key and tap the "Sign" button

<table><tbody><tr><td><img alt="6 step" src="https://github.com/slonigiraf/recommendation-letter-example-ui/blob/main/ui-examples/6.png?raw=true" width="500"></tr></td></tbody></table>

- Show the QR code to the employer (or take a photo / screenshot of it to show later, for example, if you test this repo from a single computer you will need this QR code on the next step)

<table><tbody><tr><td><img alt="7 step" src="https://github.com/slonigiraf/recommendation-letter-example-ui/blob/main/ui-examples/7.png?raw=true" width="500"></tr></td></tbody></table>

#### As an employer

- Select an employer account from the account selector (right top corner). We selected BOB_STASH.
- Tap the "Employer tab" and then the "Scan a letter about a worker" button

<table><tbody><tr><td><img alt="8 step" src="https://github.com/slonigiraf/recommendation-letter-example-ui/blob/main/ui-examples/8.png?raw=true" width="500"></tr></td></tbody></table>

- Scan the QR-code that the worker showed to you

<table><tbody><tr><td><img alt="9 step" src="https://github.com/slonigiraf/recommendation-letter-example-ui/blob/main/ui-examples/9.png?raw=true" width="500"></tr></td></tbody></table>

- See that the worker recommendation letter was uploaded to your account

<table><tbody><tr><td><img alt="10 step" src="https://github.com/slonigiraf/recommendation-letter-example-ui/blob/main/ui-examples/10.png?raw=true" width="500"></tr></td></tbody></table>

- Have a look at account balances: the referee (ALICE) and the employer (BOB_STASH) all have the same balance of 1.1529 MUnit

<table><tbody><tr><td><img alt="11 step" src="https://github.com/slonigiraf/recommendation-letter-example-ui/blob/main/ui-examples/11.png?raw=true" width="500"></tr></td></tbody></table>

- If the employer thinks that the recommendation was fake and wants to get a reimbursement from the referee then he taps on the letter and then pushes "Get a reimbursement" button

<table><tbody><tr><td><img alt="12-1 step" src="https://github.com/slonigiraf/recommendation-letter-example-ui/blob/main/ui-examples/12-1.png?raw=true" width="500"></tr></td></tbody></table>

- The transaction goes to a blockchain

<table><tbody><tr><td><img alt="12-2 step" src="https://github.com/slonigiraf/recommendation-letter-example-ui/blob/main/ui-examples/12-2.png?raw=true" width="500"></tr></td></tbody></table>

- Balances will be updated: 0.001 MUnit will be transferred from the referee (ALICE) to the employer (BOB_STASH) as the result of reimbursement transaction

<table><tbody><tr><td><img alt="13 step" src="https://github.com/slonigiraf/recommendation-letter-example-ui/blob/main/ui-examples/13.png?raw=true" width="500"></tr></td></tbody></table>

- After it the recommendation letter will be marked as "Canceled"

<table><tbody><tr><td><img alt="14 step" src="https://github.com/slonigiraf/recommendation-letter-example-ui/blob/main/ui-examples/14.png?raw=true" width="500"></tr></td></tbody></table>

- And can't be used twice for penalization of the referee

<table><tbody><tr><td><img alt="15 step" src="https://github.com/slonigiraf/recommendation-letter-example-ui/blob/main/ui-examples/15.png?raw=true" width="500"></tr></td></tbody></table>
# slon-ui
