# Uniswap Tx-pool gas price checker
Sample usage of ZMOK global Tx mempool

## Install dependencies
Execute command:

```shell
npm i
```

## Setting up the environment
To run this sample project, make sure you have set correct API key for endpoint in your .env file. Execute the following command:

```shell
cat <<EOT >> .env
ZMOK_FR_PROVIDER_URL=https://api.zmok.io/fr/<ZMOK_APP_ID>
EOT
```

## Run checker
To run, start following command:
```shell
npm start
```

Sample result:

```
$ npm start
Uniswap Tx-pool gas price checker started...
#######################################################################
tx: 0x850fbbcaa288b1dc5b466b4f5ccad50bbc8639f849420e04ac51d555fd0fad22, from: 0xc14fe4fa20316dff93811b3097dc4a4def04cd0c, gas price: 5 gwei
tx: 0xede918f54096f8fd206fd54eaf91baaabca87f5561b0626198130917a9d0b94e, from: 0x91ec9d14f2489c4d4b161c8a5fb6bc98b6a0e0be, gas price: 4.378 gwei
tx: 0x5757a1960216127cebc271b97ee415b206017d16f3085f7744bf33827ff75873, from: 0x58d8ebb0d378508d927467e55a7ec915b316f7d5, gas price: 8 gwei
tx: 0xdfe707c899da977d49a0087314ac2818d7eebee062bb29d4046026819decc41b, from: 0x8b5fa77f07108aea1ceaaeada309c53b66689b82, gas price: 7 gwei
tx: 0xfb1b533cecdfb953d4fcfd206bdb086ea5498947d8778ae780ef72faa89e401d, from: 0xd65bc6c4fa2295377c2e8b6ac6334ed52e398656, gas price: 5 gwei
tx: 0xb30faa09619bc122c06e213ca0777231d5eb6a0b733ea3c6871961208c3cde7a, from: 0x5137c71def1832f7e092419cdeb95b8507d892d0, gas price: 7 gwei
tx: 0x1838dd293586d403b6ab0df2a0439fef315281f2792aa19ec082bb0474a98bb2, from: 0x197451fdac5abf8246c689c0a370a6ff5a804895, gas price: 30 gwei
tx: 0x3803bb616f9020dc5aa30054cffa2b1c2d9f937e4e18c3039a54d8c72f9b9dd8, from: 0x790ec14076f21bce1bd54e4f9b0818701cfefbf2, gas price: 4.634482525 gwei
tx: 0x0409187b87da3a3174caa7b873c3d275f29867096454c24a70861e41c8eef6d6, from: 0x1e8afb82a922c4a13aef53a75e86f0fa3678423b, gas price: 8 gwei
tx: 0x6f22b418040264e3a66081f13fe40d38ba1e43819c7da1a9b505c21ccb06a19d, from: 0xf969d93b22beebad7fdfddf989cc098a40cb5a58, gas price: 8 gwei
tx: 0x6be50fdf8246f8d937b97a2564308fa9916738325e66eccdfc03cd1ddb614c4f, from: 0xa767e089dfb3e3ff2563cf2d8041e8a9f149ae23, gas price: 5.5 gwei
tx: 0xe8cfd0b75d994217bd5d5e67bb66d8e3011e1ade6f5e8a483070734285691a32, from: 0xbb66c7de8d168cdf460e67f56d89b51cec2a59f6, gas price: 10 gwei
tx: 0x895a5bc1371e53ec9bb6df0e308acc4e582467216d5332f4f1da7445bb6c4511, from: 0x6f11747ba1bd97bc84a933c0e285a96039e2f865, gas price: 6 gwei
tx: 0x81e855d5fe0f8d85a590a4c7815cb0450c6dc79cbbbdb0ebb15ef8fed0ee892d, from: 0x22cb7b7fe063344c6b5eb724c7102fd842fee321, gas price: 5 gwei
tx: 0x6f09644e064dd877d74f808f52044fad7be2c07edc756325ff1647a8a82c3bdb, from: 0x43e604e72775d26e010dfb385d88a072368a1ff5, gas price: 5 gwei
tx: 0x4d8fb7851b916b38ec2af9a5347b420ea22e48b89177a3d1e067671b382bb422, from: 0x1c9bf417e5e1e082f4945eb972c710c997b491ab, gas price: 6 gwei
tx: 0xf29325b748fb4706b2f57a09b828c83081d93c12ee8444b2007e3a93aad118c0, from: 0x4052ff4176247c648a5d6992f34fe18293a3b6ef, gas price: 5 gwei
tx: 0xbd0591811351c60d1e1031977be9e9500e22871d4aaef04cb77e2beca56bbe02, from: 0xeb5d09297b8718a111a8876b4ea32c974c191f0e, gas price: 12 gwei
tx: 0x5421e762dd9e752ba85308b14a145d65756ccf628636fe27d801236ba6b9c604, from: 0x481f33c1ae8eb16ec268b4defadddf390cb278a6, gas price: 36 gwei
tx: 0x692af07c2ef49e9f875a3f4120cd717c0f006ef19eff6882f53d367dfaa42d15, from: 0x1e9fb86127a421fd5b9b3d4987ef70ea4b80033a, gas price: 4 gwei
tx: 0x750b90a77b980e4e5e618c9b005cc9240e6031388282a2161595d4c5f28527ef, from: 0xf66141b02baac3fcdf4ca6bad7bbdac68db115ad, gas price: 8.8 gwei
tx: 0xb96db4b5a6dcc35ad21d0e3073089f837f2dd5dad6ae577637e19738081448ae, from: 0x3b0c0b485c25efce19ffe2337b27ca97c8aa6fc2, gas price: 7 gwei
tx: 0x72ad1d14b6b04afb3d913ba5d502d894337733c75575aad9b8082f8097bbf08e, from: 0xd8be0e65643f4e6fef193972e32081c57fd7e458, gas price: 4.140859213 gwei
tx: 0xdcd568a81cb09548a456a29219f30a79d246daf06935124b9697288784046c17, from: 0x2ae80d8e8f51071dd39750e5466481e054d23529, gas price: 5 gwei
tx: 0x180eac34d7a5cf6a86652750da06d3b33b65885d959e4e25c4686216f3c20d91, from: 0xe94b5a20918496a8e4239daf43e72c7b81fcb1dc, gas price: 10 gwei
tx: 0x747bfa7952bece18898c0b80b610ce206bb20df58f16f21c261a14d035682ce6, from: 0x8a7d01cadc1b20d16bb354354eaf8c9e1c6e5a45, gas price: 6 gwei
tx: 0x40a88c040e922d148265c9c5ed281a61b225fa7d47a69cf8005a463a257a692f, from: 0x9c115dca67582821123df60d49106a4df4ec5bdc, gas price: 161.311449919 gwei
...
... all calls finished...
 _____  _____  ______    _____  ______ _____    ___  ______ _____  _____  _____  _____                          _
/ __  \/ __  \|___  /   |  _  ||___  /|  ___|  /   ||___  /|  _  ||____ ||  _  |/ __  \                        (_)
`' / /'`' / /'   / /     \ V /    / / |___ \  / /| |   / / | |/' |    / / \ V / `' / /'   __ _ __      __  ___  _
  / /    / /    / /      / _ \   / /      \ \/ /_| |  / /  |  /| |    \ \ / _ \   / /    / _` |\ \ /\ / / / _ \| |
./ /___./ /___./ /    _ | |_| |./ /   /\__/ /\___  |./ /   \ |_/ /.___/ /| |_| |./ /___ | (_| | \ V  V / |  __/| |
\_____/\_____/\_/    (_)\_____/\_/    \____/     |_/\_/     \___/ \____/ \_____/\_____/  \__, |  \_/\_/   \___||_|
                                                                                          __/ |
                                                                                         |___/

Max. gas price: 227.875470382 gwei, tx: 0x39a8bc4e837e988f63187eb6a98a44fd5ef21ab3ea442a014945492a06abe3cd
#######################################################################

```
