# S-K

### Introduction

**S-K is an on-chain peer to pool option trading protocol built on Ethereum**

**Business scenario**

**write option(cover)** 

```mermaid
graph LR
a(seller):::class1 --> |specify option parameter and transfer MMD to option contract|b([blockchain]):::class2
b -->|record the seller and the option|a(seller):::class1
classDef class1 fill:#ffaf;
classDef class2 fill:#00ccff;
classDef class3 fill:#ffe7ba;
classDef class4 fill:#ff83fa;
```

**buy option**

```mermaid
graph LR
b([blockchain]):::class2 --> |receive option|c(buyer):::class4
c-->|pay premium cMMD|b
b -->|transfer premium cMMD|a(seller):::class1
classDef class1 fill:#ffaf;
classDef class2 fill:#00ccff;
classDef class3 fill:#ffe7ba;
classDef class4 fill:#ff83fa;
```

**exercise**

```mermaid
graph LR
c(buyer):::class4 --> |pay strike price cMMD|b([blockchain]):::class2
b --> |receive MMD|c
b -->|transfer strike price cMMD|a(seller):::class1
classDef class1 fill:#ffaf;
classDef class2 fill:#00ccff;
classDef class3 fill:#ffe7ba;
classDef class4 fill:#ff83fa;
```

**Retrive & Cancel**

```mermaid
graph LR
b([blockchain]):::class2 --> |transfer MMD and change option status|a(seller):::class1
classDef class1 fill:#ffaf;
classDef class2 fill:#00ccff;
classDef class3 fill:#ffe7ba;
classDef class4 fill:#ff83fa;
```

### Contract information

| contract      | address                                    |
| ------------- | ------------------------------------------ |
| option        | 0xdB491786f7e1BDf8BA4a49089f9Fd580706505CF |
| stable_coin   | 0x5f4576A8Cf609c9104353eB75f67023C7488ceed |
| unstable_coin | 0xC2283AA608b5347555EDd7dDA5DC7BEA95025636 |
|               | 0xA0D3af97D8265112F74D68C21211B277a83E7BAF |

### **How to use**

- prepare environment
  - cd Back-end
    - npm install --save-dev @openzeppelin/contracts
    - npm install dotenv
  - cd Front-end
    - npm install
- run tests
  - cd Back-end
    - npx hardhat test
- deploy contract
  - cd Back-end
    - npx hardhat run scripts/deploy.ts --network etherdata
- start webpage
  - cd Front-end
    - npm start

### Further Imporvement
#### Liqiud pool & Option buying

```mermaid
graph LR
a(provider):::class1 --> |ETH| b((Liqiudity pool)):::class2
d(liquidity provider):::class3 --> |MMD|b
b --> |premium| a
b --> |issue tocken with option|c(option buyer):::class4
c --> |premium|b
classDef class1 fill:#ffaf;
classDef class2 fill:#00ccff;
classDef class3 fill:#ffe7ba;
classDef class4 fill:#ff83fa;
```

#### Exercise option

```mermaid
graph LR
b((Liqiudity pool)):::class2
b --> |payoff in ETH|c(option buyer):::class4
c --> |exercise option|b
classDef class1 fill:#ffaf;
classDef class2 fill:#00ccff;
classDef class3 fill:#ffe7ba;
classDef class4 fill:#ff83fa;
```

